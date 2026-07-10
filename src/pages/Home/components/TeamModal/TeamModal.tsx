import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { REMOVE_POKEMON_FROM_TEAM, ADD_POKEMON_TO_TEAM_BY_NAME } from '@/graphql/mutations/team';
import { Me } from '@/graphql/queries/trainer';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import PokemonsSearch from './components/PokemonSearch';

interface Props {
    open: boolean
    onClose: () => void
    name: string
    pokemons: ({
        id: number;
        name: string;
    } | null)[];
}

export default function TeamModal({ name, pokemons, open, onClose }: Props) {
    const [removePokemonFromTeam] = useMutation(REMOVE_POKEMON_FROM_TEAM, {
        refetchQueries: [{ query: Me }],
        awaitRefetchQueries: true
    })

    const [addPokemonToTeamByName] = useMutation(ADD_POKEMON_TO_TEAM_BY_NAME, {
        refetchQueries: [{ query: Me }],
        awaitRefetchQueries: true
    })

    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async (pokemonId: number) => {
        try {
            await removePokemonFromTeam({ variables: { pokemonId } })
        } catch (e) {
            console.error(e)
        }
    }

    const handleAddPokemon = async (pokemonName: string) => {
        try {
            await addPokemonToTeamByName({ variables: { pokemonName } })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                </DialogHeader>
                <ol>
                    {pokemons?.map(pokemon => (
                        <li key={pokemon?.id}>
                            {pokemon?.name}
                            <button onClick={() => handleDelete(pokemon?.id ?? 0)}>-</button>
                        </li>
                    ))}
                </ol>

                <button onClick={() => setIsOpen(true)}>+</button>

                {isOpen && <PokemonsSearch onAddPokemon={handleAddPokemon} />}
            </DialogContent>
        </Dialog>
    )
}
