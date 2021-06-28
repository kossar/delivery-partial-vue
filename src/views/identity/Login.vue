<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <form id="account" method="post">
                <h4>Use a local account to log in.</h4>
                <span
                    class="text-danger field-validation-valid ${{error}}"
                    ></span
                >
                <hr />
                <div class="form-group">
                    <label for="Input_Email">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        id="Input_Email"
                        v-model="email"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_Password">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        id="Input_Password"
                        v-model="password"
                    />
                </div>
                <div class="form-group">
                    <button
                        @click="loginClicked($event)"
                        type="submit"
                        class="btn btn-primary"
                    >
                        Log in
                    </button>
                </div>
            </form>
        </div>
        <div class="col-sm-1 col-md-3"></div>
        <!-- <template v-if="entity == null">
            <div>Loading...</div>
        </template>
        <template v-else>
            <div v-html="entity.value"></div>
        </template> -->
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";

@Options({
    components: {},
    props: {},
})
export default class Login extends Vue {
    email: string = "admin@otkoss.com";

    password: string = ".Tere123";

    error: string = "d-none";

    async loginClicked(event: Event): Promise<void> {
        event.preventDefault();
        console.log(this.email, this.password, event);

        store.dispatch("logIn", { email: this.email, password: this.password });
    }
}
</script>
