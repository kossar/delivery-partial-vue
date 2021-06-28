<template>
    <div class="form-group">
        <label class="control-label" for="Vehicle_Make">Make</label>
        <input
            class="form-control"
            type="text"
            data-val-required="The Make field is required."
            id="Vehicle_Make"
            minlength="1"
            maxlength="32"
            name="Vehicle.Make"
            v-model="vehicle.make"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_Model">Model</label>
        <input
            class="form-control"
            type="text"
            data-val="true"
            id="Vehicle_Model"
            maxlength="32"
            name="Vehicle.Model"
            v-model="vehicle.model"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_ReleaseDate"
            >ReleaseDate</label
        >
        <input
            class="form-control"
            type="date"
            data-val="true"
            id="Vehicle_ReleaseDate"
            name="Vehicle.ReleaseDate"
            v-model="vehicle.releaseDate"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_RegNr">RegNr</label>
        <input
            class="form-control"
            type="text"
            data-val="true"
            data-val-required="The RegNr field is required."
            id="Vehicle_RegNr"
            maxlength="32"
            name="Vehicle.RegNr"
            v-model="vehicle.regNr"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_SeatCount">SeatCount</label>
        <input
            class="form-control"
            type="number"
            data-val="true"
            data-val-required="The SeatCount field is required."
            id="Vehicle_SeatCount"
            name="Vehicle.SeatCount"
            v-model="vehicle.seatCount"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_LoadCapacity"
            >LoadCapacity</label
        >
        <input
            class="form-control"
            type="number"
            id="Vehicle_LoadCapacity"
            name="Vehicle.LoadCapacity"
            v-model="vehicle.loadCapacity"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Vehicle_VehicleTypeId"
            >VehicleTypeId</label
        >
        <select
            v-model="vehicle.vehicleTypeId"
            class="form-control"
            data-val="true"
            data-val-required="The VehicleTypeId field is required."
            id="Vehicle_VehicleTypeId"
            name="Vehicle.VehicleTypeId"
        >
            <option v-bind:value="null">-- Please Select --</option>
            <option v-for="item in vTypes" v-bind:key="item.id" v-bind:value="item.id">
                {{ item.name }}
            </option>
        </select>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { IVehicleAdd } from "@/domain/IVehicleAdd";
import { IVehicleType } from "@/domain/IVehicleType";
@Options({
    components: {},
    props: {
        vehicle: Object,
        vTypes: Array,

    },
})
export default class VehicleAdd extends Vue {
    vehicle!: IVehicleAdd;
    vTypes!: IVehicleType[];
}
</script>
