import { useEffect, useState } from 'react';
import { useListState } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { RequestCard } from './RequestCard';
import { getMyRequests } from '@src/Api';
import { Box, Divider, Skeleton } from '@mantine/core';
import { EmptyState } from './EmptyState';
import { MentionProvider } from './Comment/MentionTextarea/MentionContext';
// import { useStorageSuspense } from '@extension/shared';
// import { appStorage } from '@extension/storage';

export function MyRequests() {
  const auth0 = useAuth0();
  // const _appStorage = useStorageSuspense(appStorage);

  const [requests, requestsHandlers] = useListState<any[]>([]); // Assuming RequestType is the type of each request
  const [loading, setLoading] = useState<boolean>(false); // Assuming RequestType is the type of each request
  // const selectedRequest = _appStorage.selectedRequest;

  const requestsWidthNotifications = requests.filter((request: any) => request?.unreadNotificationsCount > 0);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await getMyRequests(auth0); // Assuming getMyRequests is your API call function
        setLoading(false);
        requestsHandlers.setState(response);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  // Render only the selected request if selectedRequest is not null
  // if (selectedRequest) {
  //   const selected: any = requests.find((request: any) => request._id === selectedRequest);
  //   return selected ? (
  //     <MentionProvider>
  //       <RequestCard key={selected._id} request={selected} />
  //     </MentionProvider>
  //   ) : null; // Return null if selected request is not found
  // }

  return (
    <MentionProvider>
      <Box id="RequestCardsContainer">
        {requestsWidthNotifications.map((request: any) => (
          <RequestCard key={request._id} request={request} />
        ))}
        {requestsWidthNotifications.length > 0 && <Divider mx="1rem" my="sm" color="#D8D8DB" />}
        {requests.length > 0 ? (
          requests
            .filter((request: any) => request?.unreadNotificationsCount === 0)
            .map((request: any) => <RequestCard key={request._id} request={request} />)
        ) : loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton mx="1rem" mb="xs" width="calc(100% - 2rem)" height={200} key={index} />
          ))
        ) : (
          <EmptyState />
        )}
      </Box>
    </MentionProvider>
  );
}
