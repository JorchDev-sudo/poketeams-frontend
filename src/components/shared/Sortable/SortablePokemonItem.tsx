import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

interface Props {
    id: string
    name: string
    isNew: boolean
    onRemove: (id: string) => void
}

export function SortablePokemonItem({ id, name, isNew, onRemove }: Props) {
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
            <span className="flex-1">
                {name} {isNew && <em>(nuevo)</em>}
            </span>
            <button type="button" onClick={() => onRemove(id)}>-</button>
        </li>
    )
}