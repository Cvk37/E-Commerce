// authUtils.js

import { jwtDecode } from "jwt-decode";



export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    return true; // Invalid token
  }
}

export function removeToken() {
  localStorage.removeItem('token');
  // Or if using cookies
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
