import { ETransportType } from "./enums/ETransportType";
import { ITrailer } from "./ITrailer";
import { ITransportMeta } from "./ITransportMeta";
import { IVehicle } from "./IVehicle";

export interface ITransportOffer{
    id: string;
    transportOfferInfo: string | null;
    transportType: ETransportType;
    price: number;
    availableLoadCapacity: number;
    freeSeats: number;
    transportMeta: ITransportMeta;
    appUserId: string;
    vehicle: IVehicle;
    trailer: ITrailer | null;
    unitId: string | null;
}