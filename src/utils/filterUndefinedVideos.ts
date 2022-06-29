import {
  EventVideoObjectType,
  UserVideoObjectType,
  EventVideoObjectTypeConnection,
  UserVideoObjectTypeConnection,
} from '@/types'

export const filterUndefinedMyVideos = (
  videos: UserVideoObjectTypeConnection,
): UserVideoObjectType[] => videos?.edges?.map(e => e?.node).filter(e => e) as UserVideoObjectType[]

export const filterUndefinedAllVideos = (
  videos: EventVideoObjectTypeConnection,
): EventVideoObjectType[] =>
  videos?.edges?.map(e => e?.node).filter(e => e) as EventVideoObjectType[]
