<template>
    <div class="form-group">
        <label class="control-label" for="Dimensions_Width">Width</label>
        <input
            class="form-control"
            type="text"
            id="Dimensions_Width"
            name="Dimensions.Width"
            v-model="dimensions.width"
        />
        <span
            class="text-danger field-validation-valid"
            data-valmsg-for="Dimensions.Width"
            data-valmsg-replace="true"
        ></span>
    </div>
    <div class="form-group">
        <label class="control-label" for="Dimensions_Height">Height</label>
        <input
            class="form-control"
            type="text"
            id="Dimensions_Height"
            name="Dimensions.Height"
            v-model="dimensions.height"
        />
    </div>
    <div class="form-group">
        <label class="control-label" for="Dimensions_Length">Length</label>
        <input
            class="form-control"
            type="text"
            id="Dimensions_Length"
            name="Dimensions.Length"
            v-model="dimensions.length"
        />
        <span
            class="text-danger field-validation-valid"
        ></span>
    </div>
    <div class="form-group">
        <label class="control-label" for="Dimensions_UnitId">Size unit</label>
        <select
            class="form-control"
            id="Dimensions_UnitId"
            name="Dimensions.UnitId"
            v-model="dimensions.unitId"
        >
            <option v-bind:value="null">-- Please select --</option>
            <option v-for="item in units" v-bind:key="item.id" v-bind:value="item.id">
                {{ item.code }}
            </option>
        </select>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
    components: {},
    props: {
        dimensions: Object,
        units: Array
    }
})
export default class DimensionsAdd extends Vue {}
</script>
