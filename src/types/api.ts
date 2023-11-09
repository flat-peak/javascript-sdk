/**
 * Flatpeak API namespace
 */
export interface FlatPeak {
  Account?: Account;
  AreaEnabled?: AreaEnabled[];
  AuthToken?: AuthToken;
  Consumption?: Consumption;
  Customer?: Customer;
  CustomerCreate?: CustomerCreate;
  CustomerUpdate?: CustomerUpdate;
  Device?: Device;
  DeviceCreate?: DeviceCreate;
  DeviceUpdate?: DeviceUpdate;
  DisplaySettings?: DisplaySettings;
  Event?: Event;
  GeoLocation?: number[];
  GridSettings?: GridSettings;
  HardwareProfile?: HardwareProfile;
  Key?: Key;
  KeyCreate?: KeyCreate;
  LegalProfile?: LegalProfile;
  PostalAddress?: PostalAddress;
  Product?: Product;
  ProductCreate?: ProductCreate;
  ProductPull?: ProductPull;
  ProductUpdate?: ProductUpdate;
  Provider?: Provider;
  ProviderCreate?: ProviderCreate;
  ProviderUpdate?: ProviderUpdate;
  Rate?: Rate;
  Tariff?: Tariff;
  TariffAuthMetadata?: TariffAuthMetadata;
  TariffCreate?: TariffCreate;
  TariffSettings?: TariffSettings;
  TariffWeekday?: TariffWeekday;
  Terms?: Terms;
  WebhookEndpoint?: WebhookEndpoint;
  WebhookEndpointCreate?: WebhookEndpointCreate;
  WebhookEndpointUpdate?: WebhookEndpointUpdate;
}

/**
 * A read-only view of a (business) account. Used to return objects required by the provider
 * integrations. Includes visual assets, language and security settings.
 */
export interface Account {
  /**
   * Allowed callback domains. Used by integration to filter allowed callbacks.
   */
  allowed_origins?: string[];
  area_enabled?: AreaEnabled[];
  display_settings?: DisplaySettings;
  /**
   * FlatPeak unique object Id.
   */
  id: string;
  /**
   * Disables the object when set to `true`. Disabled account objects will not return rates.
   */
  is_disabled?: boolean;
  /**
   * Has the value true if the object exists in live mode or the value false if the object
   * exists in test mode
   */
  live_mode?: boolean;
  /**
   * Represents the object’s type.
   */
  object: string;
  /**
   * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
   */
  timezone: string;
}

/**
 * An array of geographical areas (countries and states) that is accessible to this object
 */
export interface AreaEnabled {
  /**
   * Array of country codes in ISO 3166 Alfa-2 format
   */
  country_code?: string;
  /**
   * Array of states / regions served
   */
  states?: string[];
}

/**
 * Includes information required to render the app and integration frontend
 */
export interface DisplaySettings {
  /**
   * The default language to be used when rendering the assets of the desired language is not
   * available. In ISO 639-1, UPPERCASE. https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes.
   */
  default_language?: string;
  /**
   * Graphic objects required to render the app and integrations frontend.
   */
  graphic_assets?: GraphicAssets;
  /**
   * An array of objects required to render the app and integrations frontend.
   */
  language_assets?: LanguageAsset[];
  /**
   * Represents the object’s type.
   */
  object?: string;
}

/**
 * Graphic objects required to render the app and integrations frontend.
 */
export interface GraphicAssets {
  /**
   * Main accent color that will be used in highlights.
   */
  accent_color?: string;
}

export interface LanguageAsset {
  /**
   * The display name of the business in the format that will be displayed to customers.
   */
  display_name?: string;
  /**
   * The language of this set of assets In ISO 639-1, UPPERCASE.
   * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes.
   */
  language_code?: string;
  /**
   * Link to the logo of the business. To be displayed on light-colour backgrounds.
   */
  logo_url?: string;
  /**
   * Link to the customer-facing Privacy policy document.
   */
  privacy_url?: string;
  /**
   * Link to the customer Support page.
   */
  support_url?: string;
  /**
   * Link to the customer-facing Terms and Conditions document.
   */
  terms_url?: string;
}

/**
 * Authentication (Bearer) Token.
 */
export interface AuthToken {
  /**
   * Bearer token. Expires 30 minutes after issue.
   */
  token: string;
}

export interface Consumption {
  data?: DatumElement[];
  object?: string;
}

/**
 * Consumption of an object over a specified period
 */
export interface DatumElement {
  /**
   * Average consumption over specified period, in kWh
   */
  avg?: number;
  /**
   * Total consumption over specified period, in kWh
   */
  consumption?: number;
  /**
   * End of the interval period in UTC
   */
  interval_end?: string;
  /**
   * Start of the interval period in UTC
   */
  interval_start?: string;
  /**
   * Lowest consumption over specified period, in kWh
   */
  low?: number;
  /**
   * Peak consumption over specified period, in kWh
   */
  peak?: number;
  /**
   * Indicates if device was powered during the interval.
   */
  powered?: boolean;
}

/**
 * This object represents a customer of your business.
 */
export interface Customer {
  /**
   * FlatPeak unique account id
   */
  account_id: string;
  /**
   * FlatPeak unique object Id.
   */
  id: string;
  /**
   * Cannot be undone when set to `true`. Deleted objects cannot be updated, are routinely
   * removed and are not returned in list operations.
   */
  is_deleted: boolean;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Has the value true if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode: boolean;
  /**
   * Represents the object’s type.
   */
  object: string;
  /**
   * An array of FlatPeak product ids that are associated with this object.
   */
  products?: string[];
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
  /**
   * Time when the object was created, in UTC.
   */
  time_created: string;
}

/**
 * Create a customer
 */
export interface CustomerCreate {
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
}

/**
 * Update a customer
 */
export interface CustomerUpdate {
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
}

/**
 * This object represents a device or another asset of a compatible type.
 */
export interface Device {
  /**
   * Optional object description
   */
  description?: string;
  hardware_profile?: HardwareProfile;
  /**
   * FlatPeak unique object `id`.
   */
  id: string;
  /**
   * Cannot be undone when set to `true`. Deleted objects cannot be updated, are routinely
   * removed and are not returned in list operations.
   */
  is_deleted: boolean;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Timestamp of when the device has last queried the service.
   */
  last_seen?: string;
  /**
   * Dash-separated MAC address of the device
   */
  mac: string;
  /**
   * Represents the object’s type.
   */
  object: string;
  /**
   * FlatPeak ids of Products this device is associated with.
   */
  products: string[];
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
  /**
   * Time when the object was created, in UTC.
   */
  time_created: string;
}

/**
 * Device hardware profile
 */
export interface HardwareProfile {
  /**
   * Make of the device. For example 'Samsung'
   */
  make?: string;
  /**
   * Model of the device, for example 'RB31FDRNDSA'
   */
  model?: string;
  /**
   * Type of the device, for example 'Fridge Freezer'
   */
  type?: string;
  /**
   * Consumption rating of the device, in watts
   */
  wattage_in?: number;
  /**
   * Rated export capability of the device, in watts.
   */
  wattage_out?: number;
}

/**
 * Creates a device
 */
export interface DeviceCreate {
  /**
   * Optional object description
   */
  description?: string;
  hardware_profile?: HardwareProfile;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Dash-separated MAC address of the device
   */
  mac: string;
  /**
   * FlatPeak ids of Products this device is associated with.
   */
  products: string[];
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
}

/**
 * Updates a Device
 */
export interface DeviceUpdate {
  /**
   * Optional object description
   */
  description?: string;
  hardware_profile?: HardwareProfile;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * A reference that is meaningful to you, for example, an id from your system.
   */
  reference_id?: string;
}

/**
 * This object represents a FlatPeak system event of any type
 */
export interface Event {
  /**
   * FlatPeak account_id that initiated this event
   */
  account_id?: string;
  /**
   * Includes object that has been created, updated or deleted as per of this event.
   */
  data?: { [key: string]: unknown };
  /**
   * FlatPeak unique object `id`.
   */
  id?: string;
  /**
   * Has the value true if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode?: boolean;
  /**
   * Represents the object’s type. I.e. `event`.
   */
  object?: string;
  /**
   * Time when the event was created, in UTC.
   */
  time_created?: string;
  /**
   * CRUD API action that created this event. For example Product create will have type of
   * `product.create`
   */
  type?: string;
}

/**
 * Includes information required to integrate carbon intensity and grid load data
 */
export interface GridSettings {
  /**
   * An array of configured data sources for carbon intensity and grid load data
   */
  sources?: Source[];
}

export interface Source {
  /**
   * ID of the FlatPeak API key that stores the API key for this data source
   */
  key_id?: string;
  /**
   * Source of data currently ElectricityMaps is the only supported source
   */
  source: string;
  /**
   * Type of data source. Either carbon or grid
   */
  type: string;
  /**
   * API URL for the data source if required
   */
  url?: string;
}

/**
 * This object represents an API key for accessing the FlatPeak API.
 */
export interface Key {
  /**
   * FlatPeak account_id this key belongs to.
   */
  account_id?: string;
  /**
   * FlatPeak unique object Id.
   */
  id?: string;
  /**
   * Cannot be undone when set to true. Deleted objects cannot be updated, are routinely
   * removed and are not returned in list operations.
   */
  is_deleted?: boolean;
  /**
   * The key to be used when accessing the FlatPeak API.
   */
  key?: string;
  /**
   * Type of key. Either publishable, secret or carbon.
   */
  key_type?: string;
  /**
   * Has the value true if the API key is for live mode and false for test mode.
   */
  live_mode?: boolean;
  /**
   * Descriptive name for the API key.
   */
  name?: string;
  /**
   * Represents the object’s type. I.e. key.
   */
  object?: string;
  /**
   * Has the value true if it is a secret key and false if it is a publishable key.
   */
  secret_key?: boolean;
  /**
   * Time when the object was created, in UTC.
   */
  time_created?: string;
}

export interface KeyCreate {
  key?: string;
  key_type?: string;
  live_mode?: boolean;
  name?: string;
}

/**
 * This object includes information on legal and registration of the (business) account.
 */
export interface LegalProfile {
  /**
   * The email address for legal communications.
   */
  contact_email?: string;
  /**
   * The phone number for legal communications.
   */
  contact_phone?: string;
  /**
   * Name of the business as legally registered. I.e. "Timeshift Inc".
   */
  legal_name?: string;
  /**
   * Represents the object’s type.
   */
  object?: string;
  postal_address?: PostalAddress;
  terms?: Terms;
}

/**
 * This object includes information on the postal address.
 */
export interface PostalAddress {
  /**
   * Address line 1 (e.g., street, PO Box, or company name).
   */
  address_line1?: string;
  /**
   * Address line 2 (e.g., apartment, suite, unit, or building).
   */
  address_line2?: string;
  /**
   * City, district, suburb, town, or village.
   */
  city?: string;
  /**
   * Two-letter country code (ISO 3166-1 alpha-2).
   */
  country_code?: string;
  /**
   * ZIP or postal code.
   */
  post_code?: string;
  /**
   * State, county, province, or region.
   */
  state?: string;
}

/**
 * This object includes information about acceptance of terms and conditions of FlatPeak.
 */
export interface Terms {
  /**
   * Represents the object’s type.
   */
  object?: string;
  /**
   * Set to true if terms were accepted.
   */
  terms_accepted?: boolean;
  /**
   * Timestamp when terms were accepted. Used to track acceptance date and terms version.
   */
  terms_accepted_time?: string;
}

/**
 * This object represents an energy product.
 * Including any and all data that might be imported from the provider.
 */
export interface Product {
  /**
   * FlatPeak unique account id.
   */
  account_id: string;
  /**
   * A uniquie Id of associated Customer
   */
  customer_id: string;
  /**
   * An array of uniquie Id of associated Devices
   */
  devices?: string[];
  geo_location?: number[];
  /**
   * FlatPeak unique product Id
   */
  id: string;
  /**
   * Cannot be undone when set to `true`. Deleted objects cannot be updated, are routinely
   * removed and are not returned in list operations.
   */
  is_deleted: boolean;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Has the value `true` if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode: boolean;
  /**
   * Represents the object’s type. I.e. `product`.
   */
  object: string;
  postal_address?: PostalAddress;
  /**
   * A uniquie Id of associated Provider
   */
  provider_id: string;
  tariff_settings?: TariffSettings;
  /**
   * Time when the object was created, in UTC.
   */
  time_created: string;

  /**
   * Time and date when customer contract with energy provider expires.
   */
  contract_end_date?: string;
}

/**
 * Settings for a Tariff of a Product
 */
export interface TariffSettings {
  auth_metadata?: TariffAuthMetadata;
  /**
   * FlatPeak internal object ID that stores auth_metadata object. Once created auth_metadata
   * object content is never returned.
   */
  auth_metadata_id?: string;
  /**
   * How many times fetching the tariff has failed.
   */
  failed_attempts?: number;
  /**
   * Set to true if tariff plan is connected to energy provider via online integration
   */
  integrated?: boolean;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Time of last update of the tariff in unix format. This value is automatically calculated
   * on tariff create and cannot be updated here.
   */
  last_update_time?: number;
  /**
   * Time of next update of the tariff in unix format
   */
  next_update_time?: number;
  /**
   * Agreement id or another id that identifies tariff plan with the provider
   */
  reference_id?: string;
  /**
   * Id of FlatPeak current tariff object
   */
  tariff_id?: string;
}

/**
 * This object contains information required to fetch/pull customer tariff(s) from their
 * energy supplier. The data object will contain information in a format that is defined by
 * the specific integration.
 */
export interface TariffAuthMetadata {
  /**
   * The data container
   */
  data?: Record<string, unknown>;
  reference_id?: string;
}

/**
 * Creates a Product
 */
export interface ProductCreate {
  /**
   * FlatPeak id of the associated Customer
   */
  customer_id: string;
  /**
   * An array of FlatPeak id of associated Devices
   */
  devices?: string[];
  geo_location?: number[];
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  postal_address?: PostalAddress;
  /**
   * FlatPeak id of the associated Provider
   */
  provider_id: string;
  tariff_settings?: TariffSettings;
  /**
   * The timezone of the product in 'tz database format'. I.e. 'Europe/Berlin'.
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
   */
  timezone?: string;
}

/**
 * Initiate pulling updates for a product via the Integration
 */
export interface ProductPull {
  /**
   * pull_tariff
   */
  action?: string;
  /**
   * An array of FlatPeak product Ids that need associated tariffs to be updated.
   */
  product_ids?: string[];
  /**
   * An array of reference ids that need associated tariffs to be updated.
   */
  reference_ids?: string[];
}

export interface ProductUpdate {
  /**
   * An array of FlatPeak id of associated Devices
   */
  devices?: string[];
  geo_location?: number[];
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  postal_address?: PostalAddress;
  tariff_settings?: TariffSettings;
}

/**
 * This object represents an energy provider.
 */
export interface Provider {
  /**
   * The Id of the associated FlatPeak Account.
   */
  account_id?: string;
  /**
   * Geographical areas served by the provider
   */
  area_served?: ProviderAreaServed;
  /**
   * Short code name of the provider
   */
  code_name?: string;
  /**
   * Short code number of the provider
   */
  code_number?: string;
  /**
   * Currency code, such as USD or GBP
   */
  currency_code?: string;
  display_settings?: DisplaySettings;
  /**
   * FlatPeak unique object `id`.
   */
  id?: string;
  /**
   * 0=Connected, 1-3=Phase 1-3
   */
  integration_phase?: number;
  /**
   * Access URLs for the Integration app.
   */
  integration_settings?: ProviderIntegrationSettings;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Has the value `true` if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode?: boolean;
  /**
   * Represents the object’s type. I.e. `provider`.
   */
  object?: string;
  /**
   * Time when the object was created, in UTC.
   */
  time_created?: string;
}

/**
 * Geographical areas served by the provider
 */
export interface ProviderAreaServed {
  /**
   * Country code of the area served in ISO 3166 Alfa-2 format
   */
  country_code?: string;
  /**
   * Array of states / regions served
   */
  states?: string[];
}

/**
 * Access URLs for the Integration app.
 */
export interface ProviderIntegrationSettings {
  /**
   * Headless API endpoint
   */
  api_url?: string;
  /**
   * Headed (user UI) endpoint
   */
  onboard_url?: string;
}

export interface ProviderCreate {
  /**
   * List of geographical areas that as being served by the provider.
   */
  area_served: ProviderCreateAreaServed;
  /**
   * Short coded name of the provider.
   */
  code_name: string;
  /**
   * Short coded number of the provider.
   */
  code_number?: string;
  /**
   * Currency code, such as GBP or EUR
   */
  currency_code: string;
  display_settings?: DisplaySettings;
  /**
   * 0=Connected, 1-3=Phases 1-3
   */
  integration_phase: number;
  /**
   * Access URLs for the Integration app.
   */
  integration_settings?: ProviderCreateIntegrationSettings;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
}

/**
 * List of geographical areas that as being served by the provider.
 */
export interface ProviderCreateAreaServed {
  /**
   * Country code of the area served in ISO 3166 Alfa-2 format
   */
  country_code: string;
  /**
   * Array of states / regions served. Leave blank for all states/localities
   */
  states: string[];
}

/**
 * Access URLs for the Integration app.
 */
export interface ProviderCreateIntegrationSettings {
  /**
   * Headedless (API) endpoint
   */
  api_url?: string;
  /**
   * Headed (user UI) endpoint
   */
  onboard_url?: string;
}

export interface ProviderUpdate {
  /**
   * List of geographical areas served by the provider
   */
  area_served?: ProviderUpdateAreaServed;
  /**
   * Short coded name of the provider.
   */
  code_name?: string;
  /**
   * Short coded name of the provider.
   */
  code_number?: string;
  display_settings?: DisplaySettings;
  /**
   * 0=Connected, 1-3=Phases 1-3
   */
  integration_phase?: number;
  /**
   * Access URLs for the Integration app.
   */
  integration_settings?: ProviderUpdateIntegrationSettings;
  /**
   * Disables the object when set to `true`.
   */
  is_disabled?: boolean;
}

/**
 * List of geographical areas served by the provider
 */
export interface ProviderUpdateAreaServed {
  /**
   * Country code of the area served in ISO 3166 Alfa-2 format
   */
  country_code?: string;
  /**
   * Array of states / regions served. Leave blank for all states/localities
   */
  states?: string[];
}

/**
 * Access URLs for the Integration app.
 */
export interface ProviderUpdateIntegrationSettings {
  /**
   * Headedless (API) endpoint
   */
  api_url?: string;
  /**
   * Headed (user UI) endpoint
   */
  onboard_url?: string;
}

/**
 * This object is a container for energy rates response.
 */
export interface Rate {
  /**
   * The unique FlatPeak id of the Device.
   */
  device_id?: string;
  /**
   * FlatPeak unique object `id`.
   */
  id?: string;
  /**
   * Has the value `true` if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode?: boolean;
  /**
   * Represents the object’s type. I.e. `rate`.
   */
  object?: string;
  /**
   * An array of FlatPeak products relevant to this request
   */
  products?: ProductElement[];
  /**
   * Time when this rates response was calculated.
   */
  time_created?: string;
}

export interface ProductElement {
  /**
   * An array of tariff objects, grouped by time of tariff change
   */
  export?: Export[];
  /**
   * An array of tariff objects, grouped by time of tariff change
   */
  import?: Import[];
  /**
   * Time when rates were last updated.
   */
  last_updated?: string;
  /**
   * Time when rates will be updated next
   */
  next_update?: string;
  /**
   * The Id of the FlatPeak product
   */
  product_id?: string;
}

export interface Export {
  /**
   * The rates (i.e. tariff, energy price) object
   */
  tariff?: ExportTariff;
  /**
   * Time from when information is valid, in UTC timezone
   */
  valid_from?: string;
  /**
   * Time until when information is valid, in UTC timezone
   */
  valid_to?: string;
}

/**
 * The rates (i.e. tariff, energy price) object
 */
export interface ExportTariff {
  /**
   * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
   */
  confidence?: number;
  /**
   * The rate value
   */
  cost?: number;
}

export interface Import {
  /**
   * Carbon intensity index
   */
  carbon?: Carbon;
  /**
   * Grid load index
   */
  grid?: Grid;
  /**
   * The tariff rates object
   */
  tariff?: ImportTariff;
  /**
   * Time from when information is valid, in UTC timezone
   */
  valid_from?: string;
  /**
   * Time until when information is valid, in UTC timezone
   */
  valid_to?: string;
}

/**
 * Carbon intensity index
 */
export interface Carbon {
  /**
   * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
   */
  confidence?: number;
  /**
   * Carbon intensity of electricity generation in gCO2 per kWh
   */
  intensity?: number;
  /**
   * Relative carbon intensity of electricity generation from 0 - lowest, to 1.0 - the highest
   */
  relative?: number;
}

/**
 * Grid load index
 */
export interface Grid {
  /**
   * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
   */
  confidence?: number;
  /**
   * Grid load rate (from 0.01 - lowest load, to 1.0 - the highest load)
   */
  load?: number;
}

/**
 * The tariff rates object
 */
export interface ImportTariff {
  /**
   * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
   */
  confidence?: number;
  /**
   * The rate value
   */
  cost?: number;
}

/**
 * This object represents a tariff.
 */
export interface Tariff {
  /**
   * Tariff plan name.
   */
  display_name: string;
  /**
   * Export object, i.e. electricity provided by the supply point to the grid.
   */
  export: TariffWeekday[];
  /**
   * Unique Tariff Plan Id.
   */
  id: string;
  /**
   * Import object, i.e. electricity provided by the grid to the supply point.
   */
  import: TariffWeekday[];
  /**
   * Set to `true` when tariff is created by Connected integration type.
   */
  integrated?: boolean;
  /**
   * The Object name, i.e. tariff.
   */
  object: string;
  /**
   * Id of the Product object which plan relates to.
   */
  product_id: string;
  /**
   * Source of the tariff data, e.g. which integration created it.
   */
  source?: string;
  /**
   * Timestamp when the plan was created, in UTC. This value is automatically populated by API.
   */
  time_created: string;
  /**
   * Expiration time, in UTC.
   */
  time_expiry?: string;
  /**
   * Time and date when customer contract with energy provider expires.
   */
  contract_end_date?: string;
  /**
   * The timezone of the tariff data in 'tz database format'. I.e. 'Europe/Berlin'.
   * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
   */
  timezone?: string;
}

/**
 * This object represents a `weekday` tariff model. I.e. a tariff that varies by season &
 * day of the week.
 */
export interface TariffWeekday {
  data?: Datum[];
  /**
   * Tariff type. i.e. `weekday`.
   */
  type?: string;
}

export interface Datum {
  /**
   * An array of days of the month tariff applies, possible values: 1...31 (for all days of of
   * the month). For all days omit the entire parameter.
   */
  dates?: number[];
  days_and_hours?: DaysAndHour[];
  /**
   * An array of months when tariff applies, possible values: Jan-Dec, All (for all months of
   * the year).
   */
  months?: string[];
}

export interface DaysAndHour {
  /**
   * An array of days of the week when tariff applies, possible values: Mon-Sun,
   * Weekday-Weekend (the first day of the week will be determined from country code), All
   * (for all days of the week).
   */
  days?: string[];
  /**
   * A time period in hours, minutes and seconds.
   */
  hours?: Hour[];
}

export interface Hour {
  /**
   * Cost (price) of electricity in small currency units.
   */
  cost?: number;
  /**
   * Start time of when cost is applied.
   */
  valid_from?: string;
  /**
   * End time of when cost is applied.
   */
  valid_to?: string;
}

/**
 * Id of the Product object which plan relates to
 */
export interface TariffCreate {
  /**
   * Export object, i.e. electricity provided by the supply point to the grid
   */
  export?: TariffWeekday[];
  /**
   * Import object, i.e. electricity provided by the grid to the supply point
   */
  import?: TariffWeekday[];
  /**
   * Set to `true` when tariff is created by Connected integration type
   */
  integrated?: boolean;
  /**
   * Id of the Product object which Tariff Plan relates to
   */
  product_id: string;
  /**
   * Time when this data will expire, in UTC
   */
  time_expiry?: string;
  /**
   * The timezone of the plan, usually matches the Product timezone, in tz database format
   */
  timezone?: string;
}

/**
 * This object represents a webhook destination endpoint
 */
export interface WebhookEndpoint {
  /**
   * FlatPeak unique account Id
   */
  account_id?: string;
  /**
   * The description of the object.
   */
  description?: string;
  /**
   * Destination URL where webook envents will be posted.
   */
  destination_url?: string;
  /**
   * Event types that will be processed by this webhook endpoint. Event types are constructed
   * from objects. I.e. `customer.created`.
   */
  enabled_events?: string[];
  /**
   * FlatPeak unique object Id.
   */
  id?: string;
  /**
   * Disables the object when set to `true`. Disabled objects are not returned by list method.
   */
  is_disabled?: boolean;
  /**
   * Has the value true if the object exists in live mode or the value false if the object
   * exists in test mode.
   */
  live_mode?: boolean;
  /**
   * Represents the object’s type.
   */
  object?: string;
  /**
   * Secret key to point with the event.
   */
  secret?: string;
  /**
   * Represent webhook operational status. Current supported values are `active`, `failed`.
   */
  status?: string;
  /**
   * Time when the object was created, in UTC.
   */
  time_created?: string;
}

/**
 * Create a webhook endpoint
 */
export interface WebhookEndpointCreate {
  /**
   * The description of the object.
   */
  description?: string;
  /**
   * Destination URL where webook envents will be posted.
   */
  destination_url?: string;
  /**
   * Event types that will be processed by this webhook endpoint. Event types are constructed
   * from objects. I.e. `customer.created`.
   */
  enabled_events?: string[];
  /**
   * Disables the webhook when set to `true`.
   */
  is_disabled?: boolean;
  /**
   * Secret key to point with the event.
   */
  secret?: string;
}

export interface WebhookEndpointUpdate {
  /**
   * The description of the object.
   */
  description?: string;
  /**
   * Destination URL where webook envents will be posted.
   */
  destination_url?: string;
  /**
   * Event types that will be processed by this webhook endpoint. Event types are constructed
   * from objects. I.e. `customer.created`.
   */
  enabled_events?: string[];
  /**
   * Disables the object when set to `true`.
   */
  is_disabled?: boolean;
  /**
   * Secret key to point with the event.
   */
  secret?: string;
}
