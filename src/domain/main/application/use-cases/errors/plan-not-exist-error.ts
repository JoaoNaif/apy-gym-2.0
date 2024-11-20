import { UseCaseError } from '@/core/errors/use-case-error'

export class PlanNotExistError extends Error implements UseCaseError {
  constructor() {
    super('Plan not exist')
  }
}
