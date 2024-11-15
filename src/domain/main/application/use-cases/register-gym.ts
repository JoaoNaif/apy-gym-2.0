import { Either, left, right } from '../../../../core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { GymRepository } from '../repositories/gym-repository'
import { GymAlreadyExistError } from './errors/gym-already-exist-error'
import { Gym } from '../../enterprise/entities/gym'
import { Cnpj } from '../../enterprise/entities/value-objects/cnpj'
import { Phone } from '../../enterprise/entities/value-objects/phone'

interface RegisterGymUseCaseRequest {
  name: string
  email: string
  password: string
  cnpj: string
  phone: string
  numberPeop: number
  openingHours: string
  address: string
  latitude: number
  longitude: number
}

type RegisterGymUseCaseResponse = Either<
  GymAlreadyExistError,
  {
    gym: Gym
  }
>

export class RegisterGymUseCase {
  constructor(
    private gymRepository: GymRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    password,
    email,
    phone,
    cnpj,
    address,
    latitude,
    longitude,
    numberPeop,
    openingHours,
  }: RegisterGymUseCaseRequest): Promise<RegisterGymUseCaseResponse> {
    const gymWithSameCnpj = await this.gymRepository.findByCnpj(cnpj)

    if (gymWithSameCnpj) {
      return left(new GymAlreadyExistError())
    }

    const cnpjText = Cnpj.createFromText(cnpj)
    const phoneText = Phone.createFromText(phone)
    const hashedPassword = await this.hashGenerator.hash(password)

    const gym = Gym.create({
      name,
      email,
      cnpj: cnpjText,
      phone: phoneText,
      password: hashedPassword,
      address,
      numberPeop,
      openingHours,
      latitude,
      longitude,
    })

    await this.gymRepository.create(gym)

    return right({
      gym,
    })
  }
}
