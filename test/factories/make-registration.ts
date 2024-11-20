import {
  Registration,
  RegistrationProps,
} from '@/domain/main/enterprise/entities/registration'
import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'

export function makeRegistration(
  override: Partial<RegistrationProps> = {},
  id?: UniqueEntityId,
) {
  const registration = Registration.create(
    {
      gymId: new UniqueEntityId('gym-1'),
      userId: new UniqueEntityId('user-1'),
      ...override,
    },
    id,
  )

  return registration
}
