import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";

const getAuthHeaders = async (auth0: any) => {
  const token = await auth0.getAccessTokenSilently();
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const getSyncedIdeas = async (ticketId: string, auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = import.meta.env.VITE_APP_API_DOMAIN + '/product_apps/ideas/synced_ideas';
    const response = await axios.post(url, { ticketId }, config);
    return response.data.ideas;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
export const listFields = async (auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    console.log({ config });
    //@ts-ignore
    const url = import.meta.env.VITE_APP_API_DOMAIN + '/product_apps/ideas/listFields';
    const response = await axios.post(url, {}, config);
    console.log({ listFields: response.data });
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getSuggestions = async ({
  title,
  text,
  auth0,
}: {
  title: string;
  text: string;
  auth0: any;
}): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = import.meta.env.VITE_ML_API_URL + '/suggestions/idea';
    const response = await axios.post(url, { title, description: text }, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createNewRequest = async (body: any, auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = import.meta.env.VITE_APP_API_DOMAIN + '/product_apps/ideas/createNewRequest';
    const response = await axios.post(url, body, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const searchOrgs = async (query: string, auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = import.meta.env.VITE_APP_API_DOMAIN + '/product_apps/ideas/searchOrgs';
    const response = await axios.post(url, { query }, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
