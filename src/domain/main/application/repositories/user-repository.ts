import { User } from '../../enterprise/entities/user'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
  create(user: User): Promise<void>
  delete(user: User): Promise<void>
}
