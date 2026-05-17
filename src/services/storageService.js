export const saveGlobalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getGlobalData = (key) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
};

export const getCurrentUser = () => {
  return localStorage.getItem("loggedUser");
};

export const setCurrentUser = (user) => {
  localStorage.setItem("loggedUser", user);
};

export const getUserKey = (key) => {
  const user = getCurrentUser();
  return user ? `${key}_${user}` : key;
};

export const saveUserData = (key, data) => {
  const storageKey = getUserKey(key);
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const getUserData = (key) => {
  const storageKey = getUserKey(key);
  const raw = localStorage.getItem(storageKey);
  return raw ? JSON.parse(raw) : null;
};
