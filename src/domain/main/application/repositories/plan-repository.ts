import { Plan } from '../../enterprise/entities/plan'

export interface PlanRepository {
  findById(id: string): Promise<Plan | null>
  save(plan: Plan): Promise<void>
  create(plan: Plan): Promise<void>
  delete(plan: Plan): Promise<void>
}
