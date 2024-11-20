import { Either, left, right } from '../../../../core/either'
import { GymRepository } from '../repositories/gym-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { UserRepository } from '../repositories/user-repository'
import { Registration } from '../../enterprise/entities/registration'
import { RegistrationRepository } from '../repositories/registration-repository'

interface CreateRegistrationUseCaseRequest {
  gymId: string
  userId: string
}

type CreateRegistrationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    registration: Registration
  }
>

export class CreateRegistrationUseCase {
  constructor(
    private gymRepository: GymRepository,
    private userRepository: UserRepository,
    private registrationRepository: RegistrationRepository,
  ) {}

  async execute({
    gymId,
    userId,
  }: CreateRegistrationUseCaseRequest): Promise<CreateRegistrationUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const registration = Registration.create({
      userId: user.id,
      gymId: gym.id,
    })

    await this.registrationRepository.create(registration)

    return right({
      registration,
    })
  }
}
