import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PlanProps {
  category: 'GOLD' | 'SILVER' | 'BRONZE'
  description: string
  plan: 'MENSAL' | 'SEMESTRAL' | 'ANUAL'
  startDate: Date
  endDate: Date
  price: number
  discount?: number | null
  cancellationPolicy: number
  status: 'ACTIVE' | 'CANCELED' | 'SUSPENDED' | 'EXPIRED'
  perks?: string[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Plan extends Entity<PlanProps> {
  get category() {
    return this.props.category
  }

  get description() {
    return this.props.description
  }

  get plan() {
    return this.props.plan
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  get price() {
    return this.props.price
  }

  get discount() {
    return this.props.discount
  }

  get cancellationPolicy() {
    return this.props.cancellationPolicy
  }

  get status() {
    return this.props.status
  }

  get perks() {
    return this.props.perks ?? []
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get createdAt() {
    return this.props.createdAt
  }

  set category(category: 'GOLD' | 'SILVER' | 'BRONZE') {
    this.props.category = category
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set plan(plan: 'MENSAL' | 'SEMESTRAL' | 'ANUAL') {
    this.props.plan = plan
    this.touch()
  }

  set startDate(startDate: Date) {
    this.props.startDate = startDate
    this.touch()
  }

  set endDate(endDate: Date) {
    this.props.endDate = endDate
    this.touch()
  }

  set price(price: number) {
    this.props.price = price
    this.touch()
  }

  set discount(discount: number | null | undefined) {
    this.props.discount = discount
    this.touch()
  }

  set cancellationPolicy(cancellationPolicy: number) {
    this.props.cancellationPolicy = cancellationPolicy
    this.touch()
  }

  set status(status: 'ACTIVE' | 'CANCELED' | 'SUSPENDED' | 'EXPIRED') {
    this.props.status = status
    this.touch()
  }

  set perks(perks: string[]) {
    this.props.perks = perks
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<PlanProps, 'createdAt'>, id?: UniqueEntityId) {
    const plan = new Plan(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return plan
  }
}
