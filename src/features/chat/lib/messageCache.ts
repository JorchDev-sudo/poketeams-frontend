import { chatClient } from './chatClient'
import { FIND_MESSAGES } from '../graphql/chat'

type Msg = { id: string; conversationId: string; senderId: string; content: string; sentAt: string }

export function appendMessage(message: Msg) {
    chatClient.cache.updateQuery(
        { query: FIND_MESSAGES, variables: { conversationId: message.conversationId } },
        prev => (prev ? { findMessages: [...prev.findMessages, message] } : undefined),
    )
}