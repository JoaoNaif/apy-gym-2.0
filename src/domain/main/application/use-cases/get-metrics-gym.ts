import { Either, left, right } from '../../../../core/either'
import { GymRepository } from '../repositories/gym-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { GetMetricsGymDTO } from './dtos/get-metrics-gym-dto'

interface GetMetricsGymUseCaseRequest {
  gymId: string
}

type GetMetricsGymUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    gym: GetMetricsGymDTO
  }
>

export class GetMetricsGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute({
    gymId,
  }: GetMetricsGymUseCaseRequest): Promise<GetMetricsGymUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    const gymMetricsDTO: GetMetricsGymDTO = {
      numberPeop: gym.numberPeop,
      assessment: gym.assessment,
      checkIns: gym.checkIns,
    }

    return right({
      gym: gymMetricsDTO,
    })
  }
}
