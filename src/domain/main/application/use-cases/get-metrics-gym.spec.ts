import { InMemoryGymRepository } from 'test/repositories/in-memory-gym-repository'
import { makeGym } from 'test/factories/make-gym'
import { GetMetricsGymUseCase } from './get-metrics-gym'

let inMemoryGymRepository: InMemoryGymRepository

let sut: GetMetricsGymUseCase

describe('Get Metrics Gym', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new GetMetricsGymUseCase(inMemoryGymRepository)
  })

  it('It should be possible to take the gym metrics', async () => {
    const gym = makeGym({
      numberPeop: 20,
      assessment: 3,
      checkIns: 322,
    })

    inMemoryGymRepository.items.push(gym)

    const result = await sut.execute({
      gymId: gym.id.toString(),
    })

    expect(result.value).toMatchObject({
      gym: {
        numberPeop: 20,
        assessment: 3,
        checkIns: 322,
      },
    })
  })
})
