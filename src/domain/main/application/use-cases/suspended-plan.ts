import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { PlanRepository } from '../repositories/plan-repository'
import { UserRepository } from '../repositories/user-repository'
import { PlanNotExistError } from './errors/plan-not-exist-error'

interface SuspendedPlanUseCaseRequest {
  userId: string
}

type SuspendedPlanUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  null
>

export class SuspendedPlanUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
  ) {}

  async execute({
    userId,
  }: SuspendedPlanUseCaseRequest): Promise<SuspendedPlanUseCaseResponse> {
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

    plan.status = 'SUSPENDED'

    await this.planRepository.save(plan)

    return right(null)
  }
}
