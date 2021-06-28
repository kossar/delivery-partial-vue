<template>
    <dl class="row">
        <dt class="col-sm-2">Additional info</dt>
        <dd class="col-sm-10">{{ transportOffer.info }}</dd>
        <dt class="col-sm-2">Transport type</dt>
        <dd class="col-sm-10">{{ transportOffer.transportType }}</dd>
        <dt class="col-sm-2">Price</dt>
        <dd class="col-sm-10">{{ transportOffer.price }}</dd>
        <dt class="col-sm-2">Available load capacity</dt>
        <dd class="col-sm-10">{{ transportOffer.availableLoadCapacity }}</dd>
        <dt class="col-sm-2">Free seats</dt>
        <dd class="col-sm-10">{{ transportOffer.freeSeats }}</dd>
        <dt class="col-sm-2">From</dt>
        <dd class="col-sm-10">
            {{ transportOffer.transportMeta.startLocation.city }}
        </dd>
        <dt class="col-sm-2">To</dt>
        <dd class="col-sm-10">
            {{ transportOffer.transportMeta.destinationLocation.city }}
        </dd>
        <dt class="col-sm-2">Vehicle</dt>
        <dd class="col-sm-10">{{ transportOffer.vehicle.make }}</dd>
        <dt class="col-sm-2"></dt>
        <dd class="col-sm-10">
            {{ new Date(transportOffer.vehicle.releaseDate).getFullYear() }}
        </dd>
        <div v-if="transportOffer.trailer != null" class="col-sm-12">
            <div class="row">
                <dt class="col-sm-2">Trailer</dt>
                <dd class="col-sm-10"></dd>
                <dt class="col-sm-2">Load capacity</dt>
                <dd class="col-sm-10">
                    {{ transportOffer.trailer.loadCapacity }}
                </dd>
            </div>
        </div>
        <div v-if="transportOffer.organisation != null" class="col-sm-12">
            <div class="row">
                <dt class="col-sm-2">Organisation</dt>
                <dd class="col-sm-10">
                    {{ transportOffer.organisation.name }}
                </dd>
            </div>
        </div>
    </dl>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { IDimensions } from "@/domain/IDimensions";
import { IUnit } from "@/domain/IUnit";
import { BaseService } from "@/services/BaseService";
import store from "@/store";
@Options({
    components: {},
    props: {
        transportOffer: Object,
    },
})
export default class OfferDetails extends Vue {
    transportOffer!: ITransportOffer;
}
</script>
