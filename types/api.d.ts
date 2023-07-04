
    /**
     * Account.
     */
    export interface Account {
        /**
         * Allowed callback URLs for app-integration
         */
        allowed_origins?:  any[];
        area_enabled?:     AreaEnabled[];
        display_settings?: DisplaySettings;
        /**
         * FlatPeak unique object Id.
         */
        id: string;
        /**
         * Disables the object when set to false.
         */
        is_enabled:     boolean;
        legal_profile?: LegalProfile;
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
        object?:         string;
        postal_address?: PostalAddress;
        terms?:          Terms;
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
     * This object includes information about acceptance of terms and conditions of
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
        allowed_origins?:  any[];
        area_enabled?:     AreaEnabled[];
        display_settings?: DisplaySettings;
        /**
         * Disables the object when set to `false`.
         */
        is_enabled?:    boolean;
        legal_profile?: LegalProfile;
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
        allowed_origins?:  any[];
        area_enabled?:     AreaEnabled[];
        display_settings?: DisplaySettings;
        /**
         * Disables the object when set to `false`.
         */
        is_enabled?:    boolean;
        legal_profile?: LegalProfile;
        /**
         * Has the value true if the object exists in live mode or the value false if the object
         * exists in test mode
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

    /**
     * A read-only view of a (business) account. Used to return objects required by the provider
     * integrations. Includes vidual assets, language and security settings.
     */
    export interface AccountView {
        /**
         * Allowed callback domains. Used by integration to filter allowed callbacks.
         */
        allowed_origins?:  any[];
        area_enabled?:     AreaEnabled[];
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
     * Authentication (Bearer) Token.
     */
    export interface AuthToken {
        /**
         * Bearer token. Expires 30 minutes after issue.
         */
        auth_token: string;
    }

    export interface Consumption {
        data?:   DatumElement[];
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
        description?:      string;
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
        description?:      string;
        hardware_profile?: HardwareProfile;
        /**
         * Disables the object when set to `false`.
         */
        is_enabled?: boolean;
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
        description?:      string;
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
         * FlatPeak account_id that initiated this event
         */
        account_id?: string;
        /**
         * Includes object that has been created, updated or deleted as per of this event.
         */
        data?: { [key: string]: any };
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
         * Descriptive name for the API key.
         */
        key_name?: string;
        /**
         * Has the value true if the API key is for live mode and false for test mode.
         */
        live_mode?: boolean;
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
        key_name?:   string;
        live_mode?:  boolean;
        secret_key?: boolean;
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
        devices?:      string[];
        geo_location?: number[];
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
        object:          string;
        postal_address?: PostalAddress;
        /**
         * A uniquie Id of associated Provider
         */
        provider_id:      string;
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
         * Set to true if tariff plan is connected to energy provider via online integration
         */
        integrated?: boolean;
        /**
         * Set to true if tariff plan is enabled
         */
        is_enabled?: boolean;
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
        object?:   string;
        password?: string;
        user?:     string;
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
        devices?:        string[];
        geo_location?:   number[];
        postal_address?: PostalAddress;
        /**
         * FlatPeak id of the associated Provider
         */
        provider_id:      string;
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
        devices?:         string[];
        geo_location?:    number[];
        postal_address?:  PostalAddress;
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
        currency_code?:    string;
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
         * Unique value used to sort providers when they are listed.
         */
        sort_order?: string;
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
        /**
         * Status of the integration e.g. Live
         */
        status?: string;
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
        currency_code:     string;
        display_settings?: DisplaySettings;
        /**
         * Access URLs for the Integration app.
         */
        integration_settings?: ProviderCreateIntegrationSettings;
        /**
         * Disables the object when set to `false`.
         */
        is_enabled: boolean;
        /**
         * Unique value used to sort providers when they are listed.
         */
        sort_order?: string;
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
        code_name?:        string;
        display_settings?: DisplaySettings;
        /**
         * Access URLs for the Integration app.
         */
        integration_settings?: ProviderUpdateIntegrationSettings;
        /**
         * Disables the object when set to `false`.
         */
        is_enabled?: boolean;
        /**
         * Unique value used to sort providers when they are listed.
         */
        sort_order?: string;
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
        export?: TariffExportRate[];
        /**
         * An array of tariff objects, grouped by time of tariff change
         */
        import?: TariffImportRate[];
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

    export interface TariffExportRate {
        /**
         * The rates (i.e. tariff, energy price) object
         */
        tariff?: TariffExportRateData;
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
    export interface TariffExportRateData {
        /**
         * Estimated confidence of data where '1' is 100% accurate and 0.1 is 10% accurate.
         */
        confidence?: number;
        /**
         * The rate value
         */
        cost?: number;
    }

    export interface TariffImportRate {
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
        tariff?: TariffImportRateData;
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
    export interface TariffImportRateData {
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
        export: TariffSchedule[];
        /**
         * Unique Tariff Plan Id.
         */
        id: string;
        /**
         * Import object, i.e. electricity provided by the grid to the supply point.
         */
        import: TariffSchedule[];
        /**
         * The Object name, i.e. tariff.
         */
        object: string;
        /**
         * Id of the Product object which plan relates to.
         */
        product_id: string;
        /**
         * Timestamp when the plan was created, in UTC. This value is automatically populated by API.
         */
        time_created: string;
        /**
         * Expiration time, in UTC.
         */
        time_expiry?: string;
        /**
         * The timezone of the plan, usually matches the Product timezone, in tz database format.
         */
        timezone?: string;
    }

    /**
     * This object represents a `weekday` tariff model. I.e. a tariff that varies by season &
     * day of the week.
     */
    export interface TariffSchedule {
        data?: TariffScheduleDatum[];
        /**
         * Tariff type. i.e. `weekday`.
         */
        type?: string;
    }

    export interface TariffScheduleDatum {
        /**
         * An array of days of the month tariff applies, possible values: 1...31 (for all days of of
         * the month). For all days omit the entire parameter.
         */
        dates?:          number[];
        days_and_hours?: TariffDaysAndHours[];
        /**
         * An array of months when tariff applies, possible values: Jan-Dec, All (for all months of
         * the year).
         */
        months?: string[];
    }

    export interface TariffDaysAndHours {
        /**
         * An array of days of the week when tariff applies, possible values: Mon-Sun,
         * Weekday-Weekend (the first day of the week will be determined from country code), All
         * (for all days of the week).
         */
        days?: string[];
        /**
         * A time period in hours, minutes and seconds.
         */
        hours?: TariffHour[];
    }

    export interface TariffHour {
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
     * This object represents a user of the FlatPeak API.
     */
    export interface User {
        /**
         * List of accounts this user has access to.
         */
        accounts?: UserAccount[];
        /**
         * Default FlatPeak Account ID for this user.
         */
        default_account_id?: string;
        /**
         * Email address of the user.
         */
        email?: string;
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
         * Name of the user.
         */
        name?: string;
        /**
         * Represents the object's type.
         */
        object?: string;
        /**
         * Phone number of the user.
         */
        phone?: number;
        /**
         * User ID of the user in the external user management system (Auth0).
         */
        reference_id?: string;
        /**
         * Time when the object was created, in UTC.
         */
        time_created?: string;
    }

    export interface UserAccount {
        /**
         * FlatPeak Account ID.
         */
        account_id?: string;
        /**
         * List of roles this user has access to for this account.
         */
        roles?: string[];
        /**
         * Status of the user for this account. One of either active, invited or inactive.
         */
        status?: string;
    }

    export interface UserCreate {
        /**
         * List of FlatPeak accounts this user has access to.
         */
        accounts?: UserCreateAccount[];
        /**
         * Default FlatPeak Account ID for this user.
         */
        default_account_id?: string;
        /**
         * Email address of the user.
         */
        email: string;
        /**
         * Full Name of the user.
         */
        name?: string;
        /**
         * Phone number of the user, in international format,i.e. 441234567890
         */
        phone?: number;
        /**
         * User ID of the user in the external user management system (Auth0).
         */
        reference_id: string;
    }

    export interface UserCreateAccount {
        /**
         * FlatPeak Account ID
         */
        account_id: string;
        /**
         * List of roles the user has access to for this account.
         */
        roles: string[];
        /**
         * Status of the user for this account. One of either active, invited or inactive.
         */
        status: string;
    }

    export interface UserUpdate {
        /**
         * List of FlatPeak accounts this user has access to.
         */
        accounts?: UserUpdateAccount[];
        /**
         * Default FlatPeak Account ID for this user.
         */
        default_account_id?: string;
        /**
         * Email address of the user.
         */
        email?: string;
        /**
         * Full Name of the user.
         */
        name?: string;
        /**
         * Phone number of the user, in international format,i.e. 441234567890
         */
        phone?: number;
        /**
         * User ID of the user in the external user management system (Auth0).
         */
        reference_id?: string;
    }

    export interface UserUpdateAccount {
        /**
         * FlatPeak Account ID.
         */
        account_id?: string;
        /**
         * List of roles the user has access to for this account.
         */
        roles?: string[];
        /**
         * Status of the user for this account. One of either active, invited or inactive.
         */
        status?: string;
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