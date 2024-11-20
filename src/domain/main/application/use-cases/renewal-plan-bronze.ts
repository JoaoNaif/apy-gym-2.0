import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { PlanRepository } from '../repositories/plan-repository'
import { UserRepository } from '../repositories/user-repository'
import { BRONZE_PLAN_CONFIG } from './config/bronze-plan-config'
import { PlanNotExistError } from './errors/plan-not-exist-error'
import { PlanStatusError } from './errors/plan-status-error'

interface RenewalPlanBronzeUseCaseRequest {
  userId: string
  planDuration: 'MENSAL' | 'SEMESTRAL' | 'ANUAL'
}

type RenewalPlanBronzeUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  null
>

export class RenewalPlanBronzeUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
  ) {}

  async execute({
    userId,
    planDuration,
  }: RenewalPlanBronzeUseCaseRequest): Promise<RenewalPlanBronzeUseCaseResponse> {
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

    if (['ACTIVE', 'SUSPENDED'].includes(plan.status)) {
      return left(new PlanStatusError(plan.status))
    }

    const { description, category, cancellationPolicy, perks, price } =
      BRONZE_PLAN_CONFIG

    if (planDuration === 'ANUAL') {
      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setFullYear(startDate.getFullYear() + 1)

      plan.startDate = startDate
      plan.endDate = endDate
      plan.status = 'ACTIVE'

      plan.category = category
      plan.description = description
      plan.perks = perks
      plan.price = price * 12
      plan.cancellationPolicy = cancellationPolicy

      await this.planRepository.save(plan)

      return right(null)
    }

    if (planDuration === 'SEMESTRAL') {
      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setMonth(startDate.getMonth() + 6)

      plan.startDate = startDate
      plan.endDate = endDate
      plan.status = 'ACTIVE'

      plan.category = category
      plan.description = description
      plan.perks = perks
      plan.price = price * 6
      plan.cancellationPolicy = cancellationPolicy

      await this.planRepository.save(plan)

      return right(null)
    }

    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setMonth(startDate.getMonth() + 1)

    plan.startDate = startDate
    plan.endDate = endDate
    plan.status = 'ACTIVE'

    plan.category = category
    plan.description = description
    plan.perks = perks
    plan.price = price
    plan.cancellationPolicy = cancellationPolicy

    await this.planRepository.save(plan)

    return right(null)
  }
}
