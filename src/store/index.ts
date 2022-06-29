import create, { GetState, SetState } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createActiveEventIdSlice,
  createAppSlice,
  createNotificationSlice,
  createQueueSlice,
  createRunningTaskSlice,
  createUserInfoSlice,
  createUserSlice,
  createVideoSlice,
} from "./slices";
import { createStoreSlice } from "./slices/storeSlice";
import { ZudStore } from "./types";
import { NetInfoStateType } from "@react-native-community/netinfo";

const VERSION = 4;
const NAME = "app-persist";

const createRootSlice = persist(
  (set: SetState<any>, get: GetState<any>) => ({
    ...createAppSlice(set, get),
    ...createStoreSlice(set, get),
    ...createVideoSlice(set, get),
    ...createUserSlice(set, get),
    ...createRunningTaskSlice(set, get),
    ...createNotificationSlice(set, get),
    ...createQueueSlice(set, get),
    ...createUserInfoSlice(set, get),
    ...createActiveEventIdSlice(set, get),
  }),
  {
    version: VERSION,
    name: NAME,
    getStorage: () => AsyncStorage,
    onRehydrateStorage: () => (state, error) => {
      if (error) return;
      if (!state) return;
      state.isRunning = false;
      state.isForegroundRunning = false;
      state.foregroundProgress = 0;
      state.appState = "active";
      state.network = NetInfoStateType.unknown;
      state.status = undefined;
      state.isHydrated = true;
    },
  }
);

export * from "./selectors";
export * from "./types";
export const useZudStore = create<ZudStore>(createRootSlice);
