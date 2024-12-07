/**
 * Save data to localStorage
 * @param {string} key - The key to store the data under.
 * @param {any} value - The value to store. It will be stringified if not a string.
 */
export const setLocalStorage = async (key: string, value: any) => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    // localStorage.setItem(key, serializedValue);

    const chromeStorage = {
      [key]: serializedValue,
    };

    console.log("TRYING TO SET", chromeStorage);
    await chrome.storage.local.set(chromeStorage);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getLocalStorage = async (key: string) => {
  try {
    const foundItem = await chrome.storage.local.get(key);

    console.log(foundItem);
    // const serializedValue = localStorage.getItem(key);
    // return serializedValue ? JSON.parse(serializedValue) : null;

    if (!foundItem) return null;

    return foundItem;
  } catch (error) {
    console.error("Error reading from localStorage", error);
    return null;
  }
};

export const clearLocalStorage = async () => {
  try {
    await chrome.storage.local.clear();
  } catch (error) {
    console.error("Error clearing localStorage", error);
  }
};
