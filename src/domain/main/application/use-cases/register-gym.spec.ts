import { InMemoryGymRepository } from "test/repositories/in-memory-gym-repository";
import { RegisterGymUseCase } from "./register-gym";
import { FakeHasher } from "test/cryptography/fake-hasher";

let inMemoryGymRepository: InMemoryGymRepository
let fakeHasher: FakeHasher
let sut: RegisterGymUseCase

describe('Create Gym', () => {
    beforeEach(() => {
        inMemoryGymRepository = new InMemoryGymRepository()
        fakeHasher = new FakeHasher()
        sut = new RegisterGymUseCase(
            inMemoryGymRepository,
            fakeHasher
        )
    })

    it('should be able to register a new gym', async () => {
        const result = await sut.execute({
            name: 'Acqua Gym',
            cnpj: '11222333444455',
            phone: '11951615111',
            address: 'Rua teste',
            email: 'acqua@email.com',
            password: '132456',
            openingHours: '13h as 20h',
            numberPeop: 0,
            latitude: -23.623352,
            longitude: -46.558612,
        })

        expect(result.isRight()).toBe(true)
        expect(result.value).toEqual({
            gym: inMemoryGymRepository.items[0]
        })
    })

    it ('password must be encrypted', async () => {
        const result = await sut.execute({
            name: 'Acqua Gym',
            cnpj: '11222333444455',
            phone: '11951615111',
            address: 'Rua teste',
            email: 'acqua@email.com',
            password: '123456',
            openingHours: '13h as 20h',
            numberPeop: 0,
            latitude: -23.623352,
            longitude: -46.558612,
        })

        const hashedPassword = await fakeHasher.hash('123456')

        expect(result.isRight()).toBe(true)
        expect(inMemoryGymRepository.items[0].password).toEqual(
            hashedPassword,
        )
    })
})