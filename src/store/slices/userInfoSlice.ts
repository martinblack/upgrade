import { CreateUserInfoSlice } from '../types'

export const createUserInfoSlice: CreateUserInfoSlice = (set, get) => ({
  canUseData: false,
  setCanUseData: value => set(() => ({ canUseData: value })),
})
