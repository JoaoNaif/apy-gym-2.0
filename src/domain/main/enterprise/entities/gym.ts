import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Cnpj } from './value-objects/cnpj'
import { Phone } from './value-objects/phone'

export interface GymProps {
  name: string
  address: string
  phone: Phone
  email: string
  password: string
  cnpj: Cnpj
  numberPeop: number
  openingHours: string
  assessment: number
  checkIns: number
  latitude: number
  longitude: number
  active: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Gym extends Entity<GymProps> {
  get name() {
    return this.props.name
  }

  get address() {
    return this.props.address
  }

  get phone() {
    return this.props.phone
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get cnpj() {
    return this.props.cnpj
  }

  get numberPeop() {
    return this.props.numberPeop
  }

  get assessment() {
    return this.props.assessment
  }

  get checkIns() {
    return this.props.checkIns
  }

  get openingHours() {
    return this.props.openingHours
  }

  get active() {
    return this.props.active
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

  get updatedAt() {
    return this.props.updatedAt
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
  }

  set password(password: string) {
    this.props.password = password
  }

  set phone(phone: Phone) {
    this.props.phone = phone
    this.touch()
  }

  set numberPeop(numberPeop: number) {
    this.props.numberPeop = numberPeop
    this.touch()
  }

  set checkIns(checkIns: number) {
    this.props.checkIns = checkIns
    this.touch()
  }

  set assessment(assessment: number) {
    this.props.assessment = assessment
    this.touch()
  }

  set openingHours(openingHours: string) {
    this.props.openingHours = openingHours
    this.touch()
  }

  set active(active: boolean) {
    this.props.active = active
    this.touch()
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
    this.touch()
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<
      GymProps,
      'createdAt' | 'active' | 'assessment' | 'checkIns' | 'numberPeop'
    >,
    id?: UniqueEntityId,
  ) {
    const gym = new Gym(
      {
        ...props,
        active: true,
        assessment: 0,
        numberPeop: 0,
        checkIns: 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return gym
  }
}
