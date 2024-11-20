import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { CreatePlanSilverUseCase } from './create-plan-silver'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: CreatePlanSilverUseCase

describe('Create Plan Silver', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new CreatePlanSilverUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to create a silver plan annually', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'SILVER',
        plan: 'ANUAL',
        price: 1500,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })

  it('Should be able to create a semi-annual silver plan', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'SEMESTRAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'SILVER',
        plan: 'SEMESTRAL',
        price: 750,
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
        category: 'SILVER',
        plan: 'MENSAL',
        price: 125,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })
})
