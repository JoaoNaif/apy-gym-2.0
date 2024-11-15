import { Either, right } from '../../../../core/either'
import { GymRepository } from '../repositories/gym-repository'
import { Gym } from '../../enterprise/entities/gym'

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyUseCaseResponse = Either<
  null,
  {
    gyms: Gym[]
  }
>

export class FetchNearbyUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return right({
      gyms,
    })
  }
}
