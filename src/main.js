import {throwOnApiError} from './utils';

export class FlatpeakService {
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
  authoriseRequest(init) {
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
   * @return {Promise<Account>}
   */
  async getAccount() {
    return this.processRequest(
        this.performSignedRequest(`${this.host}/account`, {
          method: 'GET',
        }),
    );
  }

  /**
   * @param {object} [query]
   * @return {Promise<{usable: boolean}>}
   */
  checkMacAddress(query) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/devices?${(new URLSearchParams(query)).toString()}`,
        {
          method: 'PUT',
        },
    ));
  }

  /**
   * @param {string} productId
   * @return {Promise<Product>}
   */
  getProduct(productId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/products/${productId}`,
    ));
  }

  /**
   * @param {string} tariffId
   * @return {Promise<Product>}
   */
  getTariff(tariffId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/tariffs/${tariffId}`,
    ));
  }

  /**
   * @param {object} [query]
   * @return {Promise<Array<Provider>>}
   */
  getProviders(query) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/providers?${(new URLSearchParams(query)).toString()}`,
    ))
        .then((result) => result.data);
  }

  /**
   * @param {string} providerId
   * @return {Promise<Provider>}
   */
  getProvider(providerId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/providers/${providerId}`,
    ));
  };

  /**
   * Create a tariff plan
   * @param {TariffCreate} data
   * @return {Promise<Tariff>}
   */
  createTariff(data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/tariffs`, {
      method: 'POST',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Create a customer
   * @param {CustomerCreate} data
   * @return {Promise<Customer>}
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
   * @param {CustomerUpdate} data
   * @return {Promise<Customer>}
   */
  updateCustomer(id, data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/customers/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }));
  }

  /**
   * @param {string} customerId
   * @return {Promise<Customer>}
   */
  getCustomer(customerId) {
    return this.processRequest(this.performSignedRequest(
        `${this.host}/customers/${customerId}`,
    ));
  }

  /**
   * Create a product.
   * @param {ProductCreate} data
   * @return {Promise<Product>}
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
   * @param {ProductUpdate} data
   * @return {Promise<Product>}
   */
  updateProduct(id, data) {
    return this.processRequest(this.performSignedRequest(`${this.host}/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }));
  }

  /**
   * Create a device.
   * @param {DeviceCreate} data
   * @return {Promise<Device>}
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
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(providerId + ':').toString('base64')}`,
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
   * @param {string} [ratesType=tariff]
   * @return {Promise<any>}
   */
  async fetchRatesForDevice(deviceId, ratesPeriod, ratesType = 'tariff') {
    const input = `${this.host}/rates/device/${deviceId}?rates_period=${ratesPeriod}&rates_type=${ratesType}`;
    const init = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(deviceId + ':').toString('base64')}`,
      },
    };
    return this.processRequest(this.performPublicRequest(input, init));
  }

  /**
   * @param {SaveTariffPayload} payload
   * @return {Promise<SaveTariffResponse>}
   */
  async saveManualTariff(payload) {
    let {
      macAddress,
      timezone,
      postalAddress,
      productId,
      customerId,
      providerId,
      tariffPlan,
    } = payload;
    /** @type {Product} */
    let product;
    /** @type {Device} */
    let device;
    /** @type {Customer} */
    let customer;
    /** @type {Tariff} */
    let tariff;

    let deviceId;
    let tariffId;

    // can this mac be used?
    const checkMacResponse = throwOnApiError(
        await this.checkMacAddress({
          mac: macAddress,
          ...(customerId && {customer_id: customerId}),
        }),
    );

    // Has customer_id?
    if (customerId) {
      // fetch customer
      /** @type {Customer} */
      customer = throwOnApiError(await this.getCustomer(customerId));
    } else {
      // create customer & insert _id into session
      /** @type {Customer} */
      customer = throwOnApiError(await this.createCustomer({
        is_disabled: false
      }));
      customerId = customer.id;
    }

    // Has product_id?
    const hasProductId = Boolean(productId);

    /** @type {ProductCreate | ProductUpdate} */
    const productPayload = {
      customer_id: customerId,
      provider_id: providerId,
      timezone: timezone,
      postal_address: postalAddress,
      is_disabled: false
    };

    if (hasProductId) {
      // update product
      // fetch customer
      /** @type {Product} */
      product = throwOnApiError(await this.getProduct(productId));
      /** @type {Product} */
      product = throwOnApiError(
          await this.updateProduct(productId, productPayload),
      );
    } else {
      // create product & insert _id into session
      /** @type {Product} */
      product = throwOnApiError(await this.createProduct(productPayload));
      productId = product.id;
    }

    let isNewTariff = true;

    if (tariffPlan.id) {
      /** @type {Tariff} */
      const origPlan = throwOnApiError(await this.getTariff(tariffPlan.id));
      isNewTariff = !isEqualObjects(origPlan, tariffPlan, [
        'timezone',
        'display_name',
        'product_id',
        'import',
        'export',
      ]);
    }

    if (isNewTariff) {
      /** @type {TariffCreate} */
      const tariffPayload = {
        product_id: productId,
        display_name: tariffPlan.display_name,
        import: tariffPlan.import,
        export: tariffPlan.export,
        timezone: timezone,
      };
      /** @type {Tariff} */
      tariff = throwOnApiError(await this.createTariff(tariffPayload));

      /** @type {ProductUpdate} */
      const settingsPayload = {
        tariff_settings: {
          display_name: tariff.display_name,
          is_enabled: true,
          integrated: false,
          tariff_id: tariff.id,
        },
      };

      /** @type {Product} */
      product = throwOnApiError(
          await this.updateProduct(productId, settingsPayload),
      );
      tariffId = tariff.id;
    }

    const isNewDevice =
      !checkMacResponse.device_id ||
      !product.devices.includes(checkMacResponse.device_id);

    if (isNewDevice) {
      /** @type {Device} */
      device = throwOnApiError(
          await this.createDevice({
            mac: macAddress,
            products: [productId],
            customer_id: customerId,
          }),
      );
      deviceId = device.id;
    }
    return {
      device_id: deviceId,
      customer_id: customerId,
      product_id: productId,
      tariff_id: tariffId,
    };
  };

  /**
   * @param {SaveTariffPayload} payload
   * @return {Promise<SaveTariffResponse>}
   */
  async saveConnectedTariff(payload) {
    const {
      macAddress,
      productId,
      customerId,
      tariffPlan,
    } = payload;
    if (!productId || !customerId || !tariffPlan.id) {
      throw new Error('Required object is missing');
    }

    // can this mac be used?
    const {device_id} = throwOnApiError(
        await this.checkMacAddress({
          mac: macAddress,
          ...(customerId && {customer_id: customerId}),
        }),
    );

    /** @type {Device} */
    let device;

    /** @type {Product} */
    const product = throwOnApiError(await this.getProduct(productId));

    /** @type {Customer} */
    const customer = throwOnApiError(await this.getCustomer(customerId));

    (await Promise.all(
      [
        customer.is_disabled
          ? this.updateCustomer(customerId, {is_disabled: false})
          : Promise.resolve({}),
        product.is_disabled
          ? this.updateProduct(productId, {is_disabled: false})
          : Promise.resolve({})
      ]
    )).map((result) => throwOnApiError(result));

    const isNewDevice = !device_id || !product.devices.includes(device_id);

    if (isNewDevice) {
      /** @type {Device} */
      device = throwOnApiError(
          await this.createDevice({
            mac: macAddress,
            products: [product.id],
            customer_id: customer.id,
          }),
      );
    }

    return {
      device_id: device ? device.id : device_id,
      customer_id: customer.id,
      product_id: product.id,
      tariff_id: tariffPlan.id,
    };
  };
}
