<template>
    <h4>Edit</h4>
    <OfferCreateEdit
        v-if="loaded"
        v-model:transportOffer="transportOffer"
        v-model:transportMeta="transportOffer.transportMeta"
        v-model:startLocation="transportOffer.transportMeta.startLocation"
        v-model:destinationLocation="
            transportOffer.transportMeta.destinationLocation
        "
        v-model:vehicle="transportOffer.vehicle"
        v-model:trailer="trailer"
        v-model:dimensions="dimensions"
        v-model:vehicleId="vehicleId"
        v-model:trailerId="trailerId"
        v-model:radios="radios"
    />
    <div class="form-group">
        <input
            type="submit"
            value="Save"
            class="btn btn-primary"
            @click="save()"
        />
    </div>

    <div>
        <a
            href="#"
            @click="this.hasHistory() ? $router.go(-1) : $router.push('/')"
            >Back to list</a
        >
    </div>

    <div v-if="!loaded">Loading...</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { IMainRadios } from "@/types/IMainRadios";
import store from "@/store";
import { BaseService } from "@/services/BaseService";
import OfferCreateEdit from "@/components/OfferCreateEdit.vue";
import jwtDecode from "jwt-decode";
import router from "@/router";
import { EmptyObjects } from "@/helpers/EmptyObjects";
import { ITrailer } from "@/domain/ITrailer";
import { IVehicle } from "@/domain/IVehicle";
import { IDimensions } from "@/domain/IDimensions";
import { IDimensionsAdd } from "@/domain/IDimensionsAdd";
import { ITrailerAdd } from "@/domain/ITrailerAdd";
import { baseUrl } from "@/helpers/C";
@Options({
    components: {
        OfferCreateEdit,
    },
    props: {
        id: String,
    },
})
export default class TransportOfferEdit extends Vue {
    private transportOfferService: BaseService<ITransportOffer> = new BaseService(
        baseUrl + "/TransportOffers",
        store.state.token
    );

    private trailerService: BaseService<ITrailer> = new BaseService(
        baseUrl + "/Trailers",
        store.state.token
    );

    private vehicleService: BaseService<IVehicle> = new BaseService(
        baseUrl + "/Vehicles",
        store.state.token
    );

    private dimensionsService: BaseService<IDimensions> = new BaseService(
        baseUrl + "/Dimensions",
        store.state.token
    );

    radios: IMainRadios = EmptyObjects.initRadios();

    organisationName: string = "";

    loaded: boolean = false;
    id!: string;

    transportOffer: ITransportOffer | null = null;

    transportOfferInDb: ITransportOffer | null = null;

    trailer: ITrailer | ITrailerAdd | null = null;

    dimensions: IDimensions | IDimensionsAdd | null = null;

    vehicleId: string | null = null;
    trailerId: string | null = null;
    organisationId: string | null = null;

    async save(): Promise<void> {
        console.log("save");
        console.log(this.radios);
        console.log("veh new id: ", this.vehicleId);
        console.log("tra new id: ", this.trailerId);

        // Trailer
        if (!this.radios.withTrailer) {
            this.transportOffer!.trailer = null;
        } else {
            if (this.radios.usePrevTrailer && this.trailerId != null) {
                this.transportOffer!.trailer = await this.getById(
                    this.trailerId,
                    this.trailerService
                );
            } else {
                if (this.transportOfferInDb!.trailer !== null) {
                    this.transportOffer!.trailer = this.trailer as ITrailer;
                    this.transportOffer!.trailer.dimensions = this
                        .dimensions as IDimensions;
                } else {
                    const addTrailer = this.trailer as ITrailerAdd;
                    let addedDim = null;
                    const dimResponse = await this.dimensionsService.post(
                        this.dimensions
                    );
                    if (
                        dimResponse.statusCode >= 200 &&
                        dimResponse.statusCode < 300 &&
                        dimResponse.data
                    ) {
                        console.log("dimresponse");
                        console.log(dimResponse.data);
                        addTrailer.dimensionsId = dimResponse.data.id;
                        addedDim = dimResponse.data;
                    }
                    const trailerAddResponse = await this.trailerService.post(
                        addTrailer
                    );
                    if (
                        trailerAddResponse.statusCode >= 200 &&
                        trailerAddResponse.statusCode < 300 &&
                        trailerAddResponse.data
                    ) {
                        console.log("trailerresponse data");
                        console.log(trailerAddResponse);
                        this.transportOffer!.trailer = trailerAddResponse.data;
                        this.transportOffer!.trailer.dimensions = addedDim!;
                    }
                }
            }
        }

        // Vehicle
        if (this.radios.fromSavedVehicles && this.vehicleId != null) {
            this.transportOffer!.vehicle = await this.getById(
                this.vehicleId,
                this.vehicleService
            );
        }

        console.log(this.transportOffer);
        // Save edited transportOffer
        const offerResponse = await this.transportOfferService.put(
            this.transportOffer!.id,
            this.transportOffer
        );
        if (offerResponse.statusCode >= 200 && offerResponse.statusCode < 300) {
            this.hasHistory() ? router.go(-1) : router.push("/");
        }
    }

    async getById(id: string, service: BaseService<any>): Promise<any | null> {
        console.log(id);
        const response = await service.get(id);
        if (
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            response.data
        ) {
            return response.data;
        } else {
            return null;
        }
    }

    async mounted(): Promise<void> {
        console.log(this.id);
        const response = await this.transportOfferService.get(this.id);
        if (
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            response.data
        ) {
            console.log("transportoffer get by id");
            console.log(response.data);
            this.transportOffer = response.data;
            // Save copy of transportoffer for later checks
            this.transportOfferInDb = response.data;

            this.transportOffer.vehicle.releaseDate = this.formatDate(
                this.transportOffer.vehicle.releaseDate
            );
            this.vehicleId = this.transportOffer.vehicle.id;

            this.loaded = true;
            if (
                !this.isCorrectUser(
                    store.state.token,
                    this.transportOffer.appUserId
                )
            ) {
                this.hasHistory() ? router.go(-1) : router.push("/");
            }

            if (this.transportOffer.trailer === null) {
                this.radios.withTrailer = false;
                // Init trailer and dimensions
                this.trailer = EmptyObjects.initTrailerAdd();
                this.dimensions = EmptyObjects.initDimensionsAdd();
            } else {
                this.radios.withTrailer = true;
                this.trailerId = this.transportOffer.trailer.id;
                this.trailer = this.transportOffer.trailer;
                this.dimensions = this.transportOffer.trailer.dimensions;
            }
        }
    }

    formatDate(date: string): string {
        return date.split("T")[0];
    }

    hasHistory(): boolean {
        return window.history.length > 2;
    }

    isCorrectUser(token: string | null, entityUserId: string): boolean {
        if (token !== null) {
            console.log("decoded token");
            const tokenMap = new Map<string, string>(
                Object.entries(jwtDecode(token))
            );
            const userId: string | undefined = tokenMap.get(
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            );
            if (userId !== undefined && entityUserId === userId) {
                return true;
            }
            console.log(userId);
        }
        return false;
    }
}
</script>
