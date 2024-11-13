import { Either, left, right } from "../../../../core/either";
import { GymRepository } from "../repositories/gym-repository";
import { ResourceNotFoundError } from "../../../../core/errors/errors/resource-not-found-error";
import { Gym } from "../../enterprise/entities/gym";
import { Phone } from "../../enterprise/entities/value-objects/phone";

interface EditGymUseCaseRequest {
    gymId: string
    name?: string
    address?: string
    phone?: string
    numberPeop?: number
    openingHours?: string
    latitude?: number
    longitude?: number
}

type EditGymUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        gym: Gym
    }
>

export class EditGymUseCase {
    constructor(
      private gymRepository: GymRepository,
    ) {}

    async execute({
        gymId,
        address,
        latitude,
        longitude,
        name,
        numberPeop,
        openingHours,
        phone,
    }: EditGymUseCaseRequest): Promise<EditGymUseCaseResponse> {
        const gym = await this.gymRepository.findById(gymId)

        if (!gym) {
            return left(new ResourceNotFoundError())
        }

        if (phone) {
            gym.phone = Phone.createFromText(phone) ?? gym.phone
        }

        gym.name = name ?? gym.name
        gym.address = address ?? gym.address
        gym.openingHours = openingHours ?? gym.openingHours
        gym.latitude = latitude ?? gym.latitude
        gym.longitude = longitude ?? gym.longitude
        gym.numberPeop = numberPeop ?? gym.numberPeop


        return right({
            gym,
        })
    }
}