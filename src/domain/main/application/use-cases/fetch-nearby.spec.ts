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

  it('It should be possible to find the nearest gyms (10km)', async () => {
    const newGym1 = makeGym(
      {
        name: 'gym near',
        latitude: -23.5591942,
        longitude: -46.5836981,
      },
      new UniqueEntityId('gym-1'),
    )

    const newGym3 = makeGym(
      {
        name: 'gym near 2',
        latitude: -23.5591942,
        longitude: -46.5836981,
      },
      new UniqueEntityId('gym-1'),
    )

    await inMemoryGymRepository.create(newGym1)
    await inMemoryGymRepository.create(newGym3)

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
      expect(gyms).toHaveLength(2)
      expect(gyms).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'gym near' }),
          expect.objectContaining({ name: 'gym near 2' }),
        ]),
      )
    }
  })
})
