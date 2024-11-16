import { Either, left, right } from '../../../../core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
  userId: string
}

type DeleteUserUseCaseResponse = Either<ResourceNotFoundError, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    await this.userRepository.delete(user)

    return right(null)
  }
}
