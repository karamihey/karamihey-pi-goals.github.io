const isLocalStorageSupported = () => {
  const testKey = 'test';
  const storage = window.localStorage;

  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);

    return true;
  } catch (error) {
    return false;
  }
};

export const setItem = (name: string, value: string) => localStorage.setItem(name, value);

export const getItem = (name: string) => {
  if (!isLocalStorageSupported()) {
    return null;
  }

  return localStorage.getItem(name);
};

export const removeItem = (name: string) => {
  if (!isLocalStorageSupported()) {
    return;
  }

  localStorage.removeItem(name);
};
