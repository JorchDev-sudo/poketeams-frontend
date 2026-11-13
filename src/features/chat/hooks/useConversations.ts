import { useQuery } from '@apollo/client/react'
import { chatClient } from '../lib/chatClient'
import { FIND_CONVERSATIONS } from '../graphql/chat'

export function useConversations() {
    const { data, loading, error } = useQuery(FIND_CONVERSATIONS, { client: chatClient })
    const conversations = [...(data?.findConversations ?? [])]
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    return { conversations, loading, error }
}