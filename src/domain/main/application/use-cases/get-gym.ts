import { Either, left, right } from "../../../../core/either";
import { GymRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";
import { GetGymDTO } from "./dtos/get-gym-dto";

interface GetGymUseCaseRequest {
    gymId: string
}

type GetGymUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        gym: GetGymDTO
    }
>

export class GetGymUseCase {
    constructor(
      private gymRepository: GymRepository,
    ) {}

    async execute({
        gymId,
    }: GetGymUseCaseRequest): Promise<GetGymUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            return left(new ResourceNotFoundError())
        }

        const gymDTO: GetGymDTO = {
            address: gym.address,
            name: gym.name,
            cnpj: gym.cnpj.value,
            phone: gym.phone.value,
            email: gym.email,
            numberPeop: gym.numberPeop,
            openingHours: gym.openingHours,
            latitude: gym.latitude,
            longitude: gym.longitude,
            createdAt: gym.createdAt,
            updatedAt: gym.updatedAt,
        }

        return right({
            gym: gymDTO,
        })
    }
}