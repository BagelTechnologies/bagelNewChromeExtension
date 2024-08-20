import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";

const getAuthHeaders = async (auth0: any) => {
  const token = await auth0.getAccessTokenSilently();
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getUnreadNotificationsCount = async (auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    console.log({ getUnreadNotificationsCount_env: import.meta.env });
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/unread-notifications-count`;
    const response = await axios.post(url, {}, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
