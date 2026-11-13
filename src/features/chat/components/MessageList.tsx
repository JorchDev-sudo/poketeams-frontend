import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
    messages: { id: string; senderId: string; content: string; sentAt: string }[]
    myId: string
    hasMore: boolean
    onLoadOlder: () => void
}

export default function MessageList({ messages, myId, hasMore, onLoadOlder }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null)
    const lastId = messages.at(-1)?.id

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [lastId])

    return (
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
            {hasMore && (
                <Button variant="ghost" size="sm" className="self-center" onClick={onLoadOlder}>
                    Cargar mensajes anteriores
                </Button>
            )}
            {messages.map(m => {
                const mine = m.senderId === myId
                return (
                    <div key={m.id} className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                        <div className={cn(
                            'max-w-[75%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm',
                            mine ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground',
                        )}>
                            {m.content}
                            <span className="mt-1 block text-[10px] opacity-60">
                                {new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                )
            })}
            <div ref={bottomRef} />
        </div>
    )
}