import { UseCaseError } from '@/core/errors/use-case-error'

export class GymAlreadyExistError extends Error implements UseCaseError {
  constructor() {
    super('Gym already exist')
  }
}
