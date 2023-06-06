/**
 * @template T
 * @param {T} input
 * @return {T}
 */
export const throwOnApiError = (input) => {
  if (input?.object === 'error') {
    throw new Error(input.message);
  }
  return input;
};

/**
 * @param {object} source
 * @param {object} target
 * @param {Array<string>} [keys] - keys to check, all by default
 * @return {boolean|*}
 */
export const isEqualObjects = (source, target, keys) => {
  if (!keys || !keys.length) {
    return JSON.stringify(source) === JSON.stringify(target);
  }
  if (!source || !target) {
    return false;
  }
  return keys.every((key) => isEqualObjects(source[key], target[key]));
};
