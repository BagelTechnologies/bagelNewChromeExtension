import axios from 'axios';

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

export const getMyRequests = async (auth0: any, page: number, searchTerm: string): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = import.meta.env.VITE_APP_API_DOMAIN + '/product_apps/ideas/my-requests';
    const response = await axios.post(
      url,
      {
        page, // Include the page number
        limit: 10, // You can adjust the limit as needed
        searchTerm, // Include the search term
      },
      config,
    );
    return response.data.requests;
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

export const addCommentToRequest = async (
  auth0: any,
  requestId: string,
  commentText: string,
  usersMentioned: any[],
  ideaId?: string,
): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/requests/comment`;
    const response = await axios.post(
      url,
      {
        ideaId,
        requestId,
        comment: {
          text: commentText,
          usersMentioned,
        },
      },
      config,
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const deleteCommentFromRequest = async (auth0: any, commentId: string, ideaId?: string): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/requests/comment/${commentId}/delete`;
    const response = await axios.post(url, { ideaId }, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const searchUsers = async (query: string, auth0: any): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/search/members`;
    const response = await axios.post(url, { query }, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const updateRequestComment = async (
  auth0: any,
  commentId: string,
  updatedComment: any,
  ideaId?: string,
): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/requests/comment/${commentId}`;
    const response = await axios.post(url, { ideaId, comment: updatedComment }, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const markNotificationsRead = async (auth0: any, itemId: string): Promise<any> => {
  try {
    const config = await getAuthHeaders(auth0);
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/requests/${itemId}/markNotificationsRead`;
    const response = await axios.post(url, {}, config);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
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
