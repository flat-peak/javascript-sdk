export const objectToQueryString = (data) => {
  return Object.keys(data)
      .reduce((values, key) => {
        if (typeof data[key] === 'undefined') {
          return values;
        }
        const value = String(data[key]);
        if (value.length) {
          values.push(`${key}=${value}`);
        }
        return values;
      }, [])
      .join('&');
};
