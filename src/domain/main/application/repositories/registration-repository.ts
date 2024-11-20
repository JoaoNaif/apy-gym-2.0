import { Registration } from '../../enterprise/entities/registration'

export interface RegistrationRepository {
  findById(id: string): Promise<Registration | null>
  save(registration: Registration): Promise<void>
  create(registration: Registration): Promise<void>
  delete(registration: Registration): Promise<void>
}
