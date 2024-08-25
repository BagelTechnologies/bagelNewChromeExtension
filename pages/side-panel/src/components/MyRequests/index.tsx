import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Divider, Skeleton, TextInput, Loader, ActionIcon } from '@mantine/core';
import { useDebouncedValue, useListState } from '@mantine/hooks';
import { EmptyState } from './EmptyState';
import { MentionProvider } from './Comment/MentionTextarea/MentionContext';
import { RequestCard } from './RequestCard';
import { getMyRequests } from '@src/Api';
import { IconSearch, IconX } from '@tabler/icons-react';

export function MyRequests() {
  const auth0 = useAuth0();
  const [requests, requestsHandlers] = useListState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 300); // Adjusted debounce time to 300ms

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await getMyRequests(auth0, page, debouncedSearchTerm);
        setLoading(false);
        if (page === 1) {
          requestsHandlers.setState(response);
        } else {
          requestsHandlers.append(...response);
        }
        if (response.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching requests:', error);
      }
    };

    if (hasMore || page === 1) {
      fetchRequests();
    }
  }, [page, debouncedSearchTerm]);

  const lastRequestElementRef = (node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
    setHasMore(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPage(1);
    // setHasMore(true);
  };

  const requestsWithNotifications = requests.filter((request: any) => request?.unreadNotificationsCount > 0);

  return (
    <MentionProvider>
      <TextInput
        mb="sm"
        placeholder="Search requests..."
        icon={<IconSearch size={14} />}
        value={searchTerm}
        onChange={handleSearchChange}
        rightSection={
          searchTerm && loading ? (
            <Loader size={16} />
          ) : (
            <ActionIcon hidden={searchTerm === ''} onClick={handleClearSearch} p={2}>
              <IconX size={14} />
            </ActionIcon>
          )
        }
        mx="1rem"
      />
      <Box id="RequestCardsContainer">
        {requestsWithNotifications.map((request: any) => (
          <RequestCard
            key={request._id}
            request={request}
            requestsHandlers={requestsHandlers}
            searchTerm={debouncedSearchTerm}
            selectedRequest={selectedRequest}
            setSelectedRequest={setSelectedRequest}
          />
        ))}
        {requestsWithNotifications.length > 0 && <Divider mx="1rem" my="sm" color="#D8D8DB" />}
        {requests.length > 0 ? (
          requests
            .filter((request: any) => request?.unreadNotificationsCount === 0)
            .map((request: any, index: number) => (
              <div ref={index === requests.length - 3 ? lastRequestElementRef : null} key={request._id}>
                <RequestCard
                  request={request}
                  requestsHandlers={requestsHandlers}
                  searchTerm={debouncedSearchTerm}
                  selectedRequest={selectedRequest}
                  setSelectedRequest={setSelectedRequest}
                />
              </div>
            ))
        ) : loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton mx="1rem" mb="xs" width="calc(100% - 2rem)" height={200} key={index} />
          ))
        ) : (
          <EmptyState />
        )}
        {loading && hasMore && <Loader size={22} mx="auto" my="sm" />}
      </Box>
    </MentionProvider>
  );
}
