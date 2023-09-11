import { FlatpeakModule } from "./flatpeak-module";
import {
  FailureResponse,
  ListResponse,
  WebhookEndpoint,
  WebhookEndpointCreate,
  WebhookEndpointUpdate,
} from "../types";

export class WebhooksModule extends FlatpeakModule {
  protected moduleId: string = "webhooks";

  /**
   * Returns a list of your webhook endpoints.
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {number} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   *
   * @return {Promise<ListResponse<Webhook> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.webhooks.list(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/webhook_endpoint",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "whe_20f965f75559487390536bb007644418",
   *           "account_id": "acc_a3922df82d0644cbad0aaa30b9182582",
   *           "object": "webhook_endpoint",
   *           "created": "2021-05-05T05:37:27Z",
   *           "description": "This is my webhook endpoint",
   *           "enabled_events": [
   *             "customer.created",
   *             "product.update.failed",
   *             "rates.fetch.failed"
   *           ],
   *           "live_mode": true,
   *           "is_disabled": false,
   *           "status": "active",
   *           "destination_url": "https://example.com/my/webhook/endpoint",
   *           "secret": "5329cbcbd82e445e8a64b7cfd91b45af"
   *         }
   *       ]
   *     }
   */
  list(
    query: {
      account_id?: string;
      ending_before?: string;
      limit?: number;
      starting_after?: string;
    } = {},
  ): Promise<ListResponse<WebhookEndpoint> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/webhooks?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
      ),
    );
  }

  /**
   * Create a webhook endpoint
   *
   * @param {WebhookEndpointCreate} body - Create a webhook endpoint
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<WebhookEndpoint | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.webhooks.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "whe_20f965f75559487390536bb007644418",
   *       "account_id": "acc_a3922df82d0644cbad0aaa30b9182582",
   *       "object": "webhook_endpoint",
   *       "created": "2021-05-05T05:37:27Z",
   *       "description": "This is my webhook endpoint",
   *       "enabled_events": [
   *         "customer.created",
   *         "product.update.failed",
   *         "rates.fetch.failed"
   *       ],
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "status": "active",
   *       "url": "https://example.com/my/webhook/endpoint",
   *       "secret": "5329cbcbd82e445e8a64b7cfd91b45af"
   *     }
   */
  create(
    body: WebhookEndpointCreate,
    query: { account_id?: string } = {},
  ): Promise<WebhookEndpoint | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/webhooks?${new URLSearchParams(
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
   * Retrieves the webhook endpoint with the given ID. You can also view webhook endpoints via the webhook endpoints management page of the FlatPeak dashboard...
   *
   * @param {string} id - unique FlatPeak webhook endpoint identifier
   *
   * @return {Promise<WebhookEndpoint | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.webhooks.retrieve("whe_20f965f75559487390536bb007644417");
   *
   *     console.log(output);
   *     {
   *       "id": "whe_20f965f75559487390536bb007644418",
   *       "account_id": "acc_a3922df82d0644cbad0aaa30b9182582",
   *       "object": "webhook_endpoint",
   *       "created": "2021-05-05T05:37:27Z",
   *       "description": "This is my webhook endpoint",
   *       "enabled_events": [
   *         "customer.created",
   *         "product.update.failed",
   *         "rates.fetch.failed"
   *       ],
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "status": "active",
   *       "url": "https://example.com/my/webhook/endpoint",
   *       "secret": "5329cbcbd82e445e8a64b7cfd91b45af"
   *     }
   */
  retrieve(id: string): Promise<WebhookEndpoint | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/webhooks/${id}`, {
        method: "GET",
      }),
    );
  }

  /**
   * Updates the webhook endpoint. You may edit the url, the list of enabled_events, and the status of your endpoint. You can also update webhook endpoints via the webhook endpoint management page of the FlatPeak dashboard.
   *
   * @param {string} id - unique FlatPeak webhook endpoint identifier
   *
   * @param {WebhookEndpointUpdate} body - undefined
   *
   * @return {Promise<WebhookEndpoint | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.webhooks.update("whe_20f965f75559487390536bb007644417", body);
   *
   *     console.log(output);
   *     {
   *       "id": "whe_20f965f75559487390536bb007644418",
   *       "account_id": "acc_a3922df82d0644cbad0aaa30b9182582",
   *       "object": "webhook_endpoint",
   *       "created": "2021-05-05T05:37:27Z",
   *       "description": "This is my webhook endpoint",
   *       "enabled_events": [
   *         "customer.created",
   *         "product.update.failed",
   *         "rates.fetch.failed"
   *       ],
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "status": "active",
   *       "url": "https://example.com/my/webhook/endpoint",
   *       "secret": "5329cbcbd82e445e8a64b7cfd91b45af"
   *     }
   */
  update(
    id: string,
    body: WebhookEndpointUpdate,
  ): Promise<WebhookEndpoint | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/webhooks/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    );
  }

  /**
   * You can also delete webhook endpoints via the webhook endpoint management page of the FlatPeak dashboard.
   *
   * @param {string} id - unique FlatPeak webhook endpoint identifier
   *
   * @return {Promise<void | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.webhooks.delete("whe_20f965f75559487390536bb007644417");
   */
  delete(id: string): Promise<void | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/webhooks/${id}`, {
        method: "DELETE",
      }),
    );
  }
}
