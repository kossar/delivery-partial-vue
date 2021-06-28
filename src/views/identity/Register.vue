<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <form method="post">
                <h4>Create a new account.</h4>
                <hr />
                <div class="form-group">
                    <label for="Input_Email">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        data-val="true"
                        id="Input_Email"
                        name="Input.Email"
                        v-model="register.email"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_Firstname">Firstname</label>
                    <input
                        class="form-control"
                        type="text"
                        data-val="true"
                        id="Input_Firstname"
                        minlength="1"
                        maxlength="128"
                        name="Input.Firstname"
                        v-model="register.firstname"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_Lastname">Lastname</label>
                    <input
                        class="form-control"
                        type="text"
                        data-val="true"
                        id="Input_Lastname"
                        minlength="1"
                        maxlength="128"
                        name="Input.Lastname"
                        v-model="register.lastname"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_PhoneNumber">Phone Number</label>
                    <input
                        class="form-control"
                        type="tel"
                        id="Input_PhoneNumber"
                        name="Input.PhoneNumber"
                        v-model="register.phoneNumber"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_Password">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        data-val="true"
                        minlength="6"
                        id="Input_Password"
                        maxlength="100"
                        name="Input.Password"
                        v-model="register.password"
                    />
                </div>
                <div class="form-group">
                    <label for="Input_ConfirmPassword">Confirm password</label>
                    <input
                        class="form-control"
                        type="password"
                        id="Input_ConfirmPassword"
                        name="Input.ConfirmPassword"
                        v-model="confirmPassword"
                    />
                    <span
                        v-if="passwordConfirmError"
                        class="text-danger field-validation-valid"
                        >The password and confirmation password do not
                        match.</span
                    >
                </div>
                <button
                    @click="registerClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Register
                </button>
            </form>
        </div>
        <div class="col-sm-1 col-md-3"></div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import { IRegisterInfo } from "@/domain/IRegisterInfo";

export const emptyRegister: IRegisterInfo = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
};
@Options({
    components: {},
    props: {},
})
export default class Register extends Vue {
    register: IRegisterInfo = emptyRegister;

    confirmPassword: string = "";

    passwordConfirmError: boolean = false;

    registerClicked(event: Event): void {
        event.preventDefault();
        console.log(this.register);
        if (this.register.password !== this.confirmPassword) {
            console.log("psswords not equal");
            this.passwordConfirmError = true;
            return;
        }

        store.dispatch("register", this.register);
    }
}
</script>
