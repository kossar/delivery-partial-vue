import { ILocation } from "./ILocation";

export interface ITransportMeta {
    id: string;
    startLocation: ILocation;
    destinationLocation: ILocation;
    startTime: string;

}