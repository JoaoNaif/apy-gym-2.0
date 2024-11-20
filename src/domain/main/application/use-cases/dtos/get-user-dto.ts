export interface GetUserDTO {
  id: string
  name: string
  email: string
  phone: string
  planId: string | null
  latitude: number
  longitude: number
  createdAt: Date
}
