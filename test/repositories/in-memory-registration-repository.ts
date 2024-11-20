import { RegistrationRepository } from '@/domain/main/application/repositories/registration-repository'
import { Registration } from '@/domain/main/enterprise/entities/registration'

export class InMemoryRegistrationRepository implements RegistrationRepository {
  public items: Registration[] = []

  async findById(id: string) {
    const registration = this.items.find((item) => item.id.toString() === id)

    if (!registration) {
      return null
    }

    return registration
  }

  async save(registration: Registration) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === registration.id,
    )

    this.items[itemIndex] = registration
  }

  async create(registration: Registration) {
    this.items.push(registration)
  }

  async delete(registration: Registration) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === registration.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
