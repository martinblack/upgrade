import { gql } from '@apollo/client'

export const UserType = gql`
  fragment UserType on UserType {
    id
    email
    firstName
    lastName
    firebaseId
  }
`
