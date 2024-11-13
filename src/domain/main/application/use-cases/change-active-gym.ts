import { Either, left, right } from "../../../../core/either";
import { GymRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";

interface ChangeActiveGymUseCaseRequest {
    gymId: string
}

type ChangeActiveGymUseCaseResponse = Either<
    ResourceNotFoundError,
    null
>

export class ChangeActiveGymUseCase {
    constructor(
      private gymRepository: GymRepository,
    ) {}

    async execute({
        gymId,
    }: ChangeActiveGymUseCaseRequest): Promise<ChangeActiveGymUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            return left(new ResourceNotFoundError())
        }

        gym.active = !gym.active

        await this.gymRepository.save(gym)

        return right(null)
    }
}