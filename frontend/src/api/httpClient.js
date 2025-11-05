// @ts-nocheck
// src/api/httpClient.js
import axios from "axios";
import { API_ROUTES, getRouterUrl } from "./apiEndpoints.js";

class HttpClient {
    constructor() {
        // Como o frontend e backend estão no mesmo domínio, usamos caminhos relativos
        this.baseURL = import.meta.env.VITE_BASE_URL_LOCALHOST;
    }

    async get(route, path = '/') {
        try {
            const url = getRouterUrl(route, { path })
            const response = await axios.get(`${this.baseURL}${url}`)
            const data = await response.data;

            if (!data.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('HTTP Client error:', error);
            throw error;
        }
    }

    async getApp(){
        try {
            const url = getRouterUrl(API_ROUTES.APP)
            const response = await axios.get(`${this.baseURL}${url}`)
            const data = await response.data;

            return data;
        } catch (error) {
            throw error;
        }
    }

    async post(route, data, config){
        try{
            const url = getRouterUrl(route)
            const response = await axios.post(`${this.baseURL}${url}`, data, config)
            const responseData = response.data

            if (responseData.ok === false) {
                throw new Error(responseData.error || 'Erro na resposta da API');
            }

            return responseData;
        }catch (error) {
            console.error('HTTP Client POST error:', error);
            throw error;
        }
    }

    async postFormData(route, formData){
        const url = getRouterUrl(route);
        const response = await axios.post(`${this.baseURL}${url}`, formData);
        return response.data;
    }
}

export const httpClient = new HttpClient();
