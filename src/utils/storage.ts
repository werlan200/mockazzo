/**
 * Save data to localStorage
 * @param {string} key - The key to store the data under.
 * @param {any} value - The value to store. It will be stringified if not a string.
 */
export const setLocalStorage = (key: string, value: any) => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};
