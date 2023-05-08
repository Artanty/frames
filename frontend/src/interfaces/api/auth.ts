export interface LoginApiRequest {
  "email": string
  "password": string
}

export interface LoginApiResponse {
  "user": {
      "id": number
      "name": string
      "email": string
      "email_verified_at": any
      "created_at": string
      "updated_at": string
  },
  "token": string
}

export interface RegisterApiRequest {
  name: string
  email: string
  password: string
  password_confirmation: string
}