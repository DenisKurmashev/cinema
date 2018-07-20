import * as config from "../config/config.json";

export const getConfig = () => {
    return config || {};
};

export const getApiObject = () => {
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
};

export const readUserFromLocalStorage = () => {
    if (localStorage.getItem("user") === null || localStorage.getItem("token") === null)
        return null;

    let obj = {
        token: "",
        user: {},
    };
    try {
        obj.token = localStorage.getItem("token") ;
        obj.user = JSON.parse(localStorage.getItem("user"));

    } catch(ex) {
        console.log("Can't read user from localStorage. " + ex);
        return null;
    }

    return obj;
};

export const writeUserToLocalStorageAsync = async obj => {
    if (!obj.token || !obj.user) 
        return false;

    await removeUserFromLocalStorageAsync();

    try {
        localStorage.setItem("user", JSON.stringify(obj.user));
        localStorage.setItem("token", obj.token.toString());

    } catch(ex) {
        return false;
    }

    return true;
};

export const removeUserFromLocalStorageAsync = async () => {
    if (localStorage.getItem("user")) 
        localStorage.removeItem("user");

    if (localStorage.getItem("token"))
        localStorage.removeItem("token");
};