import axios from 'axios';

export const getUnreadNotificationsCount = async (token: any): Promise<any> => {
  try {
    //@ts-ignore
    console.log({ getUnreadNotificationsCount_env: import.meta.env });
    //@ts-ignore
    const url = `${import.meta.env.VITE_APP_API_DOMAIN}/product_apps/ideas/unread-notifications-count`;
    const response = await axios.post(
      url,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data.unreadCount;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
