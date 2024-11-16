import { Either, left, right } from '../../../../core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface ChangePlanUserUseCaseRequest {
  userId: string
  plan: 'GOLD' | 'SILVER' | 'BRONZE'
}

type ChangePlanUserUseCaseResponse = Either<ResourceNotFoundError, null>

export class ChangePlanUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    plan,
  }: ChangePlanUserUseCaseRequest): Promise<ChangePlanUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.plan = plan

    await this.userRepository.save(user)

    return right(null)
  }
}
