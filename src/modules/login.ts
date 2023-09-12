import { FlatpeakModule } from "./flatpeak-module";
import { AuthToken, FailureResponse } from "../types";

export class LoginModule extends FlatpeakModule {
  protected moduleId: string = "login";

  /**
   * Obtain an auth (bearer) token to authenticate API requests.
   *
   * Tokens expire every 30 minutes.
   *
   * @return {Promise<AuthToken | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.login.obtainToken();
   *
   *     console.log(output);
   *     {
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiYWNjXzQwODQzYzgwNThlMzRiM2E5OGZkMGY1Yjc1MmE2OTFiIiwibGl2ZV9tb2RlIjpmYWxzZSwiaXNzIjoiRmxhdFBlYWtBUEkiLCJzdWIiOiJhY2NfNDA4NDNjODA1OGUzNGIzYTk4ZmQwZjViNzUyYTY5MWIiLCJleHAiOjE2NjYwOTg4NjgsIm5iZiI6MTY2NjAxMjQ2OCwiaWF0IjoxNjY2MDEyNDY4fQ.GVfkaouHm4nBoj5gSaAaEBaoS9tPNhALgrMu0-TIrWQ"
   *     }
   */
  obtainToken(): Promise<AuthToken | FailureResponse> {
    return this.obtainBearerToken();
  }
}
