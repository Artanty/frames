export interface LoginApiRequest {
  "email": string
  "password": string
}

export interface LoginApiResponse {
  "user": GetUserApiResponse,
  "token": string
}

export interface RegisterApiRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface GetUserApiResponse {
  "id": number
  "name": string
  "email": string
  "email_verified_at": any
  "created_at": string
  "updated_at": string
}