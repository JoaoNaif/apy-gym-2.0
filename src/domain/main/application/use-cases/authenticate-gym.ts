import { Either, left, right } from "../../../../core/either";
import { GymRepository } from "../repositories/gym-repository";
import { HashCompare } from "../cryptography/hash-compare";
import { Encrypter } from "../cryptography/encrypter";
import { WrongCredentialsError } from "./errors/wrong-credentials-error";

interface AuthenticateGymUseCaseRequest {
    email: string
    password: string
}

type AuthenticateGymUseCaseResponse = Either<
    WrongCredentialsError,
    {
        accessToken: string
    }
>

export class AuthenticateGymUseCase {
    constructor(
      private gymRepository: GymRepository,
      private hashCompare: HashCompare,
      private encrypter: Encrypter
    ) {}

    async execute({
        password,
        email,
    }: AuthenticateGymUseCaseRequest): Promise<AuthenticateGymUseCaseResponse> {
        const gym = await this.gymRepository.findByEmail(email)

        if (!gym) {
            return left(new WrongCredentialsError())
        }

        const isPasswordValid = await this.hashCompare.compare(
            password,
            gym.password,
        )

        if (!isPasswordValid) {
            return left(new WrongCredentialsError())
        }

        const accessToken = await this.encrypter.encrypt({
            sub: gym.id.toString(),
        })

        return right({
            accessToken,
        })
    }
}