<template>
    <h4>Add new</h4>
    <hr />
    <OfferCreateEdit
        v-model:transportOffer="transportOfferAdd"
        v-model:transportMeta="transportMetaAdd"
        v-model:startLocation="startLocationAdd"
        v-model:destinationLocation="destinationLocationAdd"
        v-model:vehicle="vehicleAdd"
        v-model:trailer="trailerAdd"
        v-model:dimensions="dimensionsAdd"
        v-model:vehicleId="vehicleId"
        v-model:trailerId="trailerId"
        v-model:radios="radios"
    />
    <div class="form-group">
        <input
            type="submit"
            value="Post this offer"
            class="btn btn-primary"
            @click="saveTransportOffer($event)"
        />
    </div>

    <div>
        <a href="#" @click="$router.push('/transportoffers')">Back to list</a>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import OfferCreateEdit from "@/components/OfferCreateEdit.vue";

import { ETransportType } from "@/domain/enums/ETransportType";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { ITransportOfferAdd } from "@/domain/ITransportOfferAdd";
import { ITrailer } from "@/domain/ITrailer";
import { IVehicle } from "@/domain/IVehicle";
import { IDimensionsAdd } from "@/domain/IDimensionsAdd";
import { IDimensions } from "@/domain/IDimensions";

import { ITransportMetaAdd } from "@/domain/ITransportMetaAdd";
import { ITransportMeta } from "@/domain/ITransportMeta";

import { BaseService } from "@/services/BaseService";
import { EmptyObjects } from "@/helpers/EmptyObjects";

import store from "@/store";
import { ILocationAdd } from "@/domain/ILocationAdd";
import { ILocation } from "@/domain/ILocation";
import { IVehicleAdd } from "@/domain/IVehicleAdd";
import { ITrailerAdd } from "@/domain/ITrailerAdd";
import { IMainRadios } from "@/types/IMainRadios";
import router from "@/router";
import { baseUrl } from "@/helpers/C";
@Options({
    components: {
        OfferCreateEdit,
    },
})
export default class TransportOfferAdd extends Vue {
    // booleans for displaying correct content
    radios: IMainRadios = EmptyObjects.initRadios();

    transportOfferAdd: ITransportOfferAdd = EmptyObjects.initTransportOfferAdd();

    startLocationAdd: ILocationAdd = EmptyObjects.initLocation();

    destinationLocationAdd: ILocationAdd = EmptyObjects.initLocation();

    vehicleAdd: IVehicleAdd = EmptyObjects.initVehicle();

    trailerAdd: ITrailerAdd = EmptyObjects.initTrailerAdd();

    dimensionsAdd: IDimensionsAdd = EmptyObjects.initDimensionsAdd();

    transportMetaAdd: ITransportMetaAdd = EmptyObjects.initTransportMetaAdd();

    vehicleId: string | null = null;
    trailerId: string | null = null;

    private vehicleService: BaseService<IVehicle> = new BaseService(
        baseUrl + "/Vehicles",
        store.state.token
    );

    private trailerService: BaseService<ITrailer> = new BaseService(
        baseUrl + "/Trailers",
        store.state.token
    );

    private dimensionsService: BaseService<IDimensions> = new BaseService(
        baseUrl + "/Dimensions",
        store.state.token
    );

    private locationsService: BaseService<ILocation> = new BaseService(
        baseUrl + "/Locations"
    );

    private transportMetaService: BaseService<ITransportMeta> = new BaseService(
        baseUrl + "/TransportMeta"
    );

    private transportOfferService: BaseService<ITransportOffer> = new BaseService(
        baseUrl + "/TransportOffers",
        store.state.token
    );

    async saveTransportOffer(event: Event): Promise<void> {
        event.preventDefault();
        console.log("posting transport offer");
        console.log(this.transportOfferAdd);

        console.log("start location");
        console.log(this.startLocationAdd);

        console.log("dest location");
        console.log(this.destinationLocationAdd);

        console.log("vehicleadd");
        console.log(this.vehicleAdd);

        console.log("trailer");
        console.log(this.trailerAdd);

        console.log("dimensions");
        console.log(this.dimensionsAdd);

        if (this.radios.withTrailer) {
            if (!this.radios.usePrevTrailer) {
                const dimensionsResponse = await this.dimensionsService.post(
                    this.dimensionsAdd
                );
                if (
                    dimensionsResponse.statusCode >= 200 &&
                    dimensionsResponse.statusCode < 300 &&
                    dimensionsResponse.data
                ) {
                    this.trailerAdd.dimensionsId = dimensionsResponse.data.id;
                }
                const trailerResponse = await this.trailerService.post(
                    this.trailerAdd
                );
                if (
                    trailerResponse.statusCode >= 200 &&
                    trailerResponse.statusCode < 300 &&
                    trailerResponse.data
                ) {
                    this.transportOfferAdd.trailerId = trailerResponse.data.id;
                }
            } else {
                this.transportOfferAdd.trailerId = this.trailerId;
            }
        }

        console.log("adding start");
        this.transportMetaAdd.startLocationId = await this.save(
            this.startLocationAdd,
            this.locationsService
        );

        console.log("adding dest");
        this.transportMetaAdd.destinationLocationId = await this.save(
            this.destinationLocationAdd,
            this.locationsService
        );

        console.log("adding transportMeta");
        this.transportOfferAdd.transportMetaId = await this.save(
            this.transportMetaAdd,
            this.transportMetaService
        );

        console.log("adding vehicle");
        if (!this.radios.fromSavedVehicles) {
            this.transportOfferAdd.vehicleId = await this.save(
                this.vehicleAdd,
                this.vehicleService
            );
        } else if (this.radios.fromSavedVehicles) {
            this.transportOfferAdd.vehicleId = this.vehicleId;
        }

        console.log("Adding transportoffer");
        await this.save(this.transportOfferAdd, this.transportOfferService);
        this.hasHistory() ? router.go(-1) : router.push("/");
    }

    async save(entity: any, service: BaseService<any>): Promise<string | null> {
        console.log(entity);
        const response = await service.post(entity);
        if (
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            response.data
        ) {
            return response.data.id;
        } else {
            return null;
        }
    }

    async mounted(): Promise<void> {
        if (store.state.token === null) {
            this.$router.push("/");
        }
        console.log("token: " + store.state.token);
    }

    getEType(transportType: number): string {
        return ETransportType[transportType];
    }

    hasHistory(): boolean {
        return window.history.length > 2;
    }
}
</script>
