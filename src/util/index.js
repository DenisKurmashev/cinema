import * as config from "../config/config.json";

export function getConfig() {
    return config || {};
}

export function getApiObject() {
    const config = getConfig();

    return {
        host: config.host,
        api: config.api,
        _profile: config.profile,
        _login: config.login,
        _register: config.register,
        _products: config.products,

        get login() {
            return this.host + this.api + this._profile + this._login;
        },
        get register() {
            return this.host + this.api + this._profile + this._register;
        },
        get products() {
            return this.host + this.api + this._products;
        }
    };
}