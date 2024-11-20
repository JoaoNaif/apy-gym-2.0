import { Either, left, right } from '../../../../core/either'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Registration } from '../../enterprise/entities/registration'
import { RegistrationRepository } from '../repositories/registration-repository'
import { PlanNotExistError } from './errors/plan-not-exist-error'

interface GetRegistrationUseCaseRequest {
  registrationId: string
}

type GetRegistrationUseCaseResponse = Either<
  ResourceNotFoundError | PlanNotExistError,
  {
    registration: Registration
  }
>

export class GetRegistrationUseCase {
  constructor(private registrationRepository: RegistrationRepository) {}

  async execute({
    registrationId,
  }: GetRegistrationUseCaseRequest): Promise<GetRegistrationUseCaseResponse> {
    const registration =
      await this.registrationRepository.findById(registrationId)

    if (!registration) {
      return left(new ResourceNotFoundError())
    }

    return right({
      registration,
    })
  }
}
