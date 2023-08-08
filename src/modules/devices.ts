import { FlatpeakModule } from "./flatpeak-module";
import {
  FailureResponse,
  ListResponse,
  Consumption,
  Device,
  DeviceCreate,
  DeviceUpdate,
} from "../types";

export class DevicesModule extends FlatpeakModule {
  protected moduleId: string = "devices";

  /**
   * List all devices in the account
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.reference_id] - Object identifier from third-party system
   * @param {string} [query.mac] - Dash-separated MAC address
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {string} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {boolean} [query.is_disabled] - Set to 'true' to include disabled objects
   *
   * @return {Promise<ListResponse<Device> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.devices.list(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/devices",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *           "object": "device",
   *           "mac": "00-00-5e-00-53-af",
   *           "reference_id": "6c5b6505-4a15-4183-ae91-2204a3b73456",
   *           "description": "Kitchen Fridge Freezer",
   *           "is_disabled": false,
   *           "last_seen": "2022-03-22T11:12:21Z",
   *           "hardware_profile": {
   *             "make": "Samsung",
   *             "type": "Fridge",
   *             "model": "SRVQ1342",
   *             "wattage_in": "3000",
   *             "wattage_out": "0"
   *           },
   *           "products": [
   *             "prd_65bb076f362848378137f055139becb1"
   *           ],
   *           "time_created": "2022-01-24T14:15:22Z",
   *           "is_deleted": false
   *         }
   *       ]
   *     }
   */
  list(query: {
    account_id?: string;
    reference_id?: string;
    mac?: string;
    ending_before?: string;
    limit?: string;
    starting_after?: string;
    is_disabled?: boolean;
  }): Promise<ListResponse<Device> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/devices?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
      ),
    );
  }

  /**
   * Create a device
   *
   * **Note**: API will return an error if you are trying to create a Device with a MAC address which is already assigned to a different Customer. If this happens, find and delete the Device with that MAC first. If you are unable to find the Device it must be in a different Account - contact Support.
   *
   * @param {DeviceCreate} body - Creates a device
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<Device | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.devices.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "object": "device",
   *       "mac": "00-00-5e-00-53-af",
   *       "reference_id": "6c5b6505-4a15-4183-ae91-2204a3b73456",
   *       "description": "Kitchen Fridge Freezer",
   *       "last_seen": "2022-03-22T11:12:21Z",
   *       "hardware_profile": {
   *         "make": "Samsung",
   *         "type": "Fridge",
   *         "model": "SRVQ1342",
   *         "wattage_in": "3000",
   *         "wattage_out": "0"
   *       },
   *       "products": [
   *         "prd_65bb076f362848378137f055139becb1"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  create(
    body: DeviceCreate,
    query: { account_id?: string } = {},
  ): Promise<Device | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/devices?${new URLSearchParams(
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
   * This method checks if a MAC address can be assigned to a new Device.
   *
   * - Provide no parameters to the request to find if a MAC can be assigned to a new Device that is connected to any Product.
   *
   * - Add the `customer_id` parameter to find if a MAC can be assigned to a new Device that is connected to a Product that is connected to a specific Customer.
   *
   * If you provide a MAC address that you know is not yet registered with any of the Customers in your Account but still get an error, then it must be registered with another FlatPeak Account. If this happens, note the device MAC, raise an error to the user and contact FlatPeak support.
   *
   * For more information on how to work with Devices, review this guide: https://docs.flatpeak.energy/docs/objects-device
   *
   * @param {Object} query
   * @param {string} query.mac - Dash-separated MAC address
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.customer_id] - FlatPeak unique customer_id
   *
   * @return {Promise<{device_id: string, usable: boolean}>}
   *
   * @example
   *     const output = await flatpeak.devices.checkDeviceMac(query);
   *
   *     console.log(output);
   *     {
   *       "device_id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "usable": true
   *     }
   */
  checkDeviceMac(query: {
    mac: string;
    account_id?: string;
    customer_id?: string;
  }): Promise<{ device_id: string; usable: boolean }> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/devices?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "PUT",
        },
      ),
    );
  }

  /**
   * Get device information by id.
   *
   * Note only tariff object is retured when request is made using device key authentication.
   *
   * @param {string} id - unique FlatPeak device identifier
   *
   * @return {Promise<Device | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.devices.retrieve("dev_607c124e99c1401ca7fc3a5ca5ff9501");
   *
   *     console.log(output);
   *     {
   *       "id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "object": "device",
   *       "mac": "00-00-5e-00-53-af",
   *       "reference_id": "6c5b6505-4a15-4183-ae91-2204a3b73456",
   *       "description": "Kitchen Fridge Freezer",
   *       "last_seen": "2022-03-22T11:12:21Z",
   *       "hardware_profile": {
   *         "make": "Samsung",
   *         "type": "Fridge",
   *         "model": "SRVQ1342",
   *         "wattage_in": "3000",
   *         "wattage_out": "0"
   *       },
   *       "products": [
   *         "prd_65bb076f362848378137f055139becb1"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  retrieve(id: string): Promise<Device | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/devices/${id}`, {
        method: "GET",
      }),
    );
  }

  /**
   * Delete a device. This operation cannot be undone.
   *
   * @param {string} id - unique FlatPeak device identifier
   *
   * @return {Promise<void | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.devices.delete("dev_");
   */
  delete(id: string): Promise<void | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/devices/${id}`, {
        method: "DELETE",
      }),
    );
  }

  /**
   * Updates the specified device. Any parameters that have not been provided will be left unchanged.
   *
   * @param {string} id - unique FlatPeak device identifier
   *
   * @param {DeviceUpdate} body - Updates a Device
   *
   * @return {Promise<Device | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.devices.update("dev_607c124e99c1401ca7fc3a5ca5ff9501", body);
   *
   *     console.log(output);
   *     {
   *       "id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "object": "device",
   *       "mac": "00-00-5e-00-53-af",
   *       "reference_id": "6c5b6505-4a15-4183-ae91-2204a3b73456",
   *       "description": "Kitchen Fridge Freezer",
   *       "last_seen": "2022-03-22T11:12:21Z",
   *       "hardware_profile": {
   *         "make": "Samsung",
   *         "type": "Fridge",
   *         "model": "SRVQ1342",
   *         "wattage_in": "3000",
   *         "wattage_out": "0"
   *       },
   *       "products": [
   *         "prd_65bb076f362848378137f055139becb1"
   *       ],
   *       "time_created": "2022-01-24T14:15:22Z",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  update(id: string, body: DeviceUpdate): Promise<Device | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/devices/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    );
  }

  /**
   * Submit consumption metering for a device.
   *
   * Note: calls are dynamically rate-limited per device, related product, customer and account. An error 429 (too many requests) is returned on rate-limiting events. Contact support for more information.
   *
   * @param {string} id - unique FlatPeak device identifier
   *
   * @param {Consumption} body - undefined
   *
   * @return {Promise<{powered: boolean, consumption: number, peak: number, avg: number, low: number, interval_start: string, interval_end: string}>}
   *
   * @example
   *     const output = await flatpeak.devices.meterDevice("dev_607c124e99c1401ca7fc3a5ca5ff9501", body);
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
   *         "timezone": "Europe/Tallinn",
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
  meterDevice(
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
      this.performSignedRequest(`${this.host}/devices/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    );
  }
}
