<template>
    <h4 class="text-danger">Delete</h4>
    <OfferDetails v-if="loaded" v-model:transportOffer="transportOffer" />
    <div v-if="!loaded">Loading...</div>
    <div>
        <input
            type="submit"
            value="Delete"
            class="btn btn-danger"
            @click="deleteOffer()"
        />
        |
        <a href="#" @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            >Back to list</a
        >
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { ETransportType } from "@/domain/enums/ETransportType";
import store from "@/store";
import { BaseService } from "@/services/BaseService";
import OfferDetails from "@/components/OfferDetails.vue";
import router from "@/router";
import { baseUrl } from "@/helpers/C";
@Options({
    components: {
        OfferDetails,
    },
    props: {
        id: String,
    },
})
export default class TransportOfferDelete extends Vue {
    private transportOfferService: BaseService<ITransportOffer> = new BaseService(
        baseUrl + "/TransportOffers",
        store.state.token
    );

    loaded: boolean = false;
    id!: string;

    transportOffer: ITransportOffer | null = null;

    async mounted() {
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
            this.loaded = true;
        }
    }

    async deleteOffer() {
        console.log("delete");
        const response = await this.transportOfferService.delete(
            this.transportOffer!.id
        );
        if (response.statusCode >= 200 && response.statusCode < 300) {
            this.hasHistory() ? router.go(-1) : router.push("/");
        }
    }

    hasHistory() {
        return window.history.length > 2;
    }
}
</script>
