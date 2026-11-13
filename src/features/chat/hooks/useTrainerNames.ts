import { useMemo } from 'react'
import { useQuery } from '@apollo/client/react'
import { FIND_TRAINERS_BY_IDS } from '@/graphql/queries/trainer'

export function useTrainerNames(ids: string[]) {
    const key = [...new Set(ids)].sort().join(',')
    const unique = useMemo(() => (key ? key.split(',') : []), [key])
    const { data } = useQuery(FIND_TRAINERS_BY_IDS, { variables: { ids: unique }, skip: unique.length === 0 })
    return useMemo(() => new Map((data?.findTrainersByIds ?? []).map(t => [t.id, t.name])), [data])
}