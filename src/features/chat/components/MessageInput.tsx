import { useState, type KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const MAX_LENGTH = 2000

export default function MessageInput({ onSend, sending }: { onSend: (c: string) => Promise<unknown>; sending: boolean }) {
    const [value, setValue] = useState('')

    const submit = async () => {
        const content = value.trim()
        if (!content || sending) return
        try {
            await onSend(content)
            setValue('')
        } catch (e) {
            console.error(e)
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void submit() }
    }

    return (
        <div className="flex gap-2 border-t border-border p-3">
            <Textarea
                value={value}
                onChange={e => setValue(e.target.value.slice(0, MAX_LENGTH))}
                onKeyDown={onKeyDown}
                placeholder="Escribe un mensaje…"
                rows={1}
                className="min-h-10 resize-none"
            />
            <Button onClick={submit} disabled={sending || !value.trim()}>Enviar</Button>
        </div>
    )
}