import {
  findManyNearbyParams,
  GymRepository,
} from '@/domain/main/application/repositories/gym-repository'
import { Gym } from '@/domain/main/enterprise/entities/gym'
import { getDistanceBetweenCoordinates } from 'utils/get-distance-between-coordinates'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id.toString() === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findByEmail(email: string) {
    const gym = this.items.find((item) => item.email === email)

    if (!gym) {
      return null
    }

    return gym
  }

  async findByCnpj(cnpj: string) {
    const gym = this.items.find((item) => item.cnpj.value === cnpj)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyNearby(params: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: item.latitude,
          longitude: item.longitude,
        },
      )

      return distance < 10
    })
  }

  async save(gym: Gym) {
    const itemIndex = this.items.findIndex((item) => item.id === gym.id)

    this.items[itemIndex] = gym
  }

  async create(gym: Gym) {
    this.items.push(gym)
  }

  async delete(gym: Gym) {
    const itemIndex = this.items.findIndex((item) => item.id === gym.id)

    this.items.splice(itemIndex, 1)
  }
}
