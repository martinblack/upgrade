export const EMPTY_SIGN_IN_INFO = {
  email: '',
  password: '',
}

export const EMPTY_SIGN_UP_INFO = {
  firstName: '',
  lastName: '',
  ...EMPTY_SIGN_IN_INFO,
}

export const USER_NOT_FOUND = 'auth/user-not-found'
export const IS_LOGIN = true

export const FIREBASE_PROVIDER = 'password'
