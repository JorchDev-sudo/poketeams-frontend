import { useParams } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar/Navbar'
import ConversationList from './components/ConversationList'
import ChatWindow from './components/ChatWindow'

export default function ChatPage() {
    const { conversationId } = useParams()
    return (
        <div className="min-h-svh bg-background">
            <Navbar />
            <div className="mx-auto flex h-[calc(100svh-4rem)] max-w-5xl border-x border-border">
                <ConversationList />
                {conversationId
                    ? <ChatWindow key={conversationId} conversationId={conversationId} />
                    : <p className="m-auto text-sm text-muted-foreground">Selecciona una conversación</p>}
            </div>
        </div>
    )
}