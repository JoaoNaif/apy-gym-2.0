import { Either, left, right } from '../../../../core/either'
import { HashGenerator } from '../cryptography/hash-generator'
import { User } from '../../enterprise/entities/user'
import { UserAlreadyExistError } from './errors/user-already-exist-error'
import { UserRepository } from '../repositories/user-repository'
import { Phone } from '../../enterprise/entities/value-objects/phone'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  plan: 'GOLD' | 'SILVER' | 'BRONZE'
  latitude: number
  longitude: number
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    password,
    email,
    plan,
    phone,
    latitude,
    longitude,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistError())
    }

    const phoneText = Phone.createFromText(phone)
    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      phone: phoneText,
      password: hashedPassword,
      plan,
      latitude,
      longitude,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
