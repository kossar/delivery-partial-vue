<template>
    <TransportOfferList v-bind:transportOffers="transportOffers"  />
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TransportOfferList from "@/components/TransportOffersList.vue";
import { BaseService } from "@/services/BaseService";
import { ITransportOffer } from "@/domain/ITransportOffer";
import store from "@/store";
import { baseUrl } from "@/helpers/C";

@Options({
    components: {
        TransportOfferList
    },
    props: {},
})
export default class UserItems extends Vue {
    private service: BaseService<ITransportOffer> = new BaseService(
        baseUrl + "/TransportOffers/User",
        store.state.token
    );

    private transportOffers: ITransportOffer[] | null = null;
    async mounted(): Promise<void> {
        console.log("mounted");
        const response = await this.service.getAll();
        if (
            response.statusCode >= 200 &&
            response.statusCode < 300 &&
            response.data
        ) {
            console.log(response);
            this.transportOffers = response.data;
        }
    }
}
</script>
