import { InMemoryGymRepository } from 'test/repositories/in-memory-gym-repository'
import { makeGym } from 'test/factories/make-gym'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { FetchNearbyUseCase } from './fetch-nearby'

let inMemoryGymRepository: InMemoryGymRepository

let sut: FetchNearbyUseCase

describe('Fetch Nearby Gym', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new FetchNearbyUseCase(inMemoryGymRepository)
  })

  it('Should be able to delete a gym', async () => {
    const newGym1 = makeGym(
      {
        name: 'gym near',
        latitude: -23.5591942,
        longitude: -46.5836981,
      },
      new UniqueEntityId('gym-1'),
    )

    await inMemoryGymRepository.create(newGym1)

    const newGym2 = makeGym(
      {
        name: 'gym far',
        latitude: -21.163709,
        longitude: -47.813523,
      },
      new UniqueEntityId('gym-2'),
    )

    await inMemoryGymRepository.create(newGym2)

    const result = await sut.execute({
      userLatitude: -23.5591942,
      userLongitude: -46.5836981,
    })

    if (result.isRight()) {
      const gyms = result.value.gyms
      expect(gyms).toHaveLength(1)
      expect(gyms).toEqual([expect.objectContaining({ name: 'gym near' })])
    }
  })
})
