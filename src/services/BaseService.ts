import { IFetchResponse } from "@/types/IFetchResponse";
import { IQueryParams } from "@/types/IQueryParams";
import axios from "axios";

export class BaseService<TEntity> {
    constructor(protected apiEndpointUrl: string, private jwt: string | null = null) {

    }

    private autHeaders = this.jwt !== null ? {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.jwt,
    } : { 'Content-type': 'application/json' };

    async put(id: string, entity: any): Promise<IFetchResponse<TEntity>> {
        let url: string = this.apiEndpointUrl;
        url = url + "/" + id;
        try {
            const response = await axios.put(url, JSON.stringify(entity),
                {
                    headers: this.autHeaders
                });
            console.log("response in put:");

            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                console.log("put response ok");
                return {
                    statusCode: response.status
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + response.data.messages.join(' '),
            };
        } catch (reason) {
            console.log('some error in put');
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }

    async delete(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + "/" + id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.delete(
                url,
                {
                    headers: this.autHeaders
                });
            if (response.status >= 200 && response.status < 300) {
                return {

                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (error) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(error),
            };
        }
    }

    async post(entity: any): Promise<IFetchResponse<TEntity>> {
        const url: string = this.apiEndpointUrl;
        try {
            console.log(this.autHeaders);
            console.log(JSON.stringify(entity));
            const response = await axios.post(url, JSON.stringify(entity),
                {
                    headers: this.autHeaders
                });
            if (response.status >= 200 && response.status < 300) {
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

    async getAll(): Promise<IFetchResponse<TEntity[]>> {
        const url = this.apiEndpointUrl;

        // if(queryParams !== undefined){
        //     //TODO: add query params to url
        // }
        console.log("try start");
        console.log(this.jwt)
        console.log(this.autHeaders.Authorization);
        try {
            const response = await axios.get(
                url,
                {
                    headers: this.autHeaders
                });
            if (response.status >= 200 || response.status < 300) {
                console.log('responseok');
                return {
                    statusCode: response.status,
                    data: response.data,
                };
            }
            console.log('notok');
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (error) {
            console.log('error');
            return {

                statusCode: 0,
                errorMessage: JSON.stringify(error),
            };
        }
    }

    async get(id: string, queryParams?: IQueryParams): Promise<IFetchResponse<TEntity>> {
        let url = this.apiEndpointUrl;
        url = url + "/" + id;

        if (queryParams !== undefined) {
            // TODO: add query params to url
        }

        try {
            const response = await axios.get(url, { headers: this.autHeaders });
            if (response.status >= 200 && response.status < 300) {
                return {

                    statusCode: response.status,
                    data: response.data,
                };
            }
            return {
                statusCode: response.status,
                errorMessage: response.statusText,
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }
    }
}
