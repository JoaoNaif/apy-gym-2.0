import { Either, left, right } from '../../../../core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { GetUserDTO } from './dtos/get-user-dto'

interface GetUserUseCaseRequest {
  userId: string
}

type GetUserUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: GetUserDTO
  }
>

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const userDTO: GetUserDTO = {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone.value,
      planId: user.planId?.toString() ?? null,
      latitude: user.latitude,
      longitude: user.longitude,
      createdAt: user.createdAt,
    }

    return right({
      user: userDTO,
    })
  }
}
