import { FlatpeakModule } from "./flatpeak-module";
import { Account, FailureResponse } from "../types";

export class AccountModule extends FlatpeakModule {
  protected moduleId: string = "account";

  /**
   * Get current account for the provided API key.
   * Retrns `account_id` and `display_settings` objects.
   *
   * @return {Promise<Account | FailureResponse>}
   *
   * @example
   *     const output = await flatpeak.account.current();
   *
   *     console.log(output);
   *     {
   *       "id": "acc_40843c8058e34b3a98fd0f5b752a691b",
   *       "object": "account",
   *       "live_mode": true,
   *       "is_disabled": false,
   *       "timezone": "Etc/UTC",
   *       "allowed_origins": [
   *         "www.example.com",
   *         "test-www.example.com"
   *       ],
   *       "area_enabled": [
   *         {
   *           "country_code": "GB",
   *           "states": []
   *         },
   *         {
   *           "country_code": "US",
   *           "states": [
   *             "MA",
   *             "FL"
   *           ]
   *         }
   *       ],
   *       "display_settings": {
   *         "object": "display_settings",
   *         "default_language": "EN",
   *         "language_assets": [
   *           {
   *             "language_code": "EN",
   *             "display_name": "Timeshift Inc",
   *             "logo_url": "https://static.flatpeak.energy/assets/timeshift.png",
   *             "support_url": "https://www.timeshift.com/uk/timeshift-support/",
   *             "terms_url": "https://www.timeshift.com/uk/terms/",
   *             "privacy_url": "https://www.timeshift.com/uk/privacy-policy/"
   *           }
   *         ]
   *       }
   *     }
   */
  current(): Promise<Account | FailureResponse> {
    return this.processRequest(
      this.performSignedRequest(`${this.host}/account`, {
        method: "GET",
      }),
    );
  }
}
