<template>
    <div class="home">
        <h1>Home</h1>
        <div class="row d-flex justify-content-around m-5">
            <div>
                <input
                    type="button"
                    value="View all offers"
                    class="btn btn-primary p-4"
                    @click="$router.push('/transportoffers/')"
                />
            </div>
            <div>
                <input
                    :disabled="token === null"
                    type="button"
                    value="Add new offer"
                    class="btn btn-primary p-4"
                    @click="$router.push('/transportoffers/add')"
                >
            </div>
        </div>

        <TransportOfferList v-bind:transportOffers="transportOffers"  />

    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { BaseService } from "@/services/BaseService";
import { ITransportOffer } from "@/domain/ITransportOffer";
import store from "@/store";
import { ETransportType } from "@/domain/enums/ETransportType";
import TransportOfferList from "@/components/TransportOffersList.vue";
import { baseUrl } from "@/helpers/C";

@Options({
    components: {
        TransportOfferList
    },
})

export default class Home extends Vue {
    private service: BaseService<ITransportOffer> = new BaseService(
        baseUrl + "/TransportOffers",
        store.state.token
    );

    private transportOffers: ITransportOffer[] | null = null;

    get token(): string | null {
        return store.state.token;
    }

    get transportOfferss(): ITransportOffer[] | null {
        return this.transportOffers;
    }

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

            this.transportOffers.forEach(element => {
                console.log(ETransportType[element.transportType])
            });
        }
    }
}
</script>
