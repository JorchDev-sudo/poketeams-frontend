import { useMutation } from '@apollo/client/react'
import { chatClient } from '../lib/chatClient'
import { appendMessage } from '../lib/messageCache'
import { SEND_MESSAGE } from '../graphql/chat'

export function useSendMessage(conversationId: string) {
    const [mutate, { loading }] = useMutation(SEND_MESSAGE, { client: chatClient })
    const send = (content: string) =>
        mutate({
            variables: { conversationId, content },
            update: (_cache, { data }) => { if (data) appendMessage(data.sendMessage) },
        })
    return { send, sending: loading }
}