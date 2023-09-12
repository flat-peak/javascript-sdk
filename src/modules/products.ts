import { FlatpeakModule } from "./flatpeak-module";
import {
  Consumption,
  FailureResponse,
  ListResponse,
  Product,
  ProductCreate,
  ProductPull,
  ProductUpdate,
} from "../types";

export class ProductsModule extends FlatpeakModule {
  protected moduleId: string = "products";

  /**
   * Returns a list of all Products.
   *
   * Products hold energy provider tariff objects in their native and FlatPeak format. They may be created when accessing customer's energy provider account or can store tariff configuration created by customers manually via tariff rates configuration interface.
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.reference_id] - Object identifier from third-party system
   * @param {string} [query.customer_id] - FlatPeak unique customer_id
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {number} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {boolean} [query.is_disabled] - Set to 'true' to include disabled objects
   * @param {string} [query.failed_attempts] - Over how many times fetching the tariff has failed
   *
   * @return {Promise<ListResponse<Product> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.products.list(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/products",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *           "object": "product",
   *           "live_mode": true,
   *           "is_disabled": false,
   *           "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *           "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *           "timezone": "Europe/Berlin",
   *           "postal_address": {
   *             "address_line1": "221b Baker St",
   *             "address_line2": "",
   *             "city": "London",
   *             "state": "",
   *             "post_code": "NW16XE",
   *             "country_code": "GB"
   *           },
   *           "geo_location": [
   *             -77.52907766250239,
   *             167.1522246611749
   *           ],
   *           "tariff_settings": {
   *             "is_disabled": false,
   *             "integrated": true,
   *             "reference_id": "A1234567890",
   *             "tariff_id": "trf_32acd4e16e914646ae94bd872aa8d9d3",
   *             "auth_metadata_id": "aum_64a9526c6809132802a1ad15",
   *             "last_update_time": 1654603424,
   *             "next_update_time": 1654693424,
   *             "failed_attempts": 0
   *           },
   *           "devices": [
   *             "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *             "dev_458dc1492183456696fa3e42ab246a1e",
   *             "dev_fe23b2eeec81413bb305e676a7e63558"
   *           ],
   *           "time_created": "2022-01-24T14:15:22Z",
   *           "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *           "is_deleted": false
   *         }
   *       ]
   *     }
   */
  list(
    query: {
      account_id?: string;
      reference_id?: string;
      customer_id?: string;
      starting_after?: string;
      limit?: number;
      ending_before?: string;
      is_disabled?: boolean;
      failed_attempts?: string;
    } = {},
  ): Promise<ListResponse<Product> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/products?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
        "Bearer",
      ),
    );
  }

  /**
   * Create a product.
   *
   * Product is a FlatPeak identifier of supply address is where energy is being consumed (or exported) under the contract between the provider (supplier) and customer (consumer of energy). They link to Customer and hold references to Tariff and Devices.
   *
   * Note: `auth_metadata` property will not be returned back in the Response. This is to protect its potentially sensitive content. Instead `auth_metadata_id` will be returned. If you need to access `auth_metadata` for debugging, contact support.
   *
   * @param {ProductCreate} body - Creates a Product
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<Product | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.products.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *       "object": "product",
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *       "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *       "timezone": "Europe/Berlin",
   *       "postal_address": {
   *         "address_line1": "221b Baker St",
   *         "address_line2": "",
   *         "city": "London",
   *         "state": "",
   *         "post_code": "NW16XE",
   *         "country_code": "GB"
   *       },
   *       "geo_location": [
   *         -77.52907766250239,
   *         167.1522246611749
   *       ],
   *       "tariff_settings": {
   *         "auth_metadata_id": "aum_6499d99e0c63830a644d08eb",
   *         "is_disabled": false,
   *         "integrated": true,
   *         "reference_id": "A1234567890",
   *         "tariff_id": "trf_31acd4e16e914646ae94bd872aa8d9d2",
   *         "last_update_time": 1654603424,
   *         "next_update_time": 1654693424,
   *         "failed_attempts": 0,
   *         "auth_metadata": {}
   *       },
   *       "devices": [
   *         "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *         "dev_458dc1492183456696fa3e42ab246a1e",
   *         "dev_fe23b2eeec81413bb305e676a7e63558"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *       "is_deleted": false
   *     }
   */
  create(
    body: ProductCreate,
    query: { account_id?: string } = {},
  ): Promise<Product | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/products?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
      ),
    );
  }

  /**
   * Initiate fetching tariff update for products. This will get FlatPeak backend systems to download tariff updates from snsergy supplier accounts. Specify either `reference_ids` OR `product_ids` but **not both**.
   *
   * @param {ProductPull} body - Initiate pulling updates for a product via the Integration
   *
   * @return {Promise<{action: string, product_ids: Array<string>, reference_ids: Array<string>}>}
   *
   * @example
   *     const output = await flatpeak.products.pullProducts(body);
   *
   *     console.log(output);
   *     {
   *       "action": "pull_tariff",
   *       "product_ids": [
   *         "prd_049b521cf562499e8dfd274f5f3fe9a8",
   *         "prd_36b08c329855438a812e7d1c29a38929",
   *         "prd_3a8d524a7493442eb6e4c1aac4287606"
   *       ],
   *       "reference_ids": [
   *         "ABC1234567890",
   *         "ECQ987654321"
   *       ]
   *     }
   */
  pull(
    providerId: string,
    body: ProductPull,
  ): Promise<{
    action: string;
    product_ids: Array<string>;
    reference_ids: Array<string>;
  }> {
    return this.processRequest(
      this.performPublicRequest(`${this.host}/products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`${providerId}:`).toString(
            "base64",
          )}`,
        },
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    );
  }

  /**
   * Retrieve a product
   *
   * @param {string} id - unique FlatPeak product identifier
   *
   * @return {Promise<Product | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.products.retrieve("prd_d47751032d2748d2bce8ec55b2006def");
   *
   *     console.log(output);
   *     {
   *       "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *       "object": "product",
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *       "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *       "timezone": "Europe/Berlin",
   *       "postal_address": {
   *         "address_line1": "221b Baker St",
   *         "address_line2": "",
   *         "city": "London",
   *         "state": "",
   *         "post_code": "NW16XE",
   *         "country_code": "GB"
   *       },
   *       "geo_location": [
   *         -77.52907766250239,
   *         167.1522246611749
   *       ],
   *       "tariff_settings": {
   *         "auth_metadata_id": "aum_6499d99e0c63830a644d08eb",
   *         "is_disabled": false,
   *         "integrated": true,
   *         "reference_id": "A1234567890",
   *         "tariff_id": "trf_31acd4e16e914646ae94bd872aa8d9d2",
   *         "last_update_time": 1654603424,
   *         "next_update_time": 1654693424,
   *         "failed_attempts": 0,
   *         "auth_metadata": {}
   *       },
   *       "devices": [
   *         "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *         "dev_458dc1492183456696fa3e42ab246a1e",
   *         "dev_fe23b2eeec81413bb305e676a7e63558"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *       "is_deleted": false
   *     }
   */
  retrieve(id: string): Promise<Product | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/products/${id}`, {
        method: "GET",
      }),
    );
  }

  /**
   * Delete a product.
   *
   * This action cannot be undone.
   *
   * @param {string} id - unique FlatPeak product identifier
   *
   * @return {Promise<void | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.products.delete("prd_d47751032d2748d2bce8ec55b2006def");
   */
  delete(id: string): Promise<void | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/products/${id}`,
        {
          method: "DELETE",
        },
        "Bearer",
      ),
    );
  }

  /**
   * Update a product.
   *
   * Note: `auth_metadata` property will not be returned back in the Response. This is to protect its potentially sensetive content. Instead the `auth_metadata_id` will be returned. If you need to access `auth_metadata` for debugging, contact support.
   *
   * @param {string} id - unique FlatPeak product identifier
   *
   * @param {ProductUpdate} body - undefined
   *
   * @return {Promise<Product | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.products.update("prd_d47751032d2748d2bce8ec55b2006def", body);
   *
   *     console.log(output);
   *     {
   *       "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *       "object": "product",
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *       "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *       "timezone": "Europe/Berlin",
   *       "postal_address": {
   *         "address_line1": "221b Baker St",
   *         "address_line2": "",
   *         "city": "London",
   *         "state": "",
   *         "post_code": "NW16XE",
   *         "country_code": "GB"
   *       },
   *       "geo_location": [
   *         -77.52907766250239,
   *         167.1522246611749
   *       ],
   *       "tariff_settings": {
   *         "auth_metadata_id": "aum_6499d99e0c63830a644d08eb",
   *         "is_disabled": false,
   *         "integrated": true,
   *         "reference_id": "A1234567890",
   *         "tariff_id": "trf_31acd4e16e914646ae94bd872aa8d9d2",
   *         "last_update_time": 1654603424,
   *         "next_update_time": 1654693424,
   *         "failed_attempts": 0,
   *         "auth_metadata": {}
   *       },
   *       "devices": [
   *         "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *         "dev_458dc1492183456696fa3e42ab246a1e",
   *         "dev_fe23b2eeec81413bb305e676a7e63558"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *       "is_deleted": false
   *     }
   */
  update(id: string, body: ProductUpdate): Promise<Product | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/products/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    );
  }

  /**
   * Submit energy consumption metering for a product
   *
   * @param {string} id - unique FlatPeak product identifier
   *
   * @param {Consumption} body - undefined
   *
   * @return {Promise<{powered: boolean, consumption: number, peak: number, avg: number, low: number, interval_start: string, interval_end: string}>}
   *
   * @example
   *     const output = await flatpeak.products.meterProduct("prd_d47751032d2748d2bce8ec55b2006def", body);
   *
   *     console.log(output);
   *     {
   *       "id": "evt_b6e31325b57d4fb79917be19afeb1fc4",
   *       "object": "event",
   *       "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *       "live_mode": true,
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "type": "product.create",
   *       "data": {
   *         "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *         "object": "product",
   *         "live_mode": true,
   *         "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *         "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *         "timezone": "Europe/Berlin",
   *         "postal_address": {
   *           "address_line1": "221b Baker St",
   *           "address_line2": "",
   *           "city": "London",
   *           "state": "",
   *           "post_code": "NW16XE",
   *           "country_code": "GB"
   *         },
   *         "geo_location": [
   *           -77.52907766250239,
   *           167.1522246611749
   *         ],
   *         "tariff_settings": {
   *           "display_name": "Flexible EnergyM",
   *           "is_disabled": false,
   *           "integrated": true,
   *           "reference_id": "A1234567890",
   *           "tariff_id": "trf_36acd4e16e914646ae94bd872aa8d9d4",
   *           "next_update_time": 1654693424,
   *           "auth_metadata": {}
   *         },
   *         "devices": [
   *           "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *           "dev_458dc1492183456696fa3e42ab246a1e",
   *           "dev_fe23b2eeec81413bb305e676a7e63558"
   *         ],
   *         "time_created": "2022-01-24T14:15:22Z",
   *         "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *         "is_deleted": false
   *       }
   *     }
   */
  meterProduct(
    id: string,
    body: Consumption,
  ): Promise<{
    powered: boolean;
    consumption: number;
    peak: number;
    avg: number;
    low: number;
    interval_start: string;
    interval_end: string;
  }> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    );
  }
}
