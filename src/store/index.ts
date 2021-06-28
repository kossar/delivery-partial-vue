import { createStore } from 'vuex'
import router from '@/router';
import { IState } from '@/domain/IState';
import { ILoginInfo } from '@/domain/ILoginInfo';
import { IJwt } from '@/types/IJwt';
import { AccountService } from '@/services/AccountService';
import { IRegisterInfo } from '@/domain/IRegisterInfo';
import { baseUrl } from '@/helpers/C';

export const initialState: IState = {
    token: null,
    firstname: '',
    lastname: ''
}

export default createStore({
    state: initialState,
    mutations: {
        logOut: (state: IState) => {
            state.token = null;
            state.firstname = '';
            state.lastname = '';
        },
        logIn: (state: IState, jwtResponse: IJwt) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstname;
            state.lastname = jwtResponse.lastname;
        }
    },
    getters: {

    },
    actions: {
        async logIn(context, login: ILoginInfo): Promise<void> {
            const service: AccountService = new AccountService();
            const response = await service.registerLogin(login, baseUrl + '/Account/Login');

            if (response.statusCode === 200) {
                context.commit('logIn', response.data);
                router.push('/');
            }
        },

        async register(context, register: IRegisterInfo): Promise<void> {
            const service: AccountService = new AccountService();
            const response = await service.registerLogin(register, baseUrl + '/Account/Register');

            console.log(response);
            if (response.statusCode === 200) {
                context.commit('logIn', response.data);
                router.push('/');
            }
        }
    },
    modules: {
    }
})
