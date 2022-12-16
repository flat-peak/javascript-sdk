/**
 * FlatPeak API namespace
 */
export namespace FlatPeak {
  /**
   * Account.
   */
  export interface Account {
    /**
     * Allowed callback URLs for app-integration
     */
    allowed_origins?: any[];
    display_settings?: DisplaySettings;
    /**
     * FlatPeak unique object Id.
     */
    id: string;
    /**
     * Disables the object when set to false.
     */
    is_enabled: boolean;
    legal_profile?: LegalProfile;
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
     * FlatPeak unique object id of associated provider.
     */
    provider_id?: string;
    /**
     * Time when the object was created, in UTC.
     */
    time_created: string;
    /**
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone: string;
    /**
     * An array of FlatPeak webhook endpoint ids.
     */
    webhook_endpoints?: any[];
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
     * An array of objects required to render the app and integrations frontend.
     */
    language_assets?: LanguageAsset[];
    /**
     * Represents the object’s type.
     */
    object?: string;
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
     * Name of the business as legally registered. I.e. "Motorm Limited".
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
     * Represents the object’s type.
     */
    object?: string;
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

  export interface AccountCreate {
    /**
     * Allowed callback URLs for app-integration.
     */
    allowed_origins?: any[];
    display_settings?: DisplaySettings;
    /**
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
    legal_profile?: LegalProfile;
    /**
     * Has the value `true` if the object exists in live mode or the value false if the object
     * exists in test mode.
     */
    live_mode?: boolean;
    /**
     * FlatPeak unique object id of associated provider.
     */
    provider_id?: string;
    /**
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone?: string;
  }

  export interface AccountUpdate {
    /**
     * Allowed callback URLs for app-integration.
     */
    allowed_origins?: any[];
    display_settings?: DisplaySettings;
    /**
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
    legal_profile?: LegalProfile;
    live_mode?: boolean;
    /**
     * FlatPeak unique object id of associated provider.
     */
    provider_id?: string;
    /**
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone?: string;
  }

  /**
   * A read-only view of a (business) account. Used to return objects required by the provider
   * integrations. Includes vidual assets, language and security settings.
   */
  export interface AccountView {
    /**
     * Allowed callback domains. Used by integration to filter allowed callbacks.
     */
    allowed_origins?: any[];
    display_settings?: DisplaySettings;
    /**
     * FlatPeak unique object Id.
     */
    id: string;
    /**
     * Disables the object when set to false.
     */
    is_enabled: boolean;
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
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone: string;
  }

  /**
   * Authentication (Bearer) Token.
   */
  export interface AuthToken {
    /**
     * Bearer token. Expires 30 minutes after issue.
     */
    auth_token: string;
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
    interval_end: Date;
    /**
     * Start of the interval period in UTC
     */
    interval_start: Date;
    /**
     * Lowest consumption over specified period, in kWh
     */
    low?: number;
    /**
     * Peak consumption over specified period, in kWh
     */
    peak?: number;
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
     * Disables the object when set to false.
     */
    is_enabled: boolean;
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
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
     * Disables the object when set to `false`.
     */
    is_enabled: boolean;
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
    products: any[];
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
     * Disables the object when set to `false`.
     */
    is_enabled: boolean;
    /**
     * Dash-separated MAC address of the device
     */
    mac: string;
    /**
     * FlatPeak ids of Products this device is associated with.
     */
    products: any[];
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
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
     * Includes object that has been created, updated or deleted as per of this event.
     */
    data?: { [key: string]: any };
    /**
     * FlatPeak unique object `id`.
     */
    id?: string;
    /**
     * Represents the object’s type. I.e. `event`.
     */
    object?: string;
    /**
     * Unix timestamp of when the event has been created.
     */
    time_created?: string;
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
    geo_location?: string[];
    /**
     * FlatPeak unique product Id
     */
    id?: string;
    /**
     * Cannot be undone when set to `true`. Deleted objects cannot be updated, are routinely
     * removed and are not returned in list operations.
     */
    is_deleted: boolean;
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
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone: string;
  }

  /**
   * Settings for a Tariff of a Product
   */
  export interface TariffSettings {
    auth_metadata?: TariffAuthMetadata;
    /**
     * Tariff plan name
     */
    display_name?: string;
    /**
     * Set to true if tariff plan is connected to energy provider via online integration
     */
    integrated?: boolean;
    /**
     * Set to true if tariff plan is enabled
     */
    is_enabled?: boolean;
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
    data?: Data;
  }

  /**
   * The data container
   */
  export interface Data {
    auth_token?: string;
    /**
     * Represents the object’s type. I.e. `auth_metadata`.
     */
    object?: string;
    password?: string;
    user?: string;
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
    geo_location?: string[];
    postal_address?: PostalAddress;
    /**
     * FlatPeak id of the associated Provider
     */
    provider_id: string;
    tariff_settings?: TariffSettings;
    /**
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone: string;
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
    product_ids?: any[];
    /**
     * An array of reference ids that need associated tariffs to be updated.
     */
    reference_ids?: any[];
  }

  export interface ProductUpdate {
    /**
     * An array of FlatPeak id of associated Devices
     */
    devices?: string[];
    geo_location?: string[];
    postal_address?: PostalAddress;
    tariff_settings?: TariffSettings;
    /**
     * The timezone of the object in 'tz database format'. I.e. 'Europe/Berlin'.
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
     */
    timezone?: string;
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
     * Currency code, such as USD or GBP
     */
    currency_code?: string;
    display_settings?: DisplaySettings;
    /**
     * FlatPeak unique object `id`.
     */
    id?: string;
    /**
     * Access URLs for the Integration app.
     */
    integration_settings?: ProviderIntegrationSettings;
    /**
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
     * Currency code, such as GBP or EUR
     */
    currency_code: string;
    display_settings?: DisplaySettings;
    /**
     * Access URLs for the Integration app.
     */
    integration_settings?: ProviderCreateIntegrationSettings;
    /**
     * Disables the object when set to `false`.
     */
    is_enabled: boolean;
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
    display_settings?: DisplaySettings;
    /**
     * Access URLs for the Integration app.
     */
    integraiton_settings?: IntegraitonSettings;
    /**
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
  export interface IntegraitonSettings {
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
    export?: ProductExport[];
    /**
     * An array of tariff objects, grouped by time of tariff change
     */
    import?: ProductImport[];
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

  export interface ProductExport {
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

  export interface ProductImport {
    /**
     * Grid load index
     */
    grid?: Grid;
    /**
     * Renewables index
     */
    renewable?: Renewable;
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
   * Renewables index
   */
  export interface Renewable {
    /**
     * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
     */
    confidence?: number;
    /**
     * Renewable share in electricity generation (from 0.01 - lowest share, to 1.0 - the highest
     * share)
     */
    share?: number;
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
   * This object represents a tariff (plan).
   */
  export interface Tariff {
    /**
     * Export object, i.e. electricity provided by the supply point to the grid
     */
    export?: TariffSchedule[];
    /**
     * Unique Tariff Plan Id
     */
    id: string;
    /**
     * Import object, i.e. electricity provided by the grid to the supply point
     */
    import?: TariffSchedule[];
    /**
     * The Object name, i.e. tariff
     */
    object: string;
    /**
     * Id of the Product object which plan relates to
     */
    product_id: string;
    /**
     * Timestamp when the plan was created, in UTC. This value is automatically populated by API
     */
    time_created: string;
    /**
     * Expiration time, in UTC
     */
    time_expiry?: string;
    /**
     * The timezone of the plan, usually matches the Product timezone, in tz database format
     */
    timezone?: string;
  }

  export interface TariffSchedule {
    data?: TariffScheduleDatum[];
    type?: string;
  }

  export interface TariffScheduleDatum {
    days_and_hours?: TariffScheduleDaysAndHours[];
    /**
     * An array of months when tariff applies, possible values: Jan-Dec, All (for all months of
     * the year)
     */
    months?: string[];
  }

  export interface TariffScheduleDaysAndHours {
    /**
     * An array of days of the week when tariff applies, possible values: Mon-Sun,
     * Weekday-Weekend (the first day of the week will be determined from country code), All
     * (for all days of the week)
     */
    days?: string[];
    /**
     * Hours of the day
     */
    hours?: TariffScheduleHours[];
  }

  export interface TariffScheduleHours {
    /**
     * Cost (price) in small units
     */
    cost?: number;
    valid_from?: string;
    valid_to?: string;
  }

  /**
   * Id of the Product object which plan relates to
   */
  export interface TariffCreate {
    /**
     * Export object, i.e. electricity provided by the supply point to the grid
     */
    export?: TariffSchedule[];
    /**
     * Import object, i.e. electricity provided by the grid to the supply point
     */
    import?: TariffSchedule[];
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
     * Disables the object when set to false.
     */
    is_enabled?: boolean;
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
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
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
     * Disables the object when set to `false`.
     */
    is_enabled?: boolean;
    /**
     * Secret key to point with the event.
     */
    secret?: string;
  }
}
