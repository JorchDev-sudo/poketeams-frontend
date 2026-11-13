import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client/react'
import { useDebounce } from 'use-debounce'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { SEARCH_TRAINERS } from '@/graphql/queries/trainer'
import { chatClient } from '../lib/chatClient'
import { FIND_CONVERSATIONS, START_CONVERSATION } from '../graphql/chat'

export default function NewConversationDialog() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [term, setTerm] = useState('')
    const [debounced] = useDebounce(term, 400)

    const { data } = useQuery(SEARCH_TRAINERS, { variables: { name: debounced }, skip: debounced.trim().length < 2 })
    const [start, { loading }] = useMutation(START_CONVERSATION, { client: chatClient })

    const results = (data?.searchTrainers ?? []).filter(t => t.id !== user!.id)

    const onPick = async (trainerId: string) => {
        try {
            const res = await start({ variables: { participantIds: [trainerId] } })
            await chatClient.refetchQueries({ include: [FIND_CONVERSATIONS] })
            setOpen(false)
            setTerm('')
            if (res.data) navigate(`/chat/${res.data.startConversation.id}`)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm">Nuevo</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Nueva conversación</DialogTitle></DialogHeader>
                <Input value={term} onChange={e => setTerm(e.target.value)} placeholder="Buscar entrenador…" />
                <ul className="flex max-h-64 flex-col overflow-y-auto">
                    {results.map(t => (
                        <li key={t.id}>
                            <button
                                disabled={loading}
                                onClick={() => onPick(t.id)}
                                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                            >
                                {t.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </DialogContent>
        </Dialog>
    )
}