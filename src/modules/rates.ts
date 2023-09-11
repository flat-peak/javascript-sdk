import { FlatpeakModule } from "./flatpeak-module";
import { FailureResponse, Rate } from "../types";

export class RatesModule extends FlatpeakModule {
  protected moduleId: string = "rates";

  /**
   * Get rates (i.e. cost of energy) for a Device.
   *
   * Specifying no `rates_type` parameter will return a tariff. You can add `carbon` and `grid` to request carbon and grid datasets respectively. If no carbon and/or grid data is available, then they will not be included in the response.
   *
   * Learn more here: https://docs.flatpeak.energy/docs/rates-api
   *
   * @param {string} id - FlatPeak unique device id
   *
   * @param {Object} query
   * @param {number} [query.rates_period] - Time in minutes for when rate and other tariff info is required. Can be positive (i.e. time forward) or negative (i.e. historic data). Cannot be used with `rates_from` and `rates_to`
   * @param {string} [query.rates_type] - Possible values are `carbon`, `grid`, `tariff`. Multiple values are supported e.g. `tariff,carbon`
   * @param {string} [query.rates_from] - From parameter for requesting rates in RFC3339 format e.g. 2023-06-15T09:00:00Z. Cannot be used with `rates_period`
   * @param {string} [query.rates_to] - To parameter for requesting rates in RFC3339 format e.g. 2023-06-15T09:00:00Z. Cannot be used with `rates_period`
   * @param {string} [query.product_id] - Optional FlatPeak `product_id` to limit response to a specific Product, when the device is related to multiple Products. Refer to https://docs.flatpeak.energy/docs/working-with-devices to learn how Products and Devices may be related.
   *
   * @return {Promise<Rate | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.rates.retrieve("dev_607c124e99c1401ca7fc3a5ca5ff9501", {rates_period: 1000});
   *
   *     console.log(output);
   *     {
   *       "id": "rts_461e765fea3a46349719876d6cd77c5c",
   *       "object": "rate",
   *       "live_mode": true,
   *       "device_id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "products": [
   *         {
   *           "product_id": "prd_24f2ceed33ec4ff39165e7b5b117df0b",
   *           "last_updated": "2022-05-24T14:15:22Z",
   *           "next_update": "2022-05-24T15:15:22Z",
   *           "import": [
   *             {
   *               "valid_from": "2022-12-28T01:00:00Z",
   *               "valid_to": "2022-12-28T02:30:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 42,
   *                 "relative": 0.1,
   *                 "confidence": 0.9
   *               },
   *               "grid": {
   *                 "load": 0.2,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T02:30:00Z",
   *               "valid_to": "2022-12-28T04:00:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 80,
   *                 "relative": 0.6,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.3,
   *                 "confidence": 0.6
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T04:00:00Z",
   *               "valid_to": "2022-12-28T04:30:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 127,
   *                 "relative": 0.98,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.6,
   *                 "confidence": 0.9
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T04:30:00Z",
   *               "valid_to": "2022-12-28T07:00:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 107,
   *                 "relative": 0.9,
   *                 "confidence": 0.8
   *               },
   *               "grid": {
   *                 "load": 0.7,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T07:00:00Z",
   *               "valid_to": "2022-12-28T10:30:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 98,
   *                 "relative": 0.7,
   *                 "confidence": 0.8
   *               },
   *               "grid": {
   *                 "load": 0.75,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T10:30:00Z",
   *               "valid_to": "2022-12-28T19:00:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 90,
   *                 "relative": 0.6,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.66,
   *                 "confidence": 0.8
   *               }
   *             }
   *           ],
   *           "export": [
   *             {
   *               "valid_from": "2022-12-28T04:30:00Z",
   *               "valid_to": "2022-05-06T00:30:00Z",
   *               "tariff": {
   *                 "cost": 15.897,
   *                 "confidence": 1
   *               }
   *             }
   *           ]
   *         }
   *       ],
   *       "time_created": "2022-05-24T15:15:22Z"
   *     }
   */
  retrieveForDevice(
    id: string,
    query: {
      rates_period?: number;
      rates_type?: string;
      rates_from?: string;
      rates_to?: string;
      product_id?: string;
    } = {},
  ): Promise<Rate | FailureResponse> {
    return this.processRequest(
      this.performPublicRequest(
        `${this.host}/rates/device/${id}?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${Buffer.from(`${id}:`).toString("base64")}`,
          },
          method: "GET",
        },
      ),
    );
  }

  /**
   * Get rates (i.e. cost of energy) for a Product.
   *
   * Specifying no `rates_type` parameter will return a tariff. You can add `carbon` and `grid` to request carbon and grid datasets respectively. If no carbon and/or grid data is available, then they will not be included in the response.
   *
   * Learn more here: https://docs.flatpeak.energy/docs/rates-api
   *
   * @param {string} id - FlatPeak unique product id
   *
   * @param {Object} query
   * @param {number} [query.rates_period] - Time in minutes for when rate and other tariff info is required. Can be positive (i.e. time forward) or negative (i.e. historic data). Cannot be used with `rates_from` and `rates_to`
   * @param {string} [query.rates_type] - Possible values are `carbon`, `grid`, `tariff`. Multiple values are supported e.g. `tariff,carbon`
   * @param {string} [query.rates_from] - From parameter for requesting rates in RFC3339 format e.g. 2023-06-15T09:00:00Z. Cannot be used with `rates_period`
   * @param {string} [query.rates_to] - To parameter for requesting rates in RFC3339 format e.g. 2023-06-15T09:00:00Z. Cannot be used with `rates_period`
   *
   * @return {Promise<Rate | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.rates.retrieveForProduct("prd_24f2ceed33ec4ff39165e7b5b117df0b", {rates_period: 1000});
   *
   *     console.log(output);
   *     {
   *       "id": "rts_461e765fea3a46349719876d6cd77c5c",
   *       "object": "rate",
   *       "live_mode": true,
   *       "device_id": "dev_607c124e99c1401ca7fc3a5ca5ff9501",
   *       "products": [
   *         {
   *           "product_id": "prd_24f2ceed33ec4ff39165e7b5b117df0b",
   *           "last_updated": "2022-05-24T14:15:22Z",
   *           "next_update": "2022-05-24T15:15:22Z",
   *           "import": [
   *             {
   *               "valid_from": "2022-12-28T01:00:00Z",
   *               "valid_to": "2022-12-28T02:30:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 42,
   *                 "relative": 0.1,
   *                 "confidence": 0.9
   *               },
   *               "grid": {
   *                 "load": 0.2,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T02:30:00Z",
   *               "valid_to": "2022-12-28T04:00:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 80,
   *                 "relative": 0.6,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.3,
   *                 "confidence": 0.6
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T04:00:00Z",
   *               "valid_to": "2022-12-28T04:30:00Z",
   *               "tariff": {
   *                 "cost": 4.998,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 127,
   *                 "relative": 0.98,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.6,
   *                 "confidence": 0.9
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T04:30:00Z",
   *               "valid_to": "2022-12-28T07:00:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 107,
   *                 "relative": 0.9,
   *                 "confidence": 0.8
   *               },
   *               "grid": {
   *                 "load": 0.7,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T07:00:00Z",
   *               "valid_to": "2022-12-28T10:30:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 98,
   *                 "relative": 0.7,
   *                 "confidence": 0.8
   *               },
   *               "grid": {
   *                 "load": 0.75,
   *                 "confidence": 0.8
   *               }
   *             },
   *             {
   *               "valid_from": "2022-12-28T10:30:00Z",
   *               "valid_to": "2022-12-28T19:00:00Z",
   *               "tariff": {
   *                 "cost": 44.003,
   *                 "confidence": 1
   *               },
   *               "carbon": {
   *                 "intensity": 90,
   *                 "relative": 0.6,
   *                 "confidence": 0.7
   *               },
   *               "grid": {
   *                 "load": 0.66,
   *                 "confidence": 0.8
   *               }
   *             }
   *           ],
   *           "export": [
   *             {
   *               "valid_from": "2022-12-28T04:30:00Z",
   *               "valid_to": "2022-05-06T00:30:00Z",
   *               "tariff": {
   *                 "cost": 15.897,
   *                 "confidence": 1
   *               }
   *             }
   *           ]
   *         }
   *       ],
   *       "time_created": "2022-05-24T15:15:22Z"
   *     }
   */
  retrieveForProduct(
    id: string,
    query: {
      rates_period?: number;
      rates_type?: string;
      rates_from?: string;
      rates_to?: string;
    } = {},
  ): Promise<Rate | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/rates/product/${id}?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
        "Bearer",
      ),
    );
  }
}
