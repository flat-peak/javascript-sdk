'use strict';

const fetch = require("node-fetch");
const {Buffer} = require("buffer");

const objectToQueryString = (data) => {
  return Object.keys(data)
      .reduce((values, key) => {
        if (typeof data[key] === 'undefined') {
          return values;
        }
        const value = String(data[key]);
        if (value.length) {
          values.push(`${key}=${value}`);
        }
        return values;
      }, [])
      .join('&');
};

class FlatpeakService {
  /**
   * @param {string} host
   * @param {string} publishableKey
   * @param {boolean|Function} verbose
   */
  constructor(host, publishableKey, verbose = false) {
    this._publishableKey = publishableKey;
    this._host = host;
    this._verbose = verbose;
    this.logFn = typeof verbose === 'function' ? verbose : console.log;
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
    return `Basic ${Buffer.from(this.publishableKey + ':').toString('base64')}`;
  }

  /**
   * @param {RequestInit} init
   * @return {RequestInit}
   */
  async authoriseRequest(init) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': this.authWithPublishableKey(),
    };
    if (!init) {
      return {
        headers,
      };
    }
    if (!init.headers) {
      init.headers = headers;
    } else {
      init.headers = {...init.headers, ...headers};
    }
    return init;
  }

  /**
   * @param {RequestInfo} input
   * @param {RequestInit} [init]
   * @return {Promise<Response>}
   */
  performSignedRequest(input, init ) {
    init = this.authoriseRequest(init);
    if (this.verbose) {
      this.logFn(`Request: ${JSON.stringify({input, init})}`);
    }
    return fetch(input, init);
  }

  /**
   * @param {RequestInfo} input
   * @param {RequestInit} [init]
   * @return {Promise<Response>}
   */
  performPublicRequest(input, init ) {
    if (this.verbose) {
      this.logFn(`Request: ${JSON.stringify({input, init})}`);
    }
    return fetch(input, init);
  }

  /**
   * @param {Promise<Response>} request
   * @return {Promise<Object>}
   */
  async processRequest(request) {
    const response = await request;
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') > -1;
    const data = isJson ? await response.json() : {};
    if (this.verbose) {
      this.logFn(`Response: ${JSON.stringify(data)}`);
    }
    return data;
  }

  /**
   * @return {Promise<FlatPeak.Account>}
   */
  async getAccount() {
    return this.processRequest(
        this.performSignedRequest(`${this.host}/account`, {
          method: 'GET',
        }),
    );
  }

  /**
   * @param {string} [macAddress]
   * @param {string} [customerId]
   * @return {Promise<{usable: boolean}>}
   */
  checkMacAddress(macAddress, customerId) {
    const qs = objectToQueryString({
      mac: macAddress,
      customer_id: customerId,
    });

    return this.processRequest(this.performSignedRequest(
        `${this.host}/devices${qs ? '?' + qs : ''}`,
        {
          method: 'PUT',
        },
    ));
  }

  /**
   * @param {string} productId
   * @return {Promise<FlatPeak.Product>}
   */
  getProduct(productId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/products/${productId}`,
    ));
  }

  /**
   * @param {string} tariffId
   * @return {Promise<FlatPeak.Product>}
   */
  getTariff(tariffId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/tariffs/${tariffId}`,
    ));
  }

  /**
   * @param {string} [keywords]
   * @param {string} [countryCode]
   * @return {Promise<Array<FlatPeak.Provider>>}
   */
  getProviders(keywords, countryCode) {
    const qs = objectToQueryString({
      country_code: countryCode,
      keywords: keywords,
    });
    return this.processRequest(this.performSignedRequest(`${this.host}/providers${qs ? '?' + qs : ''}`))
        .then((result) => result.data);
  }

  /**
   * @param {string} providerId
   * @return {Promise<FlatPeak.Provider>}
   */
  getProvider(providerId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/providers/${providerId}`,
    ));
  };

  /**
   * Create a tariff plan
   * @param {FlatPeak.TariffCreate} data
   * @return {Promise<FlatPeak.Tariff>}
   */
  createTariff(data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/tariffs`, {
      method: 'POST',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Create a customer
   * @param {FlatPeak.CustomerCreate} data
   * @return {Promise<FlatPeak.Customer>}
   */
  createCustomer(data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/customers`, {
      method: 'POST',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Update a customer
   * @param {string} id
   * @param {FlatPeak.CustomerUpdate} data
   * @return {Promise<FlatPeak.Customer>}
   */
  updateCustomer(id, data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }));
  }

  /**
   * @param {string} customerId
   * @return {Promise<FlatPeak.Customer>}
   */
  getCustomer(customerId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/customers/${customerId}`,
    ));
  }

  /**
   * Create a product.
   * @param {FlatPeak.ProductCreate} data
   * @return {Promise<FlatPeak.Product>}
   */
  createProduct(data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/products`, {
      method: 'POST',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Update a product.
   * @param {string} id
   * @param {FlatPeak.ProductUpdate} data
   * @return {Promise<FlatPeak.Product>}
   */
  updateProduct(id, data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Create a device.
   * @param {FlatPeak.DeviceCreate} data
   * @return {Promise<FlatPeak.Device>}
   */
  createDevice(data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/devices`, {
      method: 'POST',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Initiate product update pull
   * @param {string} providerId
   * @param {Array<string>} [referenceIds]
   * @param {Array<string>} [productIds]
   * @return {Promise<Object>}
   */
  async initiateProductUpdate(providerId, referenceIds= [], productIds = []) {
    const input = `${this.host}/products`;
    const init = {
      headers: {
        'provider-id': providerId,
      },
      method: 'PATCH',
      body: JSON.stringify(
          Object.assign(
              {
                'action': 'pull_tariff',
                'provider_id': providerId,
              },
                    referenceIds.length ?
                        {reference_ids: referenceIds} :
                        {product_ids: productIds},
          ),
      ),
    };
    return this.processRequest(this.performPublicRequest(input, init));
  }

  /**
   * Retrieve rates for a device
   * @param {string} deviceId
   * @param {number} ratesPeriod
   * @return {Promise<any>}
   */
  async fetchRatesForDevice(deviceId, ratesPeriod) {
    const input = `${this.host}/rates/device/${deviceId}?rates_period=${ratesPeriod}`;
    const init = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(deviceId + ':').toString('base64')}`,
      },
    };
    return this.processRequest(this.performPublicRequest(input, init));
  }
}

exports.FlatpeakService = FlatpeakService;
