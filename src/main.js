import {objectToQueryString} from "./util";

export class FlatpeakService {
    /**
     * @param {string} host
     * @param {string} publishableKey
     * @param {boolean} verbose
     */
    constructor(host, publishableKey, verbose = false) {
        this._publishableKey = publishableKey;
        this._host = host;
        this._verbose = verbose;
    }

    /**
     * @private
     * @return {string}
     */
    get publishableKey() {
        return this._publishableKey;
    }

    /**
     * @private
     * @return {string}
     */
    get host() {
        return this._host;
    }

    /**
     * @private
     * @return {string}
     */
    get verbose() {
        return this._verbose;
    }

    /**
     * @private
     * @return {string}
     */
    authWithPublishableKey() {
        return `Basic ${Buffer.from(this.publishableKey + ":").toString("base64")}`;
    }

    /**
     * @param {RequestInit} init
     * @return {Promise<RequestInit>}
     */
    async authoriseRequest(init) {
        const headers = {
            "Content-Type": "application/json",
            Authorization: await this.authWithPublishableKey(),
        };
        if (!init) {
            return {
                headers,
            };
        }
        if (!init.headers) {
            init.headers = headers;
        } else {
            init.headers = { ...init.headers, ...headers };
        }
        return init;
    }

    async performRequest(input, init = 0) {
        init = await this.authoriseRequest(init);
        if (this.verbose) {
            console.log("performRequest", input, init);
        }
        return await fetch(input, init);
    }

    /**
     * @return {Promise<FlatPeak.Account>}
     */
    async getAccount() {
        const response = await this.performRequest(`${this.host}/account`, {
            method: "GET"
        });
        return await response.json();
    }

    /**
     * @param {string} [macAddress]
     * @param {string} [customerId]
     * @return {Promise<{usable: boolean}>}
     */
    async checkMacAddress(macAddress, customerId) {
        const qs = objectToQueryString({
            mac: macAddress,
            customer_id: customerId,
        });

        const response = await this.performRequest(
            `${this.host}/devices${qs ? "?" + qs : ""}`,
            {
                method: "PUT",
            }
        );

        return await response.json();
    }

    /**
     * @param {string} productId
     * @return {Promise<FlatPeak.Product>}
     */
    async getProduct(productId) {
        const response = await this.performRequest(
            `${this.host}/products/${productId}`
        );
        return await response.json();
    }

    /**
     * @param {string} tariffId
     * @return {Promise<FlatPeak.Product>}
     */
    async getTariff(tariffId) {
        const response = await this.performRequest(
            `${this.host}/tariffs/${tariffId}`
        );
        return await response.json();
    }

    /**
     * @param {string} [keywords]
     * @param {string} [countryCode]
     * @return {Promise<Array<FlatPeak.Provider>>}
     */
    async getProviders(keywords, countryCode) {
        const qs = objectToQueryString({
            country_code: countryCode,
            keywords: keywords,
        });
        const response = await this.performRequest(
            `${this.host}/providers${qs ? "?" + qs : ""}`
        );
        const result = await response.json();
        return result.data;
    }

    /**
     * Create a tariff plan
     * @param {FlatPeak.TariffCreate} data
     * @return {Promise<FlatPeak.Tariff>}
     */
    async createTariff(data) {
        const response = await this.performRequest(`${this.host}/tariffs`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    /**
     * Create a customer
     * @param {FlatPeak.CustomerCreate} data
     * @return {Promise<FlatPeak.Customer>}
     */
    async createCustomer(data) {
        const response = await this.performRequest(`${this.host}/customers`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    /**
     * Update a customer
     * @param {string} id
     * @param {FlatPeak.CustomerUpdate} data
     * @return {Promise<FlatPeak.Customer>}
     */
    async updateCustomer(id, data) {
        const response = await this.performRequest(`${this.host}/customers/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    /**
     * @param {string} customerId
     * @return {Promise<FlatPeak.Customer>}
     */
    async getCustomer(customerId) {
        const response = await this.performRequest(
            `${this.host}/customers/${customerId}`
        );
        return await response.json();
    }

    /**
     * Create a product.
     * @param {FlatPeak.ProductCreate} data
     * @return {Promise<FlatPeak.Product>}
     */
    async createProduct(data) {
        const response = await this.performRequest(`${this.host}/products`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    /**
     * Update a product.
     * @param {string} id
     * @param {FlatPeak.ProductUpdate} data
     * @return {Promise<FlatPeak.Product>}
     */
    async updateProduct(id, data) {
        const response = await this.performRequest(`${this.host}/products/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    /**
     * Create a device.
     * @param {FlatPeak.DeviceCreate} data
     * @return {Promise<FlatPeak.Device>}
     */
    async createDevice(data) {
        const response = await this.performRequest(`${this.host}/devices`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        return await response.json();
    }
}
