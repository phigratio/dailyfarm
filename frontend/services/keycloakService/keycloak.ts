
import Keycloak from "keycloak-js";
import Cookies from "js-cookie";

const keycloakConfig = {
  url: process.env.NEXT_KEYCLOAK_URL || "http://localhost:8181",
  realm: process.env.NEXT_KEYCLOAK_REALM || "dailyfarm",
  clientId: process.env.NEXT_KEYCLOAK_CLIENT_ID || "dailyfarm-auth",
  credentials: {
    secret: process.env.NEXT_KEYCLOAK_CLIENT_SECRET || "oebqJSMzlFekiHFXPSsoOx0zmKZQA4NE",
  },
  publicClient: true,
};

export const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = () => {
  return keycloak.init({
    onLoad: "check-sso",
    enableLogging: true,
    checkLoginIframe: false,
    pkceMethod: "S256",
    timeSkew: 30,
  });
};

export const setAuthToken = () => {
  if (keycloak.token) {
    Cookies.set("token", keycloak.token, { expires: 1 });
  }
};

export const refreshTokenIfNeeded = async () => {
  try {
    await keycloak.updateToken(300);
    setAuthToken();
  } catch (error) {
    keycloak.login();
  }
};

export const logout = () => {
  Cookies.remove("token");
  keycloak.logout();
};
