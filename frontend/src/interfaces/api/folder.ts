export interface CreateFolderRequest {
  name: string
}

export interface CreateFolderResponse {
  name: string
  creator_id: number
  updated_at: string
  created_at: string
  id: number
}

export interface UpdateFolderRequest {
  id: number
  name: string
}
