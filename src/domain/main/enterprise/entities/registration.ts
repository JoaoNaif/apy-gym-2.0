import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RegistrationProps {
  userId: UniqueEntityId
  gymId: UniqueEntityId
  active: boolean
  createdAt: Date
}

export class Registration extends Entity<RegistrationProps> {
  get userId() {
    return this.props.userId
  }

  get gymId() {
    return this.props.gymId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get active() {
    return this.props.active
  }

  set active(active: boolean) {
    this.props.active = active
  }

  static create(
    props: Optional<RegistrationProps, 'createdAt' | 'active'>,
    id?: UniqueEntityId,
  ) {
    const registration = new Registration(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        active: true,
      },
      id,
    )

    return registration
  }
}
