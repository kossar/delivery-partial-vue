import { ETransportType } from "./enums/ETransportType";

export interface ITransportOfferAdd {
    transportOfferInfo: string | null;
    transportType: ETransportType | null;
    price: number;
    availableLoadCapacity: number;
    freeSeats: number;
    transportMetaId: string | null;
    vehicleId: string | null;
    trailerId: string | null;
    unitId: string | null;
}