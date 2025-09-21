import { gql } from "@apollo/client"

//  Register a new user
export const REGISTER_USER = gql`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String!) {
    register(name: $name, email: $email, password: $password, role: $role) {
      id
      name
      email
      role
      token
    }
  }
`

//  Login user
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
      token
    }
  }
`

//  Admin login
export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!, $secretKey: String!) {
    adminLogin(email: $email, password: $password, secretKey: $secretKey) {
      id
      name
      email
      role
      token
    }
  }
`
