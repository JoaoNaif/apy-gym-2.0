import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Plan } from '../../enterprise/entities/plan'
import { PlanRepository } from '../repositories/plan-repository'
import { UserRepository } from '../repositories/user-repository'
import { GOLD_PLAN_CONFIG } from './config/gold-plan-config'

interface CreatePlanGoldUseCaseRequest {
  userId: string
  planDuration: 'MENSAL' | 'SEMESTRAL' | 'ANUAL'
  discount?: number | null
}

type CreatePlanGoldUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    plan: Plan
  }
>

export class CreatePlanGoldUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
  ) {}

  async execute({
    userId,
    planDuration,
    discount,
  }: CreatePlanGoldUseCaseRequest): Promise<CreatePlanGoldUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const { description, category, cancellationPolicy, perks, price } =
      GOLD_PLAN_CONFIG

    const status: 'ACTIVE' | 'CANCELED' | 'SUSPENDED' | 'EXPIRED' = 'ACTIVE'

    if (planDuration === 'ANUAL') {
      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setFullYear(startDate.getFullYear() + 1)

      const plan = Plan.create({
        category,
        description,
        cancellationPolicy,
        status,
        discount,
        perks,
        plan: planDuration,
        price: price * 12,
        startDate,
        endDate,
      })

      await this.planRepository.create(plan)

      user.planId = plan.id

      await this.userRepository.save(user)

      return right({
        plan,
      })
    }

    if (planDuration === 'SEMESTRAL') {
      const startDate = new Date()
      const endDate = new Date(startDate)
      endDate.setMonth(startDate.getMonth() + 6)

      const plan = Plan.create({
        category,
        description,
        cancellationPolicy,
        status,
        discount,
        perks,
        plan: planDuration,
        price: price * 6,
        startDate,
        endDate,
      })

      await this.planRepository.create(plan)

      user.planId = plan.id

      await this.userRepository.save(user)

      return right({
        plan,
      })
    }

    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setMonth(startDate.getMonth() + 1)

    const plan = Plan.create({
      category,
      description,
      cancellationPolicy,
      status,
      discount,
      perks,
      plan: planDuration,
      price,
      startDate,
      endDate,
    })

    await this.planRepository.create(plan)

    user.planId = plan.id

    await this.userRepository.save(user)

    return right({
      plan,
    })
  }
}
