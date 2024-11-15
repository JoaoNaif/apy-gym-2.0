import { Either, left, right } from '../../../../core/either'
import { GymRepository } from '../repositories/gym-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface DeleteGymUseCaseRequest {
  gymId: string
}

type DeleteGymUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    gymId,
  }: DeleteGymUseCaseRequest): Promise<DeleteGymUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    await this.gymRepository.delete(gym)

    return right(null)
  }
}
