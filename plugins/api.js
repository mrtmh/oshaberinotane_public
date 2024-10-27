export default function (obj, inject) {
    const api = new API(obj.$axios, obj.store, obj.redirect)
    inject("api", api)
}

class API {
    constructor(axios, store, redirect) {
        this.axios = axios
        this.store = store
        this.redirect = redirect
    }

    async getRequest(url, params) {
        const res = await this.axios.$get(url, {
            headers: {
                "content-type": "application/json",
            },
            params: params,
        })
        return res
    }

    async postRequest(url, params) {
        const res = await this.axios.$post(url, params, {
            headers: {
                "content-type": "application/json",
            },
        })
        return res
    }
}