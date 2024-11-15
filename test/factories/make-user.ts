import { User, UserProps } from '@/domain/main/enterprise/entities/user'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import { Phone } from '../../src/domain/main/enterprise/entities/value-objects/phone'
import { faker } from '@faker-js/faker'
import { generateFakePhone } from 'test/utils/fakePhone'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const fakePhone = generateFakePhone()
  const user = User.create(
    {
      name: faker.person.fullName(),
      phone: Phone.createFromText(fakePhone),
      password: faker.internet.password(),
      email: faker.internet.email(),
      plan: 'GOLD',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return user
}
