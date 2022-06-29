import { gql } from '@apollo/client'
import { UserType } from '@/gql/fragments/userType'

export const UPDATE_ME_MUTATION = gql`
  mutation updateMe($firstName: String, $lastName: String) {
    updateMe(firstName: $firstName, lastName: $lastName) {
      me {
        ...UserType
      }
    }
  }
  ${UserType}
`
