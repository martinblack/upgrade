import { CreateUserSlice } from '../types'

export const createUserSlice: CreateUserSlice = (set, get) => ({
  user: null,
  anonymousUid: null,
  setUser: user => set(() => ({ user })),
  setAnonymousUid: anonymousUid => set(() => ({ anonymousUid })),
})
