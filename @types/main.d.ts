export class FlatpeakService {
    /**
     * @param {string} host
     * @param {string} publishableKey
     * @param {boolean} verbose
     */
    constructor(host: string, publishableKey: string, verbose?: boolean);
    _publishableKey: string;
    _host: string;
    _verbose: boolean;
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
     * @return {Promise<RequestInit>}
     */
    authoriseRequest(init: RequestInit): Promise<RequestInit>;
    performRequest(input: any, init?: number): Promise<Response>;
    /**
     * @return {Promise<FlatPeak.Account>}
     */
    getAccount(): Promise<FlatPeak.Account>;
    /**
     * @param {string} [macAddress]
     * @param {string} [customerId]
     * @return {Promise<{usable: boolean}>}
     */
    checkMacAddress(macAddress?: string, customerId?: string): Promise<{
        usable: boolean;
    }>;
    /**
     * @param {string} productId
     * @return {Promise<FlatPeak.Product>}
     */
    getProduct(productId: string): Promise<FlatPeak.Product>;
    /**
     * @param {string} tariffId
     * @return {Promise<FlatPeak.Product>}
     */
    getTariff(tariffId: string): Promise<FlatPeak.Product>;
    /**
     * @param {string} [keywords]
     * @param {string} [countryCode]
     * @return {Promise<Array<FlatPeak.Provider>>}
     */
    getProviders(keywords?: string, countryCode?: string): Promise<Array<FlatPeak.Provider>>;
    /**
     * Create a tariff plan
     * @param {FlatPeak.TariffCreate} data
     * @return {Promise<FlatPeak.Tariff>}
     */
    createTariff(data: FlatPeak.TariffCreate): Promise<FlatPeak.Tariff>;
    /**
     * Create a customer
     * @param {FlatPeak.CustomerCreate} data
     * @return {Promise<FlatPeak.Customer>}
     */
    createCustomer(data: FlatPeak.CustomerCreate): Promise<FlatPeak.Customer>;
    /**
     * Update a customer
     * @param {string} id
     * @param {FlatPeak.CustomerUpdate} data
     * @return {Promise<FlatPeak.Customer>}
     */
    updateCustomer(id: string, data: FlatPeak.CustomerUpdate): Promise<FlatPeak.Customer>;
    /**
     * @param {string} customerId
     * @return {Promise<FlatPeak.Customer>}
     */
    getCustomer(customerId: string): Promise<FlatPeak.Customer>;
    /**
     * Create a product.
     * @param {FlatPeak.ProductCreate} data
     * @return {Promise<FlatPeak.Product>}
     */
    createProduct(data: FlatPeak.ProductCreate): Promise<FlatPeak.Product>;
    /**
     * Update a product.
     * @param {string} id
     * @param {FlatPeak.ProductUpdate} data
     * @return {Promise<FlatPeak.Product>}
     */
    updateProduct(id: string, data: FlatPeak.ProductUpdate): Promise<FlatPeak.Product>;
    /**
     * Create a device.
     * @param {FlatPeak.DeviceCreate} data
     * @return {Promise<FlatPeak.Device>}
     */
    createDevice(data: FlatPeak.DeviceCreate): Promise<FlatPeak.Device>;
    /**
     * Initiate product update pull
     * @param {string} providerId
     * @param {Array<string>} referenceIds
     * @param {Array<string>} productIds
     * @return {Promise<Object>}
     */
    initiateProductUpdate(providerId: string, referenceIds: Array<string>, productIds: Array<string>): Promise<any>;
}
