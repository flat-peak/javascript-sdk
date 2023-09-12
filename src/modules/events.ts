import { FlatpeakModule } from "./flatpeak-module";
import { FailureResponse } from "../types";

export class EventsModule extends FlatpeakModule {
  protected moduleId: string = "events";

  /**
   * List events, going back up to 30 days.
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.event_type] - Type of event.
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {number} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   *
   * @return {Promise<Event | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.events.retrieve(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/events",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "evt_b6e31325b57d4fb79917be19afeb1fc4",
   *           "object": "event",
   *           "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *           "live_mode": true,
   *           "time_created": "2022-01-24T14:15:22Z",
   *           "type": "product.create",
   *           "data": {
   *             "id": "prd_4dc28d219ced4c63b6cfbd192bbb9b49",
   *             "object": "product",
   *             "live_mode": true,
   *             "customer_id": "cus_597d622c073e489487071035c35eb50c",
   *             "provider_id": "prv_5cb31f2f90eb48ec95d413bea1f0f606",
   *             "timezone": "Europe/Berlin",
   *             "postal_address": {
   *               "address_line1": "221b Baker St",
   *               "address_line2": "",
   *               "city": "London",
   *               "state": "",
   *               "post_code": "NW16XE",
   *               "country_code": "GB"
   *             },
   *             "geo_location": [
   *               -77.52907766250239,
   *               167.1522246611749
   *             ],
   *             "tariff_settings": {
   *               "display_name": "Flexible EnergyM",
   *               "is_disabled": false,
   *               "integrated": true,
   *               "reference_id": "A1234567890",
   *               "tariff_id": "trf_38acd4e16e914646ae94bd872aa8d9d8",
   *               "next_update_time": 1654693424,
   *               "auth_metadata": {}
   *             },
   *             "devices": [
   *               "dev_021ff68976894b73b62ec1d71cd6bb7b",
   *               "dev_458dc1492183456696fa3e42ab246a1e",
   *               "dev_fe23b2eeec81413bb305e676a7e63558"
   *             ],
   *             "time_created": "2022-01-24T14:15:22Z",
   *             "account_id": "acc_5fd7baf8e36241239ed9950cc0c436ba",
   *             "is_deleted": false
   *           }
   *         }
   *       ]
   *     }
   */
  list(
    query: {
      account_id?: string;
      event_type?: string;
      starting_after?: string;
      ending_before?: string;
      limit?: number;
    } = {},
  ): Promise<Event | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/events?${new URLSearchParams(
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
   * Retrieves the details of an event. Supply the unique identifier of the event, which you might have received in a webhook.
   *
   * @param {string} id - unique FlatPeak event identifier
   *
   * @return {Promise<Event | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.events.retrieve("evt_3e82b87128ad42c0a352a7305219bfa2");
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
  retrieve(id: string): Promise<Event | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/events/${id}`,
        {
          method: "GET",
        },
        "Bearer",
      ),
    );
  }
}
