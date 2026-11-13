import { useMemo, useState, useEffect } from 'react'
import { useQuery, useSubscription } from '@apollo/client/react'
import { chatClient } from '../lib/chatClient'
import { appendMessage } from '../lib/messageCache'
import { FIND_MESSAGES, MESSAGE_ADDED } from '../graphql/chat'

const PAGE_SIZE = 30

export function useMessages(conversationId: string) {
    const [exhausted, setExhausted] = useState(false)

    const { data, loading, fetchMore } = useQuery(FIND_MESSAGES, {
        client: chatClient,
        variables: { conversationId, limit: PAGE_SIZE },
        fetchPolicy: 'cache-and-network',
    })

    const {
        data: subscriptionData,
        loading: subscriptionLoading,
        error: subscriptionError,
    } = useSubscription(MESSAGE_ADDED, {
        client: chatClient,
        variables: { conversationId },
        onData: ({ data }) => {
            console.log('[Chat Subscription] Event received:', data.data)

            const message = data.data?.messageAdded

            if (message) {
                console.log('[Chat Subscription] Appending:', message.id)
                appendMessage(message)
            }
        },
    })

    useEffect(() => {
        console.log('[Chat Subscription] Loading:', subscriptionLoading)
        console.log('[Chat Subscription] Error:', subscriptionError)
        console.log('[Chat Subscription] Data:', subscriptionData)
    }, [subscriptionLoading, subscriptionError, subscriptionData])

    const messages = useMemo(
        () => [...(data?.findMessages ?? [])].sort((a, b) => Date.parse(a.sentAt) - Date.parse(b.sentAt)),
        [data],
    )

    const hasMore = !exhausted && (data?.findMessages.length ?? 0) >= PAGE_SIZE

    const loadOlder = async () => {
        const oldest = messages[0]
        if (!oldest) return
        const result = await fetchMore({ variables: { before: oldest.sentAt, limit: PAGE_SIZE } })
        if ((result.data?.findMessages.length ?? 0) < PAGE_SIZE) setExhausted(true)
    }

    return { messages, loading, hasMore, loadOlder }
}