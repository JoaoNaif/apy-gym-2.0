import { Gym } from "../../enterprise/entities/gym";

export interface findManyNearbyParams {
    latitude: number
    longitude: number
}

export interface GymRepository {
    findById(id: string): Promise<Gym | null>
    findByEmail(email: string): Promise<Gym | null>
    findByCnpj(cnpj: string): Promise<Gym | null>
    findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
    save(gym: Gym): Promise<void>
    create(gym: Gym): Promise<void>
    delete(gym: Gym): Promise<void>
}