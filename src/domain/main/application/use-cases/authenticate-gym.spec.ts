import { InMemoryGymRepository } from "test/repositories/in-memory-gym-repository";
import { FakeHasher } from "test/cryptography/fake-hasher";
import { FakeEncrypter } from "test/cryptography/fake-encrypter";
import { AuthenticateGymUseCase } from "./authenticate-gym";
import { makeGym } from "test/factories/make-gym";

let inMemoryGymRepository: InMemoryGymRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter


let sut: AuthenticateGymUseCase

describe('Authenticate Gym', () => {
    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        fakeHasher = new FakeHasher()
        fakeEncrypter = new FakeEncrypter()
        sut = new AuthenticateGymUseCase(
            inMemoryGymRepository,
            fakeHasher,
            fakeEncrypter,
        )
    })

    it('Gym should be able to authenticate', async () => {
        const gym = makeGym({
            email: 'johndoe@email.com',
            password: await fakeHasher.hash('123456')
        })

        inMemoryGymRepository.items.push(gym)

        const result = await sut.execute({
            email: 'johndoe@email.com',
            password: '123456'
        })

        expect(result.value).toEqual({
            accessToken: expect.any(String),
        })
    })
})