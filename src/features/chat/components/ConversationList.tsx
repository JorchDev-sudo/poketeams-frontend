import { NavLink } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { useConversations } from '../hooks/useConversations'
import { useTrainerNames } from '../hooks/useTrainerNames'
import NewConversationDialog from './NewConversationDialog.tsx'

export default function ConversationList() {
    const { user } = useAuth()
    const { conversations, loading } = useConversations()
    const names = useTrainerNames(conversations.flatMap(c => c.participantIds))

    return (
        <aside className="flex w-72 shrink-0 flex-col border-r border-border">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="font-heading font-semibold">Chats</h2>
                <NewConversationDialog />
            </div>
            <nav className="flex-1 overflow-y-auto">
                {loading && <p className="p-4 text-sm text-muted-foreground">Cargando…</p>}
                {!loading && conversations.length === 0 && (
                    <p className="p-4 text-sm text-muted-foreground">Aún no tienes conversaciones.</p>
                )}
                {conversations.map(c => (
                    <NavLink
                        key={c.id}
                        to={`/chat/${c.id}`}
                        className={({ isActive }) => cn(
                            'block truncate border-b border-border px-4 py-3 text-sm hover:bg-muted',
                            isActive && 'bg-muted font-medium',
                        )}
                    >
                        {c.participantIds.filter(id => id !== user!.id).map(id => names.get(id) ?? '…').join(', ')}
                    </NavLink>
                ))}
            </nav>
        </aside>
    )
}