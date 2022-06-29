import { CreateActiveEventIdSlice } from '../types'

export const createActiveEventIdSlice: CreateActiveEventIdSlice = set => ({
  activeId: null,
  setActiveId: activeId => set(() => ({ activeId })),
})
