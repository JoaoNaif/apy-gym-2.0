import { Entity } from '@/core/entities/entity'
import { Phone } from './value-objects/phone'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  phone: Phone
  password: string
  plan: 'GOLD' | 'SILVER' | 'BRONZE'
  latitude: number
  longitude: number
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get password() {
    return this.props.password
  }

  get plan() {
    return this.props.plan
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  set name(name: string) {
    this.props.name = name
  }

  set email(email: string) {
    this.props.email = email
  }

  set phone(phone: Phone) {
    this.props.phone = phone
  }

  set plan(plan: 'GOLD' | 'SILVER' | 'BRONZE') {
    this.props.plan = plan
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt
  }

  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityId) {
    const user = new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
