import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface Props {
    id: string
    pokemonName: string
    nickname: string | null
    isNew: boolean
    onRemove: (id: string) => void
    onNicknameChange: (id: string, nickname: string) => void
}

export function SortablePokemonItem({
    id,
    pokemonName,
    nickname,
    isNew,
    onRemove,
    onNicknameChange,
}: Props) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <li ref={setNodeRef} style={style} className="flex items-center gap-2 rounded-md border p-2 bg-background">
            <button
                type="button"
                {...attributes}
                {...listeners}
                className="cursor-grab touch-none text-muted-foreground"
            >
                <GripVertical size={16} />
            </button>

            <input
                type="text"
                value={nickname ?? ''}
                placeholder={pokemonName}
                onChange={(e) => onNicknameChange(id, e.target.value)}
                className="flex-1 bg-transparent outline-none border-b border-transparent focus:border-border"
            />

            {isNew && <em className="text-xs text-muted-foreground">(nuevo)</em>}

            <button type="button" onClick={() => onRemove(id)}>-</button>
        </li>
    )
}