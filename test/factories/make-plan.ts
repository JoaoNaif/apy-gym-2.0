import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import { Plan, PlanProps } from '../../src/domain/main/enterprise/entities/plan'
import { faker } from '@faker-js/faker'

export function makePlan(
  override: Partial<PlanProps> = {},
  id?: UniqueEntityId,
) {
  const plan = Plan.create(
    {
      category: 'GOLD',
      description: faker.lorem.sentence(),
      plan: 'SEMESTRAL',
      startDate: new Date(),
      endDate: new Date(),
      status: 'ACTIVE',
      perks: [],
      price: faker.number.int(),
      cancellationPolicy: 10,
      ...override,
    },
    id,
  )

  return plan
}
