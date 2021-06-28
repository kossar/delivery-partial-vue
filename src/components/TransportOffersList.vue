<template>
    <h4>Transport offers</h4>

    <table class="table">
        <thead>
            <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Max load</th>
                <th>Free seats</th>
                <th>Location</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in transportOffers" :key="index">
                <td>{{ getEType(item.transportType) }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.availableLoadCapacity }}</td>
                <td>{{ item.freeSeats }}</td>
                <td>
                    From {{ item.transportMeta.startLocation.city }} To:
                    {{ item.transportMeta.destinationLocation.city }}
                </td>
                <td>
                    <router-link
                        v-if="
                            currentUserId !== null &&
                            item.appUserId === currentUserId
                        "
                        :to="{ path: '/transportoffers/edit/' + item.id }"
                        >Edit</router-link
                    >
                    <span
                        class="p-1"
                        v-if="
                            currentUserId !== null &&
                            item.appUserId === currentUserId
                        "
                        >|</span
                    >
                    <router-link
                        :to="{ path: '/transportoffers/details/' + item.id }"
                        >Details</router-link
                    >
                    <span
                        class="p-1"
                        v-if="
                            currentUserId !== null &&
                            item.appUserId === currentUserId
                        "
                        >|</span
                    >
                    <router-link
                        v-if="
                            currentUserId !== null &&
                            item.appUserId === currentUserId
                        "
                        :to="{ path: '/transportoffers/delete/' + item.id }"
                        >Delete</router-link
                    >
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ITransportOffer } from "@/domain/ITransportOffer";
import { ETransportType } from "@/domain/enums/ETransportType";
import store from "@/store";
import jwtDecode from "jwt-decode";

@Options({
    components: {},
    props: {
        transportOffers: Array,
    },
})
export default class TransportOfferList extends Vue {
    transportOffers: ITransportOffer[] | null = null;

    currentUserId: string | null = null;

    getEType(transportType: number): string {
        return ETransportType[transportType];
    }

    mounted() {
        if (store.state.token !== null) {
            console.log("decoded token");
            const tokenMap = new Map<string, string>(
                Object.entries(jwtDecode(store.state.token))
            );
            const userId: string | undefined = tokenMap.get(
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            );
            if (userId !== undefined) {
                this.currentUserId = userId;
            }
            console.log(userId);
        }
    }
}
</script>
