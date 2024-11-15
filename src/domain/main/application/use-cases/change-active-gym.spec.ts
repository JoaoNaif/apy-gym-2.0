import { InMemoryGymRepository } from 'test/repositories/in-memory-gym-repository'
import { makeGym } from 'test/factories/make-gym'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { ChangeActiveGymUseCase } from './change-active-gym'

let inMemoryGymRepository: InMemoryGymRepository

let sut: ChangeActiveGymUseCase

describe('Change Active Gym', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new ChangeActiveGymUseCase(inMemoryGymRepository)
  })

  it('Should be able to update a gym', async () => {
    const newGym = makeGym(
      {
        name: 'gym app',
      },
      new UniqueEntityId('gym-1'),
    )

    await inMemoryGymRepository.create(newGym)

    await sut.execute({
      gymId: 'gym-1',
    })

    expect(inMemoryGymRepository.items[0].active).toBe(false)
  })
})
