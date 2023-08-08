import { FlatpeakModule } from "./flatpeak-module";
import {
  Provider,
  ProviderCreate,
  ProviderUpdate,
  FailureResponse,
  ListResponse,
} from "../types";

export class ProvidersModule extends FlatpeakModule {
  protected moduleId: string = "providers";

  /**
   * List Energy Providers. Provide 'country_code' and, optionally, 'state' to get list of providers for a location.
   *
   * @param {Object} query
   * @param {string} [query.country_code] - ISO 3166-1 alpha-2 formatted country code
   * @param {string} [query.state] - Full state, region or locality name. For example 'California' or 'Scotland'
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {string} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {string} [query.keywords] - Specifies keywords for finding providers by name.
   *
   * @return {Promise<ListResponse<Provider> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.providers.list({keywords: "Antar", limit: 10});
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/providers",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "prv_3090a6232d754c9a8936272376989781",
   *           "object": "provider",
   *           "live_mode": false,
   *           "is_disabled": false,
   *           "code_name": "ANTARCTIC_ENERGY",
   *           "code_number": "000001",
   *           "config": {},
   *           "currency_code": "USD",
   *           "area_served": {
   *             "country_code": "AQ",
   *             "states": []
   *           },
   *           "display_settings": {
   *             "default_language": "EN",
   *             "language_assets": [
   *               {
   *                 "language_code": "EN",
   *                 "display_name": "Antarctic Energy",
   *                 "logo_url": "https://static.flatpeak.energy/assets/antarctic.png",
   *                 "support_url": "https://www.antarctic.energy/uk/support/",
   *                 "terms_url": "https://www.antarctic.energy/uk/terms/",
   *                 "privacy_url": "https://www.antarctic.energy/uk/privacy/"
   *               }
   *             ]
   *           },
   *           "integration_phase": 0,
   *           "integration_settings": {
   *             "onboard_url": "https://antarctic.connect.flatpeak.energy/headed",
   *             "api_url": "https://antarctic.connect.flatpeak.energy/api"
   *           },
   *           "time_created": "2022-01-24T14:15:22Z",
   *           "website_url": "https://www.antarctic.energy"
   *         }
   *       ]
   *     }
   */
  list(query: {
    country_code?: string;
    state?: string;
    ending_before?: string;
    limit?: string;
    starting_after?: string;
    keywords?: string;
  }): Promise<ListResponse<Provider> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/providers?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
      ),
    );
  }

  /**
   * Create an energy provider.
   *
   * @param {ProviderCreate} body - undefined
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<Provider | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.providers.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "prv_3090a6232d754c9a8936272376989781",
   *       "object": "provider",
   *       "live_mode": false,
   *       "is_disabled": false,
   *       "code_name": "ANTARCTIC_ENERGY",
   *       "code_number": "000001",
   *       "currency_code": "USD",
   *       "area_served": {
   *         "country_code": "AQ",
   *         "states": []
   *       },
   *       "display_settings": {
   *         "object": "display_settings",
   *         "default_language": "EN",
   *         "language_assets": [
   *           {
   *             "language_code": "EN",
   *             "display_name": "Antarctic Energy",
   *             "logo_url": "https://static.flatpeak.energy/assets/antarctic.png",
   *             "support_url": "https://www.antarctic.energy/uk/support/",
   *             "terms_url": "https://www.antarctic.energy/uk/terms/",
   *             "privacy_url": "https://www.antarctic.energy/uk/privacy/"
   *           }
   *         ]
   *       },
   *       "integration_phase": 0,
   *       "integration_settings": {
   *         "onboard_url": "https://antarctic.connect.flatpeak.energy/headed",
   *         "api_url": "https://antarctic.connect.flatpeak.energy/api"
   *       },
   *       "website_url": "https://www.antarctic.energy",
   *       "account_id": "acc_4629a55544194939a8b46a2c78e72902",
   *       "time_created": "2022-01-24T14:15:22Z"
   *     }
   */
  create(
    body: ProviderCreate,
    query: { account_id?: string },
  ): Promise<Provider | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/providers?${new URLSearchParams(
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
   * Get an energy provider details by id
   *
   * @param {string} id - unique FlatPeak provider identifier
   *
   * @return {Promise<Provider | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.providers.retrieve("prv_90f6716f96b848dc9109c1fb35bc8d3c");
   *
   *     console.log(output);
   *     {
   *       "id": "prv_3090a6232d754c9a8936272376989781",
   *       "object": "provider",
   *       "live_mode": false,
   *       "is_disabled": false,
   *       "code_name": "ANTARCTIC_ENERGY",
   *       "code_number": "000001",
   *       "currency_code": "USD",
   *       "area_served": {
   *         "country_code": "AQ",
   *         "states": []
   *       },
   *       "display_settings": {
   *         "object": "display_settings",
   *         "default_language": "EN",
   *         "language_assets": [
   *           {
   *             "language_code": "EN",
   *             "display_name": "Antarctic Energy",
   *             "logo_url": "https://static.flatpeak.energy/assets/antarctic.png",
   *             "support_url": "https://www.antarctic.energy/uk/support/",
   *             "terms_url": "https://www.antarctic.energy/uk/terms/",
   *             "privacy_url": "https://www.antarctic.energy/uk/privacy/"
   *           }
   *         ]
   *       },
   *       "integration_phase": 0,
   *       "integration_settings": {
   *         "onboard_url": "https://antarctic.connect.flatpeak.energy/headed",
   *         "api_url": "https://antarctic.connect.flatpeak.energy/api"
   *       },
   *       "website_url": "https://www.antarctic.energy",
   *       "account_id": "acc_4629a55544194939a8b46a2c78e72902",
   *       "time_created": "2022-01-24T14:15:22Z"
   *     }
   */
  retrieve(id: string): Promise<Provider | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/providers/${id}`, {
        method: "GET",
      }),
    );
  }

  /**
   * Update an energy provider
   *
   * @param {string} id - unique FlatPeak provider identifier
   *
   * @param {ProviderUpdate} body - undefined
   *
   * @return {Promise<Provider | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.providers.update("prv_90f6716f96b848dc9109c1fb35bc8d3c", body);
   *
   *     console.log(output);
   *     {
   *       "id": "prv_3090a6232d754c9a8936272376989781",
   *       "object": "provider",
   *       "live_mode": false,
   *       "is_disabled": false,
   *       "code_name": "ANTARCTIC_ENERGY",
   *       "code_number": "000001",
   *       "currency_code": "USD",
   *       "area_served": {
   *         "country_code": "AQ",
   *         "states": []
   *       },
   *       "display_settings": {
   *         "object": "display_settings",
   *         "default_language": "EN",
   *         "language_assets": [
   *           {
   *             "language_code": "EN",
   *             "display_name": "Antarctic Energy",
   *             "logo_url": "https://static.flatpeak.energy/assets/antarctic.png",
   *             "support_url": "https://www.antarctic.energy/uk/support/",
   *             "terms_url": "https://www.antarctic.energy/uk/terms/",
   *             "privacy_url": "https://www.antarctic.energy/uk/privacy/"
   *           }
   *         ]
   *       },
   *       "integration_phase": 0,
   *       "integration_settings": {
   *         "onboard_url": "https://antarctic.connect.flatpeak.energy/headed",
   *         "api_url": "https://antarctic.connect.flatpeak.energy/api"
   *       },
   *       "website_url": "https://www.antarctic.energy",
   *       "account_id": "acc_4629a55544194939a8b46a2c78e72902",
   *       "time_created": "2022-01-24T14:15:22Z"
   *     }
   */
  update(
    id: string,
    body: ProviderUpdate,
  ): Promise<Provider | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/providers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    );
  }
}
