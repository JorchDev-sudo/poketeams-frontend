import { useAuth } from '@/context/AuthContext'
import { useConversations } from '../hooks/useConversations'
import { useMessages } from '../hooks/useMessages'
import { useSendMessage } from '../hooks/useSendMessage'
import { useTrainerNames } from '../hooks/useTrainerNames'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatWindow({ conversationId }: { conversationId: string }) {
    const { user } = useAuth()
    const { conversations } = useConversations()
    const { messages, loading, hasMore, loadOlder } = useMessages(conversationId)
    const { send, sending } = useSendMessage(conversationId)

    const participants = conversations.find(c => c.id === conversationId)?.participantIds ?? []
    const names = useTrainerNames(participants)
    const title = participants
        .filter(id => id !== user!.id)
        .map(id => names.get(id) ?? 'Entrenador')
        .join(', ') || 'Conversación'

    return (
        <section className="flex min-h-0 flex-1 flex-col">
            <header className="border-b border-border px-4 py-3 font-heading font-semibold">{title}</header>
            {loading && messages.length === 0
                ? <p className="p-4 text-sm text-muted-foreground">Cargando…</p>
                : <MessageList messages={messages} myId={user!.id} hasMore={hasMore} onLoadOlder={loadOlder} />}
            <MessageInput onSend={send} sending={sending} />
        </section>
    )
}