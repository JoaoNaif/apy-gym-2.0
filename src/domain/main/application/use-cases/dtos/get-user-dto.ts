export interface GetUserDTO {
  id: string
  name: string
  email: string
  phone: string
  plan: 'GOLD' | 'SILVER' | 'BRONZE'
  latitude: number
  longitude: number
  createdAt: Date
}
