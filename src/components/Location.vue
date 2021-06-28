<template>
    <div class="col">
        <div class="form-group">
            <label class="control-label" for="Location_Country">Country</label>
            <input
                class="form-control"
                type="text"
                id="Location_Country"
                maxlength="64"
                name="Location.Country"
                v-model="location.country"
            />
        </div>
        <div class="form-group">
            <label class="control-label" for="Location_City">City</label>
            <input
                class="form-control"
                type="text"
                id="Location_City"
                maxlength="64"
                name="Location.City"
                v-model="location.city"
            />
        </div>
        <div class="form-group">
            <label class="control-label" for="Location_Address">Address</label>
            <input
                class="form-control"
                type="text"
                data-val="true"
                id="Location_Address"
                maxlength="128"
                name="Location.Address"
                v-model="location.address"
            />
        </div>
        <div class="form-group">
            <label class="control-label" for="Location_Info"
                >Additional info</label
            >
            <textarea
                class="form-control"
                type="text"
                id="Location_Info"
                maxlength="4096"
                name="Location.Info"
                v-model="location.info"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ILocationAdd } from "@/domain/ILocationAdd";
@Options({
    components: {},
    props: {
        location: Object,
    },
})
export default class Location extends Vue {
    location!: ILocationAdd;
}
</script>
