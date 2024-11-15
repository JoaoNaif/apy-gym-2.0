import { Either, left, right } from '../../../../core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user-repository'
import { Phone } from '../../enterprise/entities/value-objects/phone'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface EditUserUseCaseRequest {
  userId: string
  name?: string
  phone?: string
  latitude?: number
  longitude?: number
}

type EditUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    name,
    phone,
    latitude,
    longitude,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    if (phone) {
      user.phone = Phone.createFromText(phone)
    }

    user.name = name ?? user.name
    user.latitude = latitude ?? user.latitude
    user.longitude = longitude ?? user.longitude

    return right({
      user,
    })
  }
}
