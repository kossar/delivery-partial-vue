<template>
    <div class="form-group">
        <label class="control-label" for="Trailer_RegNr">Reg number</label>
        <input
            class="form-control"
            type="text"
            id="Trailer_RegNr"
            maxlength="32"
            name="Trailer.RegNr"
            v-model="trailer.regNr"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Trailer_LoadCapacity"
            >Load capacity</label
        >
        <input
            class="form-control"
            type="number"
            id="Trailer_LoadCapacity"
            name="Trailer.LoadCapacity"
            v-model="trailer.loadCapacity"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Trailer_UnitId">Load capacity unit</label>
        <select
            class="form-control"
            data-val="true"
            data-val-required="The Unit field is required."
            id="Trailer_UnitId"
            name="Trailer.UnitId"
            v-model="trailer.unitId"
        >
            <option v-bind:value="null">-- Please select --</option>
            <option v-for="item in units" v-bind:key="item.id" v-bind:value="item.id">
                {{ item.unitCode }}
            </option>
        </select>
    </div>
    <DimensionsAdd v-model:dimensions="dimensions" v-bind:units="units"/>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DimensionsAdd from "@/components/DimensionsAdd.vue";
@Options({
    components: {
        DimensionsAdd,
    },
    props: {
        trailer: Object,
        dimensions: Object,
        units: Array
    }
})
export default class TrailerAdd extends Vue {}
</script>
