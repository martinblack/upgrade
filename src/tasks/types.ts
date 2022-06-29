export enum UploadStatus {
  IDLE = 'idle',
  UPLOADING = 'uploading',
  FINISHED = 'finished',
  ERROR = 'error',
  EXCEEDED = 'exceeded',
  CANCELED = 'canceled',
  NO_CONNECTION = 'NoConnection',
  CANCEL_RUNNING = 'CancelRunning',
  MISSING_VIDEO = 'MissingVideo',
  MISSING_CHUNK = 'MissingChunk',
}

export enum TASKS {
  VIDEO_UPLOAD = 'com.transistorsoft.videoUpload',
}
