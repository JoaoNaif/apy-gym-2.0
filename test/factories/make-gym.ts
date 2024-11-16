import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import { Gym, GymProps } from '../../src/domain/main/enterprise/entities/gym'
import { Cnpj } from '../../src/domain/main/enterprise/entities/value-objects/cnpj'
import { Phone } from '../../src/domain/main/enterprise/entities/value-objects/phone'
import { faker } from '@faker-js/faker'
import { generateFakeCNPJ } from 'test/utils/fakeCnpj'
import { generateFakePhone } from 'test/utils/fakePhone'

export function makeGym(override: Partial<GymProps> = {}, id?: UniqueEntityId) {
  const fakeCnpj = generateFakeCNPJ()
  const fakePhone = generateFakePhone()
  const gym = Gym.create(
    {
      name: faker.person.fullName(),
      cnpj: Cnpj.createFromText(fakeCnpj),
      phone: Phone.createFromText(fakePhone),
      password: faker.internet.password(),
      email: faker.internet.email(),
      address: faker.location.city(),
      numberPeop: faker.number.int(),
      assessment: faker.number.int(),
      checkIns: faker.number.int(),
      openingHours: '11h as 20h',
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return gym
}
