import { ILoginInfo } from "@/domain/ILoginInfo";
import { IRegisterInfo } from "@/domain/IRegisterInfo";
import { IFetchResponse } from "@/types/IFetchResponse";
import { IJwt } from "@/types/IJwt";
import { IMessage } from "@/types/IMessage";
import axios from "axios";

export class AccountService {
    async registerLogin(account: ILoginInfo | IRegisterInfo, url: string): Promise<IFetchResponse<IJwt | IMessage>> {
        console.log("logging in?");
        const loginDataStr = JSON.stringify(account);
        try {
            const response = await axios.post(
                url,
                loginDataStr,
                {
                    headers: { 'Content-type': 'application/json' }
                });

            if (response.status === 200) {
                return {
                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + response.data.messages.join(' '),
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error),
            };
        }
    }
}
