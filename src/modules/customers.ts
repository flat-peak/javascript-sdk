import { FlatpeakModule } from "./flatpeak-module";
import {
  Customer,
  CustomerCreate,
  CustomerUpdate,
  FailureResponse,
  ListResponse,
} from "../types";

export class CustomersModule extends FlatpeakModule {
  protected moduleId: string = "customers";

  /**
   * Returns a list of all customers.
   *
   * The customers are returned sorted by creation date, with the most recent appearing first. If no parameters are specified in the request, all of customers in pages of 100 are returned.
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   * @param {string} [query.ending_before] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve previous page in the list include ending_before where is the first id in the currently retrieved list.
   * @param {number} [query.limit] - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 30.
   * @param {string} [query.starting_after] - Specifies a cursor for pagination use; provider_id defines the place in the list. To retrieve next page in the list include starting_after where id is the last id in the currently retrieved list.
   * @param {string} [query.reference_id] - Object identifier from third-party system
   * @param {boolean} [query.is_disabled] - Set to 'true' to include disabled objects
   *
   * @return {Promise<ListResponse<Customer> | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.customers.list(query);
   *
   *     console.log(output);
   *     {
   *       "object": "list",
   *       "url": "/customers",
   *       "has_more": false,
   *       "data": [
   *         {
   *           "id": "cus_a83ec6da1e0d4917b9e9abf58d60574e",
   *           "object": "customer",
   *           "live_mode": true,
   *           "reference_id": "ABC1234567890",
   *           "is_disabled": false,
   *           "products": [
   *             "prd_5de9bad5d97b49a1b7382f2c0cec9799",
   *             "prd_b84526631dc54037940b75d3cb5971de"
   *           ],
   *           "time_created": "2021-05-05T05:37:27Z",
   *           "account_id": "acc_c85e9f90aa18454487b50d3c1785ed4e",
   *           "is_deleted": false
   *         }
   *       ]
   *     }
   */
  list(query: {
    account_id?: string;
    ending_before?: string;
    limit?: number;
    starting_after?: string;
    reference_id?: string;
    is_disabled?: boolean;
  }): Promise<ListResponse<Customer> | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/customers?${new URLSearchParams(
          query as Record<string, string>,
        ).toString()}`,
        {
          method: "GET",
        },
      ),
    );
  }

  /**
   * Create a customer
   *
   * @param {CustomerCreate} body - Create a customer
   *
   * @param {Object} query
   * @param {string} [query.account_id] - FlatPeak unique account_id. If not specified default account id for the key will be used
   *
   * @return {Promise<Customer | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.customers.create(body, query);
   *
   *     console.log(output);
   *     {
   *       "id": "cus_a83ec6da1e0d4917b9e9abf58d60574e",
   *       "object": "customer",
   *       "live_mode": true,
   *       "reference_id": "ABC1234567890",
   *       "products": [
   *         "prd_5de9bad5d97b49a1b7382f2c0cec9799",
   *         "prd_b84526631dc54037940b75d3cb5971de"
   *       ],
   *       "time_created": "2021-05-05T05:37:27Z",
   *       "account_id": "acc_c85e9f90aa18454487b50d3c1785ed4e",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  create(
    body: CustomerCreate,
    query: { account_id?: string } = {},
  ): Promise<Customer | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(
        `${this.host}/customers?${new URLSearchParams(
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
   * Retrieves the details of an existing customer.
   *
   * @param {string} id - unique FlatPeak customer identifier
   *
   * @return {Promise<Customer | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.customers.retrieve("cus_a83ec6da1e0d4917b9e9abf58d60574e");
   *
   *     console.log(output);
   *     {
   *       "id": "cus_a83ec6da1e0d4917b9e9abf58d60574e",
   *       "object": "customer",
   *       "live_mode": true,
   *       "reference_id": "ABC1234567890",
   *       "products": [
   *         "prd_5de9bad5d97b49a1b7382f2c0cec9799",
   *         "prd_b84526631dc54037940b75d3cb5971de"
   *       ],
   *       "time_created": "2021-05-05T05:37:27Z",
   *       "account_id": "acc_c85e9f90aa18454487b50d3c1785ed4e",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  retrieve(id: string): Promise<Customer | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/customers/${id}`, {
        method: "GET",
      }),
    );
  }

  /**
   * Permanently deletes a customer. This action cannot be undone.
   *
   * @param {string} id - unique FlatPeak customer identifier
   *
   * @return {Promise<void | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.customers.delete("cus_a83ec6da1e0d4917b9e9abf58d60574e");
   */
  delete(id: string): Promise<void | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/customers/${id}`, {
        method: "DELETE",
      }),
    );
  }

  /**
   * Updates the specified customer. Any parameters not provided will be left unchanged. This request accepts mostly the same arguments as the customer creation call.
   *
   * @param {string} id - unique FlatPeak customer identifier
   *
   * @param {CustomerUpdate} body - Update a customer
   *
   * @return {Promise<Customer | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.customers.update("cus_a83ec6da1e0d4917b9e9abf58d60574e", body);
   *
   *     console.log(output);
   *     {
   *       "id": "cus_a83ec6da1e0d4917b9e9abf58d60574e",
   *       "object": "customer",
   *       "live_mode": true,
   *       "reference_id": "ABC1234567890",
   *       "products": [
   *         "prd_5de9bad5d97b49a1b7382f2c0cec9799",
   *         "prd_b84526631dc54037940b75d3cb5971de"
   *       ],
   *       "time_created": "2021-05-05T05:37:27Z",
   *       "account_id": "acc_c85e9f90aa18454487b50d3c1785ed4e",
   *       "is_disabled": false,
   *       "is_deleted": false
   *     }
   */
  update(
    id: string,
    body: CustomerUpdate,
  ): Promise<Customer | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/customers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    );
  }
}
