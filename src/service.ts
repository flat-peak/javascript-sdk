import { isEqualObjects, throwOnApiError } from "./utils";
import {
  ListResponse,
  SaveTariffPayload,
  Customer,
  CustomerCreate,
  CustomerUpdate,
  Device,
  DeviceCreate,
  Product,
  ProductCreate,
  ProductPull,
  ProductUpdate,
  Provider,
  Tariff,
  TariffCreate,
  TariffSettings,
  FlatpeakApiConfig,
  FlatpeakApiCache,
} from "./types";
import { ProductsModule } from "./modules/products";
import { TariffsModule } from "./modules/tariffs";
import { RatesModule } from "./modules/rates";
import { DevicesModule } from "./modules/devices";
import { ProvidersModule } from "./modules/providers";
import { FlatpeakModule } from "./modules/flatpeak-module";
import { CustomersModule } from "./modules/customers";
import { AccountModule } from "./modules/account";
import { EventsModule } from "./modules/events";
import { WebhooksModule } from "./modules/webhooks";
import { LoginModule } from "./modules/login";

export class FlatpeakService {
  private readonly modules: Array<FlatpeakModule>;

  private readonly config: Required<FlatpeakApiConfig>;

  private readonly cache: FlatpeakApiCache;

  products: ProductsModule;

  tariffs: TariffsModule;

  rates: RatesModule;

  accounts: AccountModule;

  devices: DevicesModule;

  providers: ProvidersModule;

  customers: CustomersModule;

  events: EventsModule;

  webhooks: WebhooksModule;

  login: LoginModule;

  /**
   * @param {string} host
   * @param {string} publishableKey
   * @param {boolean|Function} [logger = false]
   */
  constructor(
    host: string,
    publishableKey?: string,
    logger?: boolean | ((message: string) => void),
  );

  /**
   * @param {FlatpeakApiConfig} config
   */
  constructor(config: FlatpeakApiConfig);

  constructor(...args: Array<never>) {
    this.config =
      typeof args[0] === "string"
        ? {
            host: args[0],
            publishableKey: args[1],
            secretKey: "",
            logger: args[2],
          }
        : (args[0] as Required<FlatpeakApiConfig>);

    const { host } = this.config;
    if (!host) {
      throw new TypeError("Required missing param: host");
    }
    this.cache = {};
    this.modules = [];
    this.products = new ProductsModule(this.config, this.cache);
    this.rates = new RatesModule(this.config, this.cache);
    this.tariffs = new TariffsModule(this.config, this.cache);
    this.accounts = new AccountModule(this.config, this.cache);
    this.devices = new DevicesModule(this.config, this.cache);
    this.providers = new ProvidersModule(this.config, this.cache);
    this.customers = new CustomersModule(this.config, this.cache);
    this.events = new EventsModule(this.config, this.cache);
    this.webhooks = new WebhooksModule(this.config, this.cache);
    this.login = new LoginModule(this.config, this.cache);

    this.modules.push(
      this.products,
      this.rates,
      this.tariffs,
      this.accounts,
      this.devices,
      this.providers,
      this.customers,
      this.events,
      this.webhooks,
      this.login,
    );
  }

  getHost(): string {
    return this.config.host;
  }

  setHost(value: string) {
    this.config.host = value;
    this.destroyCache();
  }

  getPublishableKey(): string {
    return this.config.publishableKey;
  }

  setPublishableKey(value: string) {
    this.config.publishableKey = value;
    this.destroyCache();
  }

  getSecretKey(): string {
    return this.config.secretKey;
  }

  setSecretKey(value: string) {
    this.config.secretKey = value;
    this.destroyCache();
  }

  private destroyCache() {
    Object.keys(this.cache).forEach((key) => {
      this.cache[key as keyof FlatpeakApiCache] = undefined;
    });
  }

  /**
   * @deprecated - use flatpeak.accounts.current() instead
   * @return {Promise<Account>}
   */
  async getAccount() {
    return this.accounts.current();
  }

  /**
   * @deprecated - use flatpeak.devices.checkMacAddress({mac, customer_id}) instead
   * @return {Promise<{usable: boolean}>}
   */
  checkMacAddress(query: { mac: string; customer_id?: string }) {
    return this.devices.checkDeviceMac(query);
  }

  /**
   * @deprecated - use flatpeak.products.retrieve(productId) instead
   * @param {string} productId
   * @return {Promise<Product>}
   */
  getProduct(productId: string) {
    return this.products.retrieve(productId);
  }

  /**
   * @deprecated - use flatpeak.tariffs.retrieve(tariffId) instead
   * @param {string} tariffId
   * @return {Promise<Product>}
   */
  getTariff(tariffId: string) {
    return this.tariffs.retrieve(tariffId);
  }

  /**
   * @deprecated - use flatpeak.providers.list(query) instead
   * @param {object} [query]
   * @return {Promise<Array<Provider>>}
   */
  getProviders(query: Record<string, string>) {
    return this.providers
      .list(query)
      .then((result) => (result as ListResponse<Provider>).data);
  }

  /**
   * @deprecated - use flatpeak.providers.retrieve(providerId) instead
   * @param {string} providerId
   * @return {Promise<Provider>}
   */
  getProvider(providerId: string) {
    return this.providers.retrieve(providerId);
  }

  /**
   * @deprecated - use flatpeak.tariffs.create(body) instead
   * Create a tariff plan
   * @param {TariffCreate} data
   * @return {Promise<Tariff>}
   */
  createTariff(data: TariffCreate) {
    return this.tariffs.create(data);
  }

  /**
   * @deprecated - use flatpeak.customers.create(body) instead
   * Create a customer
   * @param {CustomerCreate} data
   * @return {Promise<Customer>}
   */
  createCustomer(data: CustomerCreate) {
    return this.customers.create(data);
  }

  /**
   * @deprecated - use flatpeak.customers.update(body) instead
   * Update a customer
   * @param {string} id
   * @param {CustomerUpdate} data
   * @return {Promise<Customer>}
   */
  updateCustomer(id: string, data: CustomerUpdate) {
    return this.customers.update(id, data);
  }

  /**
   * @deprecated - use flatpeak.customers.retrieve(customerId) instead
   * @param {string} customerId
   * @return {Promise<Customer>}
   */
  getCustomer(customerId: string) {
    return this.customers.retrieve(customerId);
  }

  /**
   * @deprecated - use flatpeak.products.create(data) instead
   * Create a product.
   * @param {ProductCreate} data
   * @return {Promise<Product>}
   */
  createProduct(data: ProductCreate) {
    return this.products.create(data);
  }

  /**
   * @deprecated - use flatpeak.products.update(id, data) instead
   * Update a product.
   * @param {string} id
   * @param {ProductUpdate} data
   * @return {Promise<Product>}
   */
  updateProduct(id: string, data: ProductUpdate) {
    return this.products.update(id, data);
  }

  /**
   * @deprecated - use flatpeak.devices.create(data) instead
   * Create a device.
   * @param {DeviceCreate} data
   * @return {Promise<Device>}
   */
  createDevice(data: DeviceCreate) {
    return this.devices.create(data);
  }

  /**
   * @deprecated - use flatpeak.products.pull(providerId, data) instead
   * Initiate product update pull
   * @param {string} providerId
   * @param {Array<string>} [referenceIds]
   * @param {Array<string>} [productIds]
   * @return {Promise<Object>}
   */
  async initiateProductUpdate(
    providerId: string,
    referenceIds: Array<string> = [],
    productIds = [],
  ) {
    return this.products.pull(providerId, {
      action: "pull_tariff",
      ...(referenceIds.length
        ? { reference_ids: referenceIds }
        : { product_ids: productIds }),
    } as ProductPull);
  }

  /**
   * @deprecated - use flatpeak.rates.retrieveForDevice(deviceId, query) instead
   * Retrieve rates for a device
   * @param {string} deviceId
   * @param {number} ratesPeriod
   * @param {string} [ratesType=tariff]
   * @return {Promise<any>}
   */
  async fetchRatesForDevice(
    deviceId: string,
    ratesPeriod: number,
    ratesType = "tariff",
  ) {
    return this.rates.retrieveForDevice(deviceId, {
      rates_period: ratesPeriod,
      rates_type: ratesType,
    });
  }

  /**
   * @param {SaveTariffPayload} payload
   * @return {Promise<SaveTariffResponse>}
   */
  async saveManualTariff(payload: SaveTariffPayload) {
    let { productId, customerId } = payload;

    const { macAddress, timezone, postalAddress, providerId, tariffPlan } =
      payload;

    /** @type {Product} */
    let product: Product;
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
      await this.devices.checkDeviceMac({
        mac: macAddress,
        ...(customerId && { customer_id: customerId }),
      }),
    );

    // Has customer_id?
    if (customerId) {
      // fetch customer
      customer = throwOnApiError(
        await this.customers.retrieve(customerId),
      ) as Customer;
    } else {
      // create customer & insert _id into session
      customer = throwOnApiError(
        await this.customers.create({
          is_disabled: false,
        }),
      ) as Customer;
      customerId = customer.id;
    }

    // Has product_id?
    const hasProductId = Boolean(productId);

    /** @type {ProductCreate | ProductUpdate} */
    const productPayload = {
      customer_id: customerId,
      provider_id: providerId,
      timezone,
      postal_address: postalAddress,
      is_disabled: false,
    };

    if (hasProductId) {
      // update product
      // fetch customer

      product = throwOnApiError(
        await this.products.retrieve(productId),
      ) as Product;
      product = throwOnApiError(
        await this.products.update(productId, productPayload),
      ) as Product;
    } else {
      // create product & insert _id into session
      product = throwOnApiError(
        await this.products.create(productPayload as ProductCreate),
      ) as Product;
      productId = (product as Product).id as string;
    }

    let isNewTariff = true;

    if (tariffPlan.id) {
      const origPlan = throwOnApiError(
        (await this.tariffs.retrieve(tariffPlan.id)) as Tariff,
      );
      isNewTariff = !isEqualObjects(origPlan, tariffPlan, [
        "timezone",
        "display_name",
        "product_id",
        "import",
        "export",
      ]);
    }

    if (isNewTariff) {
      /** @type {TariffCreate} */
      const tariffPayload = {
        product_id: productId,
        display_name: tariffPlan.display_name,
        import: tariffPlan.import,
        export: tariffPlan.export,
        timezone,
      };
      tariff = throwOnApiError(
        await this.tariffs.create(tariffPayload),
      ) as Tariff;

      const settingsPayload: ProductUpdate = {
        tariff_settings: {
          display_name: tariff.display_name,
          is_enabled: true,
          integrated: false,
          tariff_id: tariff.id,
        } as TariffSettings,
      };

      product = throwOnApiError(
        await this.products.update(productId, settingsPayload),
      ) as Product;
      tariffId = tariff.id;
    }

    const isNewDevice =
      !checkMacResponse.device_id ||
      !product.devices?.includes(checkMacResponse.device_id);

    if (isNewDevice) {
      /** @type {Device} */
      device = throwOnApiError(
        await this.devices.create({
          mac: macAddress,
          products: [productId],
          customer_id: customerId,
        } as DeviceCreate),
      ) as Device;
      deviceId = device.id;
    }
    return {
      device_id: deviceId,
      customer_id: customerId,
      product_id: productId,
      tariff_id: tariffId,
    };
  }

  /**
   * @param {SaveTariffPayload} payload
   * @return {Promise<SaveTariffResponse>}
   */
  async saveConnectedTariff(payload: SaveTariffPayload) {
    const { macAddress, productId, customerId, tariffPlan } = payload;
    if (!productId || !customerId || !tariffPlan.id) {
      throw new Error("Required object is missing");
    }

    const product = throwOnApiError(
      await this.products.retrieve(productId),
    ) as Product;
    const customer = throwOnApiError(
      await this.customers.retrieve(customerId),
    ) as Customer;

    (
      await Promise.all([
        customer.is_disabled
          ? this.customers.update(customerId, { is_disabled: false })
          : Promise.resolve({}),
        product.is_disabled
          ? this.products.update(productId, { is_disabled: false })
          : Promise.resolve({}),
      ])
    ).map((result) => throwOnApiError(result));

    let device: Device | undefined;
    if (macAddress) {
      // can this mac be used?
      const { device_id } = throwOnApiError(
        await this.devices.checkDeviceMac({
          mac: macAddress,
          ...(customerId && { customer_id: customerId }),
        }),
      );

      const isNewDevice = !device_id || !product.devices?.includes(device_id);

      if (isNewDevice) {
        device = throwOnApiError(
          await this.devices.create({
            mac: macAddress,
            products: [product.id],
            customer_id: customer.id,
          } as DeviceCreate),
        ) as Device;
      } else {
        device = throwOnApiError(
          await this.devices.retrieve(device_id),
        ) as Device;
      }
    }

    return {
      device_id: device ? device.id : undefined,
      customer_id: customer.id,
      product_id: product.id,
      tariff_id: tariffPlan.id,
    };
  }
}
