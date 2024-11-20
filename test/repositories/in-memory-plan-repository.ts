import { PlanRepository } from '@/domain/main/application/repositories/plan-repository'
import { Plan } from '@/domain/main/enterprise/entities/plan'

export class InMemoryPlanRepository implements PlanRepository {
  public items: Plan[] = []

  async findById(id: string) {
    const plan = this.items.find((item) => item.id.toString() === id)

    if (!plan) {
      return null
    }

    return plan
  }

  async save(plan: Plan) {
    const itemIndex = this.items.findIndex((item) => item.id === plan.id)

    this.items[itemIndex] = plan
  }

  async create(plan: Plan) {
    this.items.push(plan)
  }

  async delete(plan: Plan) {
    const itemIndex = this.items.findIndex((item) => item.id === plan.id)

    this.items.splice(itemIndex, 1)
  }
}
