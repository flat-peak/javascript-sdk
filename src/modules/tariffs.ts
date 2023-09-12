import { FlatpeakModule } from "./flatpeak-module";
import { FailureResponse, ListResponse, Tariff, TariffCreate } from "../types";

export class TariffsModule extends FlatpeakModule {
  protected moduleId: string = "tariffs";

  /**
   * List all tariffs.
   *
   * In FlatPeak, `tariff` is a transactional object that captures the tariff at a supply address at the time when it was fetched by FlatPeak from the Customers' account with their energy Provider (supplier).
   *
   * The Tariff object does not represent the complete set of information that is required to know the cost of energy at a supply address at any given time.
   *
   * This object is made available to you for troubleshooting purposes. **Do not utilise it to calculate the cost of energy information in your live systems;  Use the RatesAPI instead**.
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {number} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   *
   * @return {Promise<ListResponse<Tariff> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.tariffs.list(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/tariffs",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "trf_352cd4e16e914646ae94bd872aa8d9d6",
   *           "object": "tariff",
   *           "display_name": "Flexible Antarctic",
   *           "product_id": "prd_1cb8a15d901743129b8a5d2fa394a3dc",
   *           "integrated": true,
   *           "source": "ANTARCTIC_ENERGY_AQ",
   *           "timezone": "Europe/Berlin",
   *           "time_created": "2021-05-05T05:37:27Z",
   *           "time_expiry": "2021-12-05T05:37:27Z",
   *           "import": [
   *             {
   *               "type": "weekday",
   *               "data": [
   *                 {
   *                   "months": [
   *                     "Jan",
   *                     "Feb",
   *                     "Mar"
   *                   ],
   *                   "days_and_hours": [
   *                     {
   *                       "days": [
   *                         "Mon",
   *                         "Tue",
   *                         "Wed",
   *                         "Thu",
   *                         "Fri"
   *                       ],
   *                       "hours": [
   *                         {
   *                           "valid_from": "00:00:00",
   *                           "valid_to": "00:30:00",
   *                           "cost": 15.897
   *                         },
   *                         {
   *                           "valid_from": "00:30:00",
   *                           "valid_to": "03:30:00",
   *                           "cost": 5
   *                         },
   *                         {
   *                           "valid_from": "03:30:00",
   *                           "valid_to": "00:00:00",
   *                           "cost": 11
   *                         }
   *                       ]
   *                     },
   *                     {
   *                       "days": [
   *                         "Sat",
   *                         "Sun"
   *                       ],
   *                       "hours": [
   *                         {
   *                           "valid_from": "00:00:00",
   *                           "valid_to": "00:30:00",
   *                           "cost": 15.897
   *                         },
   *                         {
   *                           "valid_from": "00:30:00",
   *                           "valid_to": "03:30:00",
   *                           "cost": 5
   *                         },
   *                         {
   *                           "valid_from": "03:30:00",
   *                           "valid_to": "00:00:00",
   *                           "cost": 11
   *                         }
   *                       ]
   *                     }
   *                   ]
   *                 },
   *                 {
   *                   "months": [
   *                     "All"
   *                   ],
   *                   "days_and_hours": [
   *                     {
   *                       "days": [
   *                         "Weekdays"
   *                       ],
   *                       "hours": [
   *                         {
   *                           "valid_from": "00:00:00",
   *                           "valid_to": "00:30:00",
   *                           "cost": 15.897
   *                         },
   *                         {
   *                           "valid_from": "00:30:00",
   *                           "valid_to": "03:30:00",
   *                           "cost": 5
   *                         },
   *                         {
   *                           "valid_from": "03:30:00",
   *                           "valid_to": "00:00:00",
   *                           "cost": 11
   *                         }
   *                       ]
   *                     },
   *                     {
   *                       "days": [
   *                         "Weekend"
   *                       ],
   *                       "hours": [
   *                         {
   *                           "valid_from": "00:00:00",
   *                           "valid_to": "00:30:00",
   *                           "cost": 15.897
   *                         },
   *                         {
   *                           "valid_from": "00:30:00",
   *                           "valid_to": "03:30:00",
   *                           "cost": 5
   *                         },
   *                         {
   *                           "valid_from": "03:30:00",
   *                           "valid_to": "00:00:00",
   *                           "cost": 11
   *                         }
   *                       ]
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ],
   *           "export": [
   *             {
   *               "type": "weekday",
   *               "data": [
   *                 {
   *                   "months": [
   *                     "All"
   *                   ],
   *                   "days_and_hours": [
   *                     {
   *                       "days": [
   *                         "All"
   *                       ],
   *                       "hours": [
   *                         {
   *                           "valid_from": "00:00:00",
   *                           "valid_to": "05:30:00",
   *                           "cost": 3.252
   *                         },
   *                         {
   *                           "valid_from": "05:30:00",
   *                           "valid_to": "00:00:00",
   *                           "cost": 6
   *                         }
   *                       ]
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ]
   *         }
   *       ]
   *     }
   */
  list(
    query: {
      account_id?: string;
      starting_after?: string;
      limit?: number;
      ending_before?: string;
    } = {},
  ): Promise<ListResponse<Tariff> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/tariffs?${new URLSearchParams(
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
   * Create a tariff
   *
   * In FlatPeak `tariff` is a transactional object that captures the tariff at a supply address at the time when it was fetched by FlatPeak from the Customers' account with their energy Provider (supplier).
   *
   * @param {TariffCreate} body - undefined
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<Tariff | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.tariffs.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "trf_351cd4e16e914646ae94bd872aa8d9d2",
   *       "object": "tariff",
   *       "display_name": "Flexible Antarctic",
   *       "product_id": "prd_1cb8a15d901743129b8a5d2fa394a3dc",
   *       "integrated": true,
   *       "source": "ANTARCTIC_ENERGY_AQ",
   *       "timezone": "Europe/Berlin",
   *       "time_created": "2021-05-05T05:37:27Z",
   *       "time_expiry": "2021-12-05T05:37:27Z",
   *       "import": [
   *         {
   *           "type": "weekday",
   *           "data": [
   *             {
   *               "months": [
   *                 "Jan",
   *                 "Feb",
   *                 "Mar"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "Mon",
   *                     "Tue",
   *                     "Wed",
   *                     "Thu",
   *                     "Fri"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 },
   *                 {
   *                   "days": [
   *                     "Sat",
   *                     "Sun"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 }
   *               ]
   *             },
   *             {
   *               "months": [
   *                 "All"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "Weekdays"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 },
   *                 {
   *                   "days": [
   *                     "Weekend"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ]
   *         }
   *       ],
   *       "export": [
   *         {
   *           "type": "weekday",
   *           "data": [
   *             {
   *               "months": [
   *                 "All"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "All"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "05:30:00",
   *                       "cost": 3.252
   *                     },
   *                     {
   *                       "valid_from": "05:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 6
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ]
   *         }
   *       ]
   *     }
   */
  create(
    body: TariffCreate,
    query: { account_id?: string } = {},
  ): Promise<Tariff | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/tariffs?${new URLSearchParams(
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
   * Retrieve a tariff
   *
   * In FlatPeak, `tariff` is a transactional object that captures the tariff at a supply address at the time when it was fetched by FlatPeak from the Customers' account with their energy Provider (supplier).
   *
   * The Tariff object does not represent the complete set of information that is required to know the cost of energy at a supply address at any given time.
   *
   * This object is made available to you for troubleshooting purposes. **Do not utilise it to calculate the cost of energy information in your live systems;  Use the RatesAPI instead**.
   *
   *
   * @param {string} id - unique FlatPeak tariff plan identifier
   *
   * @return {Promise<Tariff | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.tariffs.retrieve(id);
   *
   *     console.log(output);
   *     {
   *       "id": "trf_351cd4e16e914646ae94bd872aa8d9d2",
   *       "object": "tariff",
   *       "display_name": "Flexible Antarctic",
   *       "product_id": "prd_1cb8a15d901743129b8a5d2fa394a3dc",
   *       "integrated": true,
   *       "source": "ANTARCTIC_ENERGY_AQ",
   *       "timezone": "Europe/Berlin",
   *       "time_created": "2021-05-05T05:37:27Z",
   *       "time_expiry": "2021-12-05T05:37:27Z",
   *       "import": [
   *         {
   *           "type": "weekday",
   *           "data": [
   *             {
   *               "months": [
   *                 "Jan",
   *                 "Feb",
   *                 "Mar"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "Mon",
   *                     "Tue",
   *                     "Wed",
   *                     "Thu",
   *                     "Fri"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 },
   *                 {
   *                   "days": [
   *                     "Sat",
   *                     "Sun"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 }
   *               ]
   *             },
   *             {
   *               "months": [
   *                 "All"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "Weekdays"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 },
   *                 {
   *                   "days": [
   *                     "Weekend"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "00:30:00",
   *                       "cost": 15.897
   *                     },
   *                     {
   *                       "valid_from": "00:30:00",
   *                       "valid_to": "03:30:00",
   *                       "cost": 5
   *                     },
   *                     {
   *                       "valid_from": "03:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 11
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ]
   *         }
   *       ],
   *       "export": [
   *         {
   *           "type": "weekday",
   *           "data": [
   *             {
   *               "months": [
   *                 "All"
   *               ],
   *               "days_and_hours": [
   *                 {
   *                   "days": [
   *                     "All"
   *                   ],
   *                   "hours": [
   *                     {
   *                       "valid_from": "00:00:00",
   *                       "valid_to": "05:30:00",
   *                       "cost": 3.252
   *                     },
   *                     {
   *                       "valid_from": "05:30:00",
   *                       "valid_to": "00:00:00",
   *                       "cost": 6
   *                     }
   *                   ]
   *                 }
   *               ]
   *             }
   *           ]
   *         }
   *       ]
   *     }
   */
  retrieve(id: string): Promise<Tariff | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/tariffs/${id}`, {
        method: "GET",
      }),
    );
  }
}
