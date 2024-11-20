import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { CreatePlanBronzeUseCase } from './create-plan-bronze'
import { InMemoryPlanRepository } from 'test/repositories/in-memory-plan-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPlanRepository: InMemoryPlanRepository

let sut: CreatePlanBronzeUseCase

describe('Create Plan Bronze', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPlanRepository = new InMemoryPlanRepository()
    sut = new CreatePlanBronzeUseCase(
      inMemoryUserRepository,
      inMemoryPlanRepository,
    )
  })

  it('Should be able to create a bronze plan annually', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'ANUAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'BRONZE',
        plan: 'ANUAL',
        price: 1200,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })

  it('Should be able to create a semi-annual bronze plan', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      planDuration: 'SEMESTRAL',
    })

    expect(result.value).toMatchObject({
      plan: {
        category: 'BRONZE',
        plan: 'SEMESTRAL',
        price: 600,
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
        category: 'BRONZE',
        plan: 'MENSAL',
        price: 100,
      },
    })

    expect(user.planId?.toString()).toEqual(expect.any(String))
  })
})
