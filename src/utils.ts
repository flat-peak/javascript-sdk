/**
 * @template T
 * @param {T} input
 * @return {T}
 */
import { FailureResponse } from "./types/extra";
import { DisplaySettings, LanguageAsset } from "./types";

export const throwOnApiError: <T>(request: T) => T = (input) => {
  if ((input as FailureResponse).object === "error") {
    throw new Error((input as FailureResponse).message);
  }
  return input;
};

/**
 * @param {object} source
 * @param {object} target
 * @param {Array<string>} [keys] - keys to check, all by default
 * @return {boolean|*}
 */
export const isEqualObjects = <T>(
  source: T,
  target: T,
  keys?: Array<keyof T>,
): boolean => {
  if (!keys || !keys.length) {
    return JSON.stringify(source) === JSON.stringify(target);
  }
  if (!source || !target) {
    return false;
  }
  return keys.every((key) => isEqualObjects(source[key], target[key]));
};

export const getDefaultLanguageAsset = (
  display_settings?: DisplaySettings,
): LanguageAsset => {
  const hasAccountAssets =
    Array.isArray(display_settings?.language_assets) &&
    display_settings?.language_assets.length;
  return hasAccountAssets
    ? (display_settings.language_assets as LanguageAsset[]).find(
        (entry) => entry.language_code === display_settings.default_language,
      ) || (display_settings.language_assets as LanguageAsset[])[0]
    : {};
};
