import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { SYNC_POKEMONS } from '@/graphql/mutations/team';
import { useMutation } from '@apollo/client/react';
import { useEffect, useReducer, useState } from 'react';
import {
    DndContext,
    closestCenter,
    PointerSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { SortablePokemonItem } from '@/components/shared/Sortable/SortablePokemonItem'
import PokemonsSearch from './components/PokemonSearch';

interface Pokemon {
    id: string;
    pokemonId: number;
    pokemonName: string;
    nickname: string | null;
    position: number;
}

interface Props {
    open: boolean
    onClose: () => void
    onSaved: () => Promise<unknown>
    name: string
    pokemons: (Pokemon | null)[];
}

interface DraftPokemon {
    id: string
    pokemonId: number
    pokemonName: string
    nickname: string | null
    isNew: boolean
}

type DraftAction =
    | { type: 'RESET'; pokemons: Pokemon[] }
    | { type: 'ADD'; pokemonId: number; pokemonName: string; nickname: string }
    | { type: 'REMOVE'; id: string }
    | { type: 'REORDER'; activeId: string; overId: string }
    | { type: 'RENAME'; id: string; nickname: string }

function draftReducer(state: DraftPokemon[], action: DraftAction): DraftPokemon[] {
    switch (action.type) {
        case 'RESET':
            return action.pokemons.map(p => ({
                id: p.id,
                pokemonId: p.pokemonId,
                pokemonName: p.pokemonName,
                nickname: p.nickname,
                isNew: false,
            }))
        case 'ADD':
            return [...state, {
                id: `temp:${crypto.randomUUID()}`,
                pokemonId: action.pokemonId,
                pokemonName: action.pokemonName,
                nickname: action.nickname,
                isNew: true,
            }]
        case 'REMOVE':
            return state.filter(p => p.id !== action.id)
        case 'REORDER': {
            const oldIndex = state.findIndex(p => p.id === action.activeId)
            const newIndex = state.findIndex(p => p.id === action.overId)
            if (oldIndex === -1 || newIndex === -1) return state
            return arrayMove(state, oldIndex, newIndex)
        }
        case 'RENAME':
            return state.map(p =>
                p.id === action.id ? { ...p, nickname: action.nickname } : p
            )
    }
}

export default function TeamModal({ name, pokemons, open, onClose, onSaved }: Props) {
    const [syncPokemons] = useMutation(SYNC_POKEMONS)

    const [draft, dispatch] = useReducer(draftReducer, [])

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    useEffect(() => {
        if (open) {
            dispatch({ type: 'RESET', pokemons: pokemons.filter((p): p is Pokemon => p !== null) })
        }
    }, [open, pokemons])

    const handleAddPokemon = (pokemonName: string, nickname: string, pokemonId: number) => {
        dispatch({ type: 'ADD', pokemonId, pokemonName, nickname })
        setIsSearchOpen(false)
    }

    const handleRemovePokemon = (id: string) => {
        dispatch({ type: 'REMOVE', id })
    }

    const handleNicknameChange = (id: string, nickname: string) => {
        dispatch({ type: 'RENAME', id, nickname })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            dispatch({ type: 'REORDER', activeId: String(active.id), overId: String(over.id) })
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await syncPokemons({
                variables: {
                    pokemons: draft.map((pokemon, index) => ({
                        id: pokemon.isNew ? null : pokemon.id,
                        pokemonId: pokemon.pokemonId,
                        pokemonName: pokemon.pokemonName,
                        // Si el usuario borró el input y lo dejó vacío, mandamos null
                        // en vez de "" — así el backend aplica su propia regla de
                        // "sin nickname = usar el nombre de la especie".
                        nickname: pokemon.nickname?.trim() ? pokemon.nickname : null,
                        position: index,
                    })),
                },
            })

            await onSaved()
            onClose()
        } catch (e) {
            console.error(e)
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                </DialogHeader>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={draft.map(p => p.id)} strategy={verticalListSortingStrategy}>
                        <ol className="flex flex-col gap-2">
                            {draft.map(pokemon => (
                                <SortablePokemonItem
                                    key={pokemon.id}
                                    id={pokemon.id}
                                    pokemonName={pokemon.pokemonName}
                                    nickname={pokemon.nickname}
                                    isNew={pokemon.isNew}
                                    onRemove={handleRemovePokemon}
                                    onNicknameChange={handleNicknameChange}
                                />
                            ))}
                        </ol>
                    </SortableContext>
                </DndContext>

                <button onClick={() => setIsSearchOpen(true)} disabled={isSearchOpen}>
                    {isSearchOpen ? "" : "+"}
                </button>
                <button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Guardando...' : 'Save'}
                </button>

                {isSearchOpen && <PokemonsSearch onAddPokemon={handleAddPokemon} />}
            </DialogContent>
        </Dialog>
    )
}