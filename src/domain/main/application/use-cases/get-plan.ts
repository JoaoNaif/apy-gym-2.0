import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Plan } from '../../enterprise/entities/plan'
import { PlanRepository } from '../repositories/plan-repository'
import { UserRepository } from '../repositories/user-repository'
import { PlanNotExistError } from './errors/plan-not-exist-error'

interface GetPlanUseCaseRequest {
  userId: string
}

type GetPlanUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  {
    plan: Plan
  }
>

export class GetPlanUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
  ) {}

  async execute({
    userId,
  }: GetPlanUseCaseRequest): Promise<GetPlanUseCaseResponse> {
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

    const now = Date.now()

    if (plan.endDate.getTime() < now) {
      plan.status = 'EXPIRED'
    }

    return right({
      plan,
    })
  }
}
