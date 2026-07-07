import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Props {
    open: boolean
    onClose: () => void
    name: string
    pokemons: {
        id: number
        name: string
    }[] | null
}

export default function TeamModal({ name, pokemons, open, onClose }: Props) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{name}</DialogTitle>
                </DialogHeader>
                <ol>
                    {pokemons?.map(pokemon => (
                        <li key={pokemon.id}>{pokemon.name}</li>
                    ))}
                </ol>
            </DialogContent>
        </Dialog>
    )
}
