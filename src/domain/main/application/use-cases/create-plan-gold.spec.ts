import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { CreatePlanGoldUseCase } from './create-plan-gold'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: CreatePlanGoldUseCase

describe('Create Plan Gold', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new CreatePlanGoldUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to create a gold plan annually', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'GOLD',
        plan: 'ANUAL',
        price: 1800,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })

  it('Should be able to create a semi-annual gold plan', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'SEMESTRAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'GOLD',
        plan: 'SEMESTRAL',
        price: 900,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })

  it('Should be able to create on a monthly basis', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'MENSAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'GOLD',
        plan: 'MENSAL',
        price: 150,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })
})
