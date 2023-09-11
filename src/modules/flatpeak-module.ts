import { Buffer } from "buffer";
import fetch, {
  RequestInfo as NodeRequestInfo,
  RequestInit as NodeRequestInit,
} from "node-fetch";
import { AuthToken, FlatpeakApiCache, FlatpeakApiConfig } from "../types";

export class FlatpeakModule {
  protected moduleId: string = "";

  protected verbose: boolean;

  protected logFn: (message: string) => void;

  get host() {
    return this.config.host;
  }

  /**
   * @param {FlatpeakApiConfig} config
   * @param {FlatpeakApiCache} cache
   */
  constructor(
    protected config: Required<FlatpeakApiConfig>,
    protected cache: FlatpeakApiCache,
  ) {
    if (!config.host) {
      throw new TypeError("Required missing param: host");
    }
    this.verbose = Boolean(config.logger);
    this.logFn =
      // eslint-disable-next-line no-console
      typeof config.logger === "function" ? config.logger : console.log;
  }

  /**
   * @private
   * @return {string}
   */
  protected authWithPublishableKey() {
    if (!this.config.publishableKey) {
      throw new TypeError("Required missing param: publishableKey");
    }
    return `Basic ${Buffer.from(`${this.config.publishableKey}:`).toString(
      "base64",
    )}`;
  }

  /**
   * @private
   * @return {Promise<string>}
   */
  protected async authWithSecretKey() {
    if (!this.config.secretKey) {
      throw new TypeError("Required missing param: secretKey");
    }
    if (!this.cache.bearerToken) {
      const { token } = await this.obtainBearerToken();
      if (token) {
        this.cache.bearerToken = token;
      }
    }
    return `Bearer ${this.cache.bearerToken}`;
  }

  /**
   * Obtain an auth (bearer) token to authenticate API requests.
   * @return {Promise<AuthToken | FailureResponse>}
   */
  protected async obtainBearerToken(): Promise<AuthToken> {
    if (!this.cache.accountId) {
      const account = await this.processRequest(
        this.performSignedRequest(`${this.host}/account`, {
          method: "GET",
        }),
      );
      this.cache.accountId = account.id;
    }

    return this.processRequest(
      this.performPublicRequest(`${this.host}/login`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            [this.cache.accountId, this.config.secretKey].join(":"),
          ).toString("base64")}`,
        },
      }),
    );
  }

  protected async resolveAuthorizationHeader(
    type: "Bearer" | "Basic" = "Basic",
  ) {
    switch (type) {
      case "Bearer":
        return this.authWithSecretKey();
      case "Basic":
      default:
        return this.authWithPublishableKey();
    }
  }

  /**
   * @param {RequestInit} init
   * @param {("Bearer" | "Basic")} [type="Basic"]
   * @return {RequestInit}
   */
  protected async authoriseRequest(
    init: RequestInit,
    type: "Bearer" | "Basic" = "Basic",
  ) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: await this.resolveAuthorizationHeader(type),
    };
    if (!init) {
      return {
        headers,
      };
    }
    if (!init.headers) {
      init.headers = headers;
    } else {
      init.headers = { ...init.headers, ...headers };
    }
    return init;
  }

  /**
   * @param {RequestInfo} input
   * @param {RequestInit} [init]
   * @param {("Bearer" | "Basic")} [type="Basic"]
   * @return {Promise<Response>}
   */
  protected async performSignedRequest(
    input: RequestInfo,
    init: RequestInit = {},
    type: "Bearer" | "Basic" = "Basic",
  ) {
    init = await this.authoriseRequest(init, type);
    if (this.verbose) {
      this.logFn(
        `${this.moduleId} | Request: ${JSON.stringify({ input, init })}`,
      );
    }
    return (await fetch(
      input as NodeRequestInfo,
      init as NodeRequestInit,
    )) as unknown as Promise<Response>;
  }

  /**
   * @param {RequestInfo} input
   * @param {RequestInit} [init]
   * @return {Promise<Response>}
   */
  protected performPublicRequest(input: RequestInfo, init: RequestInit) {
    if (this.verbose) {
      this.logFn(
        `${this.moduleId} | Request: ${JSON.stringify({ input, init })}`,
      );
    }
    return fetch(
      input as NodeRequestInfo,
      init as NodeRequestInit,
    ) as unknown as Promise<Response>;
  }

  /**
   * @param {Promise<Response>} request
   * @return {Promise<Object>}
   */
  protected async processRequest(request: Promise<Response>) {
    const response = await request;
    const contentType = response.headers.get("content-type");
    const isJson = contentType && contentType.indexOf("application/json") > -1;
    const data = isJson ? await response.json() : {};
    if (this.verbose) {
      this.logFn(`${this.moduleId} | Response: ${JSON.stringify(data)}`);
    }
    return data;
  }
}
