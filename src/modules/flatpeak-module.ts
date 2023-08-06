import fetch, {
  RequestInfo as NodeRequestInfo,
  RequestInit as NodeRequestInit,
} from "node-fetch";

export class FlatpeakModule {
  protected moduleId: string = "";

  private _publishableKey: string;

  private _host: string;

  private _verbose: boolean;

  private logFn: (message: string) => void;

  /**
   * @param {string} host
   * @param {string} publishableKey
   * @param {boolean|Function} logger
   */
  constructor(
    host: string,
    publishableKey: string,
    logger: boolean | ((message: string) => void) = false,
  ) {
    this._publishableKey = publishableKey;
    this._host = host;
    this._verbose = Boolean(logger);
    // eslint-disable-next-line no-console
    this.logFn = typeof logger === "function" ? logger : console.log;
  }

  /**
   * @private
   * @return {string}
   */
  get publishableKey(): string {
    return this._publishableKey;
  }

  /**
   * @private
   * @return {string}
   */
  get host(): string {
    return this._host;
  }

  /**
   * @private
   * @return {string}
   */
  get verbose(): boolean {
    return this._verbose;
  }

  /**
   * @private
   * @return {string}
   */
  protected authWithPublishableKey() {
    return `Basic ${Buffer.from(`${this.publishableKey}:`).toString("base64")}`;
  }

  /**
   * @param {RequestInit} init
   * @return {RequestInit}
   */
  protected authoriseRequest(init: RequestInit) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: this.authWithPublishableKey(),
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
   * @return {Promise<Response>}
   */
  protected performSignedRequest(input: RequestInfo, init: RequestInit = {}) {
    init = this.authoriseRequest(init);
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
