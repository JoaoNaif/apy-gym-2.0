import { InMemoryGymRepository } from "test/repositories/in-memory-gym-repository";
import { makeGym } from "test/factories/make-gym";
import { EditGymUseCase } from "./edit-gym";

let inMemoryGymRepository: InMemoryGymRepository

let sut: EditGymUseCase

describe('Edit Gym', () => {
    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        sut = new EditGymUseCase(
            inMemoryGymRepository,
        )
    })

    it('It must be possible to seek the information from the Gym', async () => {
        const newGym = makeGym({
            name: 'Fulano',
            address: 'Rua teste'
        })

        await inMemoryGymRepository.create(newGym)

        const result = await sut.execute({
            gymId: newGym.id.toString(),
            name: 'John Doe'
        })

        expect(inMemoryGymRepository.items[0]).toMatchObject({
            name: 'John Doe',
            address: 'Rua teste'
        })
    })
})