import { UseCaseError } from '@/core/errors/use-case-error'

export class PlanStatusError extends Error implements UseCaseError {
  constructor(plan: string) {
    super(`Plan is ${plan}`)
  }
}
