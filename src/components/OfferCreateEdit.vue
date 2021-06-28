<template>
    <h4>Transport offer</h4>
    <hr />
    <form action="/TransportOffers/Create" method="post">
        <div class="row">
            <div class="col-md-6">
                <TransportOfferMain v-model:transportOffer="transportOffer"  v-bind:units="units"/>
                <div class="form-group">
                    <label class="control-label" for="TransportMeta_StartTime"
                        >Start time</label
                    >
                    <input
                        class="form-control"
                        type="datetime-local"
                        id="TransportMeta_StartTime"
                        name="TransportMeta.StartTime"
                        v-model="transportMeta.startTime"
                    />
                </div>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-6">
                <h4>Start Location</h4>
                <Location v-model:location="startLocation" />
            </div>
            <div class="col-md-6">
                <h4>Destination Location</h4>
                <Location v-model:location="destinationLocation" />
            </div>
        </div>
        <hr />
        <h4 class="text-center">Vehicle</h4>
        <div class="row d-flex justify-content-around m-3">
            <p>Use saved vehicle or create new</p>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="fromSavedVehicles"
                        name="fromSavedVehicles"
                        v-model="radios.fromSavedVehicles"
                        v-bind:value="true"
                    />
                    Saved
                </label>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="fromSavedVehicles"
                        name="fromSavedVehicles"
                        v-model="radios.fromSavedVehicles"
                        v-bind:value="false"
                    />
                    New
                </label>
            </div>
        </div>
        <div class="row" v-if="!radios.fromSavedVehicles">
            <div class="col-md-6">
                <VehicleAdd
                    v-model:vehicle="vehicle"
                    v-bind:vTypes="vehicleTypes"
                />
            </div>
        </div>
        <div class="row" v-if="radios.fromSavedVehicles">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="control-label" for="TransportOffer_VehicleId"
                        >Vehicle</label
                    >
                    <select
                        class="form-control"
                        id="TransportOffer_VehicleId"
                        name="TransportOffer.VehicleId"
                        @input="$emit('update:vehicleId', $event.target.value)"
                    >
                        <option v-bind:value="null">-- Please select --</option>
                        <option
                            v-for="item in vehicles"
                            v-bind:key="item.id"
                            :value="item.id"
                        >
                            {{ item.make }} {{ item.regNr }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <hr />
        <h4 class="text-center m-4">Trailer</h4>
        <div class="row d-flex justify-content-around m-3">
            <p>Trailer?</p>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="withTrailer"
                        name="withTrailer"
                        v-model="radios.withTrailer"
                        v-bind:value="true"
                    />
                    Yes
                </label>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="withTrailer"
                        name="withTrailer"
                        v-model="radios.withTrailer"
                        v-bind:value="false"
                    />
                    No
                </label>
            </div>
        </div>
        <div class="row d-flex justify-content-around m-3" v-if="radios.withTrailer">
            <p>Use previous or add new Trailer</p>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="usePrevTrailer"
                        name="usePrevTrailer"
                        v-model="radios.usePrevTrailer"
                        :value="true"
                        :checked="radios.usePrevTrailer"
                    />
                    Select from previous
                </label>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="radio"
                        id="usePrevTrailer"
                        name="usePrevTrailer"
                        v-model="radios.usePrevTrailer"
                        :value="false"
                        :checked="!radios.usePrevTrailer"
                    />
                    Add new
                </label>
            </div>
        </div>
        <div class="row" v-if="radios.withTrailer && !radios.usePrevTrailer">
            <div class="col-md-6">
                <TrailerAdd
                    v-model:trailer="trailer"
                    v-model:dimensions="dimensions"
                    v-bind:units="units"
                />
            </div>
        </div>
        <div class="row" v-if="radios.withTrailer && radios.usePrevTrailer">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="control-label" for="TransportOffer_TrailerId"
                        >Trailer</label
                    >
                    <select
                        class="form-control"
                        id="TransportOffer_TrailerId"
                        name="TransportOffer.TrailerId"
                        @input="$emit('update:trailerId', $event.target.value)"
                    >
                        <option v-bind:value="null">-- Please select --</option>
                        <option
                            v-for="item in trailers"
                            v-bind:key="item.id"
                            :value="item.id"
                        >
                            {{ item.regNr }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </form>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Location from "@/components/Location.vue";
import VehicleAdd from "@/components/VehicleAdd.vue";
import TrailerAdd from "@/components/TrailerAdd.vue";
import { ETransportType } from "@/domain/enums/ETransportType";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { ITransportOfferAdd } from "@/domain/ITransportOfferAdd";
import { ITrailer } from "@/domain/ITrailer";
import { IVehicle } from "@/domain/IVehicle";
import { IVehicleType } from "@/domain/IVehicleType";
import { IUnit } from "@/domain/IUnit";
import { IDimensionsAdd } from "@/domain/IDimensionsAdd";
import { IDimensions } from "@/domain/IDimensions";

import { ITransportMetaAdd } from "@/domain/ITransportMetaAdd";
import { ITransportMeta } from "@/domain/ITransportMeta";
import { baseUrl } from "@/helpers/C";
import store from "@/store";
import { ILocationAdd } from "@/domain/ILocationAdd";
import { ILocation } from "@/domain/ILocation";
import { IVehicleAdd } from "@/domain/IVehicleAdd";
import { ITrailerAdd } from "@/domain/ITrailerAdd";
import TransportOfferMain from "@/components/TransportOfferMain.vue";
import { BaseService } from "@/services/BaseService";
import { IMainRadios } from "@/types/IMainRadios";
@Options({
    components: {
        Location,
        VehicleAdd,
        TrailerAdd,
        TransportOfferMain,
    },
    props: {
        transportOffer: Object,
        startLocation: Object,
        destinationLocation: Object,
        vehicle: Object,
        trailer: Object,
        dimensions: Object,
        transportMeta: Object,
        radios: Object,
        vehicleId: String,
        trailerId: String,
        isEdit: Boolean
    },
})
export default class OfferCreateEdit extends Vue {
    isEdit!: boolean;

    radios!: IMainRadios;

    transportOffer!: ITransportOfferAdd | ITransportOffer;

    startLocation: ILocationAdd | ILocation | null = null;

    destinationLocation: ILocationAdd | ILocation | null = null;

    vehicle: IVehicleAdd | IVehicle | null = null;

    trailer: ITrailerAdd | ITrailer | null = null;

    dimensions: IDimensionsAdd | IDimensions | null = null;

    transportMeta: ITransportMetaAdd | ITransportMeta | null = null;

    private vTypeService: BaseService<IVehicleType> = new BaseService(
        baseUrl + "/VehicleTypes"
    );

    private unitService: BaseService<IUnit> = new BaseService(
        baseUrl + "/Units"
    );

    private vehicleService: BaseService<IVehicle> = new BaseService(
        baseUrl + "/Vehicles",
        store.state.token
    );

    private trailerService: BaseService<ITrailer> = new BaseService(
        baseUrl + "/Trailers",
        store.state.token
    );

    vehicleTypes: IVehicleType[] | null = [];

    units: IUnit[] | null = [];

    vehicles: IVehicle[] | null = [];

    trailers: ITrailer[] | null = [];

    async mounted(): Promise<void> {
        if (store.state.token === null) {
            this.$router.push("/");
        }

        // Get Vehicles
        const vehiclesResponse = await this.vehicleService.getAll();
        if (
            vehiclesResponse.statusCode >= 200 &&
            vehiclesResponse.statusCode < 300
        ) {
            this.vehicles = vehiclesResponse.data!;
        }
        console.log("vehicles");
        console.log(vehiclesResponse);

        // Get VehicleTypes
        const vTypeResponse = await this.vTypeService.getAll();
        if (vTypeResponse.statusCode >= 200 && vTypeResponse.statusCode < 300) {
            this.vehicleTypes = vTypeResponse.data!;
        }
        console.log(vTypeResponse);

        // Get Units
        const unitResponse = await this.unitService.getAll();
        if (unitResponse.statusCode >= 200 && unitResponse.statusCode < 300) {
            this.units = unitResponse.data!;
        }
        console.log('unitresp');
        console.log(this.units);

        // Get trailers
        const trailerResponse = await this.trailerService.getAll();
        if (
            trailerResponse.statusCode >= 200 &&
            trailerResponse.statusCode < 300
        ) {
            this.trailers = trailerResponse.data!;
        }
        console.log(trailerResponse);

        console.log("useprevtrailer", this.radios.usePrevTrailer);
        console.log("withTrailer", this.radios.withTrailer);
        console.log("fromSavedVehicles", this.radios.fromSavedVehicles);
    }

    getEType(transportType: number): string {
        return ETransportType[transportType];
    }
}
</script>
