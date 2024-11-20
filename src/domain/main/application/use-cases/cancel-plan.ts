import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { PlanRepository } from '../repositories/plan-repository'
import { UserRepository } from '../repositories/user-repository'
import { PlanNotExistError } from './errors/plan-not-exist-error'

interface CancelPlanUseCaseRequest {
  userId: string
}

type CancelPlanUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  null
>

export class CancelPlanUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
  ) {}

  async execute({
    userId,
  }: CancelPlanUseCaseRequest): Promise<CancelPlanUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (!user.planId) {
      return left(new PlanNotExistError())
    }

    const plan = await this.planRepository.findById(user.planId.toString())

    if (!plan) {
      return left(new PlanNotExistError())
    }

    plan.status = 'CANCELED'

    await this.planRepository.save(plan)

    return right(null)
  }
}
