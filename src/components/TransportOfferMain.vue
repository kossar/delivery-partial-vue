<template>
    <div class="form-group">
        <label class="control-label" for="TransportOffer_Info"
            >Additional info</label
        >
        <textarea
            class="form-control"
            type="text"
            id="TransportOffer_Info"
            maxlength="1024"
            name="TransportOffer.Info"
            v-model="transportOffer.transportOfferInfo"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="TransportOffer_TransportType"
            >Transport type</label
        >
        <select
            class="form-control"
            id="TransportOffer_TransportType"
            name="TransportOffer.TransportType"
            v-model="transportOffer.transportType"
        >
            <option v-bind:value="null">--- Please select ---</option>
            <option v-for="index in 3" v-bind:key="index" v-bind:value="index">
                {{ getEType(index) }}
            </option>
        </select>
    </div>
    <div class="form-group">
        <label class="control-label" for="TransportOffer_Price">Price</label>
        <input
            class="form-control"
            type="text"
            id="TransportOffer_Price"
            name="TransportOffer.Price"
            v-model="transportOffer.price"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="TransportOffer_AvailableLoadCapacity"
            >Available load capacity</label
        >
        <input
            class="form-control"
            type="number"
            id="TransportOffer_AvailableLoadCapacity"
            name="TransportOffer.AvailableLoadCapacity"
            v-model="transportOffer.availableLoadCapacity"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Offer_UnitId">Load capacity unit</label>
        <select
            class="form-control"
            data-val="true"
            data-val-required="The Unit field is required."
            id="Offer_UnitId"
            name="Offer.UnitId"
            v-model="transportOffer.unitId">
            <option v-bind:value="null">-- Please select --</option>
            <option v-for="item in units" v-bind:key="item.id" v-bind:value="item.id">
                {{ item.unitCode }}
            </option>
        </select>
    </div>
    <div class="form-group">
        <label class="control-label" for="TransportOffer_FreeSeats"
            >Free seats</label
        >
        <input
            class="form-control"
            type="number"
            id="TransportOffer_FreeSeats"
            name="TransportOffer.FreeSeats"
            v-model="transportOffer.freeSeats"
        />
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { ITransportOfferAdd } from "@/domain/ITransportOfferAdd";
import { ETransportType } from "@/domain/enums/ETransportType";
@Options({
    components: {},
    props: {
        transportOffer: Object,
        units: Array
    },
})
export default class TransportOfferMain extends Vue {
    transportOffer!: ITransportOfferAdd | ITransportOffer;

    getEType(transportType: number): string {
        return ETransportType[transportType];
    }
}
</script>
