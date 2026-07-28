import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
    REMOVE_POKEMON_FROM_TEAM_BY_ID,
    ADD_POKEMON_TO_TEAM_BY_NAME,
    MOVE_POKEMONS
} from '@/graphql/mutations/team';
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
    name: string;
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
    name: string
    isNew: boolean
}

type DraftAction =
    | { type: 'RESET'; pokemons: Pokemon[] }
    | { type: 'ADD'; name: string, pokemonId: number }
    | { type: 'REMOVE'; id: string }
    | { type: 'REORDER'; activeId: string; overId: string }

function draftReducer(state: DraftPokemon[], action: DraftAction): DraftPokemon[] {
    switch (action.type) {
        case 'RESET':
            return action.pokemons.map(p => ({ id: p.id, pokemonId: p.pokemonId, name: p.name, isNew: false }))
        case 'ADD':
            return [...state, { id: `temp:${crypto.randomUUID()}`, pokemonId: action.pokemonId, name: action.name, isNew: true }]
        case 'REMOVE':
            return state.filter(p => p.id !== action.id)
        case 'REORDER': {
            const oldIndex = state.findIndex(p => p.id === action.activeId)
            const newIndex = state.findIndex(p => p.id === action.overId)
            if (oldIndex === -1 || newIndex === -1) return state
            return arrayMove(state, oldIndex, newIndex)
        }
    }
}

export default function TeamModal({ name, pokemons, open, onClose, onSaved }: Props) {
    const [removePokemonFromTeamById] = useMutation(REMOVE_POKEMON_FROM_TEAM_BY_ID)
    const [addPokemonToTeamByName] = useMutation(ADD_POKEMON_TO_TEAM_BY_NAME)
    const [movePokemons] = useMutation(MOVE_POKEMONS)

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

    const handleAddPokemon = (pokemonName: string, pokemonId: number) => {
        dispatch({ type: 'ADD', name: pokemonName, pokemonId: pokemonId })
        setIsSearchOpen(false)
    }

    const handleRemovePokemon = (id: string) => {
        dispatch({ type: 'REMOVE', id })
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
            const original = pokemons.filter((p): p is Pokemon => p !== null)

            const toRemove = original.filter(o => !draft.some(d => d.id === o.id))
            const toAdd = draft.filter(d => d.isNew)

            for (const p of toRemove) {
                await removePokemonFromTeamById({ variables: { id: p.id } })
            }
            for (const p of toAdd) {
                await addPokemonToTeamByName({ variables: { pokemonName: p.name } })
            }

            if (draft.length > 0) {
                await movePokemons({
                    variables: {
                        positions: draft.map((p, index) => ({ pokemonId: p.pokemonId, position: index })),
                    },
                })
            }

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
                                    name={pokemon.name}
                                    isNew={pokemon.isNew}
                                    onRemove={handleRemovePokemon}
                                />
                            ))}
                        </ol>
                    </SortableContext>
                </DndContext>

                <button onClick={() => setIsSearchOpen(true)} disabled={isSearchOpen}>
                    {isSearchOpen ? "" : "+"}</button>
                <button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Guardando...' : 'Save'}
                </button>

                {isSearchOpen && <PokemonsSearch onAddPokemon={handleAddPokemon} />}
            </DialogContent>
        </Dialog>
    )
}