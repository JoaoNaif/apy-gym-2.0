import { InMemoryGymRepository } from "test/repositories/in-memory-gym-repository";
import { makeGym } from "test/factories/make-gym";
import { DeleteGymUseCase } from "./delete-gym";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id";

let inMemoryGymRepository: InMemoryGymRepository

let sut: DeleteGymUseCase

describe('Delete Gym', () => {
    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        sut = new DeleteGymUseCase(
            inMemoryGymRepository,
        )
    })

    it('Should be able to delete a gym', async () => {
        const newGym = makeGym(
            {
                name: 'gym app',
            },
            new UniqueEntityId('gym-1')
        )

        await inMemoryGymRepository.create(newGym)

        await sut.execute({
            gymId: 'gym-1',
        })

        expect(inMemoryGymRepository.items).toHaveLength(0)
    })
})