import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem("token");

export const decodeToken = () => {
  const token = getToken();
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const getRole = () => {
  const decoded = decodeToken();
  return decoded?.role;
};

export const isLoggedIn = () => !!getToken();
