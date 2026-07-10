interface Props {
    id: string
    name: string
    pokemons: ({
        id: number;
        name: string;
    } | null)[];
    onClick: () => void
}

export default function TeamCard({ id, name, pokemons, onClick }: Props) {
    return (
        <div onClick={onClick}>
            <h1>{name}, {id}</h1>
            <ol>
                {pokemons?.map(pokemon => (
                    <li key={pokemon?.id}>{pokemon?.name}</li>
                ))}
            </ol>
        </div>
    )
}