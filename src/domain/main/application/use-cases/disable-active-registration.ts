import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { PlanRepository } from '../repositories/plan-repository'
import { RegistrationRepository } from '../repositories/registration-repository'
import { UserRepository } from '../repositories/user-repository'
import { PlanNotExistError } from './errors/plan-not-exist-error'

interface DisableActiveRegistrationUseCaseRequest {
  registrationId: string
}

type DisableActiveRegistrationUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  null
>

export class DisableActiveRegistrationUseCase {
  constructor(
    private userRepository: UserRepository,
    private planRepository: PlanRepository,
    private registrationRepository: RegistrationRepository,
  ) {}

  async execute({
    registrationId,
  }: DisableActiveRegistrationUseCaseRequest): Promise<DisableActiveRegistrationUseCaseResponse> {
    const registration =
      await this.registrationRepository.findById(registrationId)

    if (!registration) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.userRepository.findById(
      registration.userId.toString(),
    )

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

    registration.active = false

    await this.registrationRepository.save(registration)

    plan.status = 'SUSPENDED'

    await this.planRepository.save(plan)

    return right(null)
  }
}
