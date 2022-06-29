import { gql } from '@apollo/client'
import { UserType } from '@/gql/fragments/userType'

export const REGISTER_ME_MUTATION = gql`
  mutation registerMe($uid: String!, $replace: String) {
    registerMe(uid: $uid, replace: $replace) {
      __typename
      user {
        ...UserType
      }
    }
  }
  ${UserType}
`
