import {SaveTariffPayload, SaveTariffResponse} from "./types";
import {
    Account,
    Customer,
    CustomerCreate,
    CustomerUpdate, Device,
    DeviceCreate,
    Product, ProductCreate,
    ProductUpdate, Provider,
    Tariff,
    TariffCreate
} from "./api";

export class FlatpeakService {
    /**
     * @param {string} host
     * @param {string} publishableKey
     * @param {boolean|Function} verbose
     */
    constructor(host: string, publishableKey: string, verbose?: boolean | Function);
    _publishableKey: string;
    _host: string;
    _verbose: boolean | Function;
    logFn: Function;
    /**
     * @private
     * @return {string}
     */
    private get publishableKey();
    /**
     * @private
     * @return {string}
     */
    private get host();
    /**
     * @private
     * @return {string}
     */
    private get verbose();
    /**
     * @private
     * @return {string}
     */
    private authWithPublishableKey;
    /**
     * @param {RequestInit} init
     * @return {RequestInit}
     */
    authoriseRequest(init: RequestInit): RequestInit;
    /**
     * @param {RequestInfo} input
     * @param {RequestInit} [init]
     * @return {Promise<Response>}
     */
    performSignedRequest(input: RequestInfo, init?: RequestInit): Promise<Response>;
    /**
     * @param {RequestInfo} input
     * @param {RequestInit} [init]
     * @return {Promise<Response>}
     */
    performPublicRequest(input: RequestInfo, init?: RequestInit): Promise<Response>;
    /**
     * @param {Promise<Response>} request
     * @return {Promise<Object>}
     */
    processRequest(request: Promise<Response>): Promise<any>;
    /**
     * @return {Promise<Account>}
     */
    getAccount(): Promise<Account>;
    /**
     * @param {object} [query]
     * @return {Promise<{usable: boolean}>}
     */
    checkMacAddress(query?: object): Promise<{
        usable: boolean;
    }>;
    /**
     * @param {string} productId
     * @return {Promise<Product>}
     */
    getProduct(productId: string): Promise<Product>;
    /**
     * @param {string} tariffId
     * @return {Promise<Product>}
     */
    getTariff(tariffId: string): Promise<Product>;
    /**
     * @param {object} [query]
     * @return {Promise<Array<Provider>>}
     */
    getProviders(query?: object): Promise<Array<Provider>>;
    /**
     * @param {string} providerId
     * @return {Promise<Provider>}
     */
    getProvider(providerId: string): Promise<Provider>;
    /**
     * Create a tariff plan
     * @param {TariffCreate} data
     * @return {Promise<Tariff>}
     */
    createTariff(data: TariffCreate): Promise<Tariff>;
    /**
     * Create a customer
     * @param {CustomerCreate} data
     * @return {Promise<Customer>}
     */
    createCustomer(data: CustomerCreate): Promise<Customer>;
    /**
     * Update a customer
     * @param {string} id
     * @param {CustomerUpdate} data
     * @return {Promise<Customer>}
     */
    updateCustomer(id: string, data: CustomerUpdate): Promise<Customer>;
    /**
     * @param {string} customerId
     * @return {Promise<Customer>}
     */
    getCustomer(customerId: string): Promise<Customer>;
    /**
     * Create a product.
     * @param {ProductCreate} data
     * @return {Promise<Product>}
     */
    createProduct(data: ProductCreate): Promise<Product>;
    /**
     * Update a product.
     * @param {string} id
     * @param {ProductUpdate} data
     * @return {Promise<Product>}
     */
    updateProduct(id: string, data: ProductUpdate): Promise<Product>;
    /**
     * Create a device.
     * @param {DeviceCreate} data
     * @return {Promise<Device>}
     */
    createDevice(data: DeviceCreate): Promise<Device>;
    /**
     * Initiate product update pull
     * @param {string} providerId
     * @param {Array<string>} [referenceIds]
     * @param {Array<string>} [productIds]
     * @return {Promise<Object>}
     */
    initiateProductUpdate(providerId: string, referenceIds?: Array<string>, productIds?: Array<string>): Promise<any>;
    /**
     * Retrieve rates for a device
     * @param {string} deviceId
     * @param {number} ratesPeriod
     * @param {string} [ratesType=tariff]
     * @return {Promise<any>}
     */
    fetchRatesForDevice(deviceId: string, ratesPeriod: number, ratesType?: string): Promise<any>;
    /**
     * @param {SaveTariffPayload} payload
     * @return {Promise<SaveTariffResponse>}
     */
    saveManualTariff(payload: SaveTariffPayload): Promise<SaveTariffResponse>;
    /**
     * @param {SaveTariffPayload} payload
     * @return {Promise<SaveTariffResponse>}
     */
    saveConnectedTariff(payload: SaveTariffPayload): Promise<SaveTariffResponse>;
}
