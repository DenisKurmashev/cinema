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
        _sessions: config.sessions,
        _search: config.search,

        get login() {
            return this.host + this.api + this._profile + this._login;
        },
        get register() {
            return this.host + this.api + this._profile + this._register;
        },
        get products() {
            return this.host + this.api + this._products;
        },
        get sessions() {
            return this.host + this.api + this._sessions;
        },
        get search() {
            return this.host + this.api + this._sessions + this._search;
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

export const parseGetParams = (search = window.location.search) => {
    const params = search
        .replace("?", "")
        .split("&");

    let result = {};
    let splitStr;    
 
    for (let i = 0; i < params.length; i++) {
        if (!params[i]) continue;
        splitStr = params[i].split("=");
        result[splitStr[0]] = splitStr[1];
    }

    return result;
};

export const setGetParam = (key, value) => {
    const params = parseGetParams();
    let search = "/?";

    params[key] = value;

    for (let paramKey in params) {
        search += `${paramKey}=${params[paramKey]}&`;
    }

    window.history.pushState(
        null, 
        null, 
        window.location.origin + search.substring(0, search.length - 1)
    );
};