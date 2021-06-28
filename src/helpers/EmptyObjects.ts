import { ETransportType } from "@/domain/enums/ETransportType";
import { IDimensionsAdd } from "@/domain/IDimensionsAdd";
import { ILocationAdd } from "@/domain/ILocationAdd";
import { ITrailer } from "@/domain/ITrailer";
import { ITrailerAdd } from "@/domain/ITrailerAdd";
import { ITransportMetaAdd } from "@/domain/ITransportMetaAdd";
import { ITransportOfferAdd } from "@/domain/ITransportOfferAdd";
import { IVehicle } from "@/domain/IVehicle";
import { IVehicleAdd } from "@/domain/IVehicleAdd";
import { IMainRadios } from "@/types/IMainRadios";
import { Static } from "@vue/runtime-core"

export class EmptyObjects {
    static initLocation(): ILocationAdd {
        return {
            country: "",
            city: "",
            address: "",
            locationInfo: null
        }
    }

    static initTransportOfferAdd(): ITransportOfferAdd {
        return {
            transportOfferInfo: "",
            transportType: null,
            price: 0.0,
            availableLoadCapacity: 0,
            freeSeats: 0,
            transportMetaId: "",
            vehicleId: null,
            trailerId: null,
            unitId: null,
        }
    }

    static initVehicle(): IVehicleAdd {
        return {
            make: "",
            model: "",
            releaseDate: "",
            regNr: "",
            vehicleTypeId: null,
        }
    }

    static initTrailerAdd(): ITrailerAdd {
        return {
            loadCapacity: 0,
            regNr: "",
            unitId: null,
            dimensionsId: null,
        }
    }

    static initDimensionsAdd(): IDimensionsAdd {
        return {
            width: 0,
            height: 0,
            length: 0,
            unitId: null
        }
    }

    static initTransportMetaAdd(): ITransportMetaAdd {
        return {
            startLocationId: null,
            destinationLocationId: null,
            startTime: null
        }
    }

    static initRadios(): IMainRadios {
        return {
            withTrailer: false,
            usePrevTrailer: false,
            fromSavedVehicles: false
        }
    }
}
