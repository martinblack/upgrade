import { GetState, SetState } from 'zustand'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { AppStateStatus } from 'react-native'
import { NetInfoStateType } from '@react-native-community/netinfo'
import { UploadStatus } from '../tasks'

export interface ZudStore
  extends IApp,
    IStore,
    IActiveEventIdSlice,
    INotificationSlice,
    IQueueSlice,
    IRunningTaskSlice,
    IUserInfo,
    IUserSlice,
    IVideoSlice {}

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>,
) => T

export interface IStore {
  isHydrated: boolean
  setIsHydrated: (isHydrated: boolean) => void
  clearStore: () => void
}

export type CreateStoreSlice = StoreSlice<IStore, ZudStore>

export interface IApp {
  appState: AppStateStatus
  network: NetInfoStateType
  setAppState: (appState: AppStateStatus) => void
  setNetwork: (network: NetInfoStateType) => void
}

export type CreateAppSlice = StoreSlice<IApp>

export interface INotificationSlice {
  lastNotificationTime: number
  lastRecordingTime: number
  setLastNotificationTime: (lastNotificationTime: number) => void
  setLastRecordingTime: (lastRecordingTime: number) => void
}

export type CreateNotificationSlice = StoreSlice<INotificationSlice>

export interface IActiveEventIdSlice {
  activeId: string | null
  setActiveId: (id: string | null) => void
}

export type CreateActiveEventIdSlice = StoreSlice<IActiveEventIdSlice>

export interface IRunningTaskSlice {
  isRunning: boolean
  setIsRunning: (value: boolean) => void
  isForegroundRunning: boolean
  setIsForegroundRunning: (value: boolean) => void
  foregroundProgress: number
  setForegroundProgress: (value: number) => void
  clearForegroundProgress: () => void
}

export type CreateRunningTaskSlice = StoreSlice<IRunningTaskSlice>

export interface UploadItem {
  uri: string
  id: string
  length: string
  eventName: string
  slug: string
  currentCompressedChunk: number
  currentFullChunk: number
  chunksTotal: number
  isCompressedDone: boolean
}

export type UploadFiles = UploadItem[]

export interface IQueueSlice {
  queue: UploadFiles
  status?: UploadStatus
  addVideo: (
    uri: string,
    id: string,
    length: string,
    eventName: string,
    slug: string,
    chunksTotal: number,
  ) => void
  removeVideo: (uri: string, isFromFileSystem?: boolean) => void
  updateVideo: (item: UploadItem) => void
  setCurrentFullChunk: (uri: string, chunk: number) => void
  setCurrentCompressedChunk: (uri: string, chunk: number) => void
  setIsCompressedDone: (uri: string, value: boolean) => void
  setUploadStatus: (status: UploadStatus) => void
  getVideoToUpload: () => UploadItem
  isEmpty: () => boolean
}

export type CreateQueueSlice = StoreSlice<IQueueSlice>

export interface UserState {
  user: FirebaseAuthTypes.User | null
  anonymousUid: string | null
}

interface UserStoreDispatch {
  setUser: (user: FirebaseAuthTypes.User | null) => void
  setUserDisplayName?: (displayName: string) => void
  setAnonymousUid: (uid: string | null) => void
}

export interface IUserSlice extends UserState, UserStoreDispatch {}

export type CreateUserSlice = StoreSlice<IUserSlice>

export interface IUserInfo {
  canUseData: boolean
  setCanUseData: (value: boolean) => void
}

export type CreateUserInfoSlice = StoreSlice<IUserInfo>

export interface VideoRecording {
  id: string
  uri: string
  recordedAt: Date
  isUploaded?: boolean
  thumbnail: {
    height: number
    width: number
    uri: string
  }
  durationInMillis: number
  name: string
  eventId: string
  slug: string
}

export interface LocalVideoRecording {
  id: string
  localUri: string
  recordedAt: Date
  isUploaded?: boolean
  thumbnail: {
    height: number
    width: number
    localUri: string
  }
  durationInMillis: number
  name: string
  eventId: string
  slug: string
}

export type VideoRecordings = VideoRecording[]

export type LocalVideoRecordings = LocalVideoRecording[]

export interface IVideoSlice {
  recordings: LocalVideoRecordings
  recordingInterrupted: boolean
  setRecordingInterrupted: (recordingInterrupted: boolean) => void
  addRecord: (recording: VideoRecording) => void
  removeRecord: (recording: VideoRecording) => void
  markVideoAsUploaded: (uri: string) => void
  getRecordings: () => VideoRecordings
  clearRecordings: () => void
}

export type CreateVideoSlice = StoreSlice<IVideoSlice, IQueueSlice>
