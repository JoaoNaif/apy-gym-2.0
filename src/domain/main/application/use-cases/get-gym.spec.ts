import { InMemoryGymRepository } from 'test/repositories/in-memory-gym-repository'
import { makeGym } from 'test/factories/make-gym'
import { GetGymUseCase } from './get-gym'

let inMemoryGymRepository: InMemoryGymRepository

let sut: GetGymUseCase

describe('Get Gym', () => {
  beforeEach(() => {
    inMemoryGymRepository = new InMemoryGymRepository()
    sut = new GetGymUseCase(inMemoryGymRepository)
  })

  it('It must be possible to seek the information from the Gym', async () => {
    const gym = makeGym()

    inMemoryGymRepository.items.push(gym)

    const result = await sut.execute({
      gymId: gym.id.toString(),
    })

    expect(result.value).toMatchObject({
      gym: {
        id: expect.any(String),
        name: expect.any(String),
        address: expect.any(String),
        phone: expect.any(String),
        email: expect.any(String),
        cnpj: expect.any(String),
        numberPeop: expect.any(Number),
        assessment: expect.any(Number),
        checkIns: expect.any(Number),
        openingHours: expect.any(String),
        latitude: expect.any(Number),
        longitude: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      },
    })
  })
})
