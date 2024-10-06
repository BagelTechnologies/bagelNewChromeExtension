import { useEffect, SetStateAction, Dispatch } from 'react';
import {
  Avatar,
  Box,
  Button,
  // eslint-disable-next-line import/named
  createStyles,
  Group,
  Spoiler,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
// eslint-disable-next-line import/named
import { useListState, UseListStateHandlers } from '@mantine/hooks';
// import { appStorage } from '@extension/storage';
import { getInitials } from '@extension/shared';
import moment from 'moment';
import { Comments } from './Comments';
import { BusinessNameNotification } from '../icons/x-symbol-svgrepo-com';
import { OverflownText } from '../OverflownText';
import HtmlContent from '../HtmlContent';
import { SourceIcon } from '@src/utils/SourceIcon';
import { IconPlugConnected } from '@tabler/icons-react';
import { UserTypes } from '@src/types/types';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = createStyles(theme => ({
  resizeHandle: {
    backgroundColor: '#D8D8DB',
    cursor: 'row-resize',
    height: '5px',
    position: 'relative',
    '&[data-resize-handle-state="hover"]': {
      backgroundColor: '#5C5CEB',
      '&::before': {
        backgroundColor: '#fff',
      },
    },
    '&[data-resize-handle-state="drag"]': {
      backgroundColor: '#5C5CEB',
      '&::before': {
        backgroundColor: '#fff',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      width: '60px',
      height: '2px',
      borderRadius: '1px',
      backgroundColor: theme.colors.gray[7],
      top: '50%',
      transform: 'translateY(-50%)',
      left: 'calc(50% - 30px)',
    },
  },
}));

export function RequestCard({
  request,
  requestsHandlers,
  searchTerm,
  selectedRequest,
  setSelectedRequest,
}: {
  request: any;
  requestsHandlers: UseListStateHandlers<any[]>;
  searchTerm: string;
  selectedRequest: string | null;
  setSelectedRequest: Dispatch<SetStateAction<string | null>>;
}) {
  const { classes } = useStyles();
  const [comments, commentsHandlers] = useListState<any[]>(request.comments || []);

  const open = request._id.toString() === selectedRequest;

  useEffect(() => {
    if (open) {
      const cardElement = document.getElementById(`request-card-${request._id}`);

      if (cardElement) {
        // Scroll into view with the offset applied via CSS
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [open, request._id]);

  return (
    <Box
      id={`request-card-${request._id}`}
      onClick={() => setSelectedRequest(request._id)}
      mb={'xs'}
      // withBorder
      mx="1rem"
      p={0}
      sx={{
        border: `1px solid ${open ? '#5C5CEB' : '#D8D8DB'}`,
        borderRadius: '4px',
        background: '#fff',
      }}>
      {open ? (
        <PanelGroup
          autoSaveId="example"
          direction="vertical"
          style={{
            height: 'calc(100vh - 105.7px - 1rem)',
          }}>
          <Panel minSize={20} maxSize={80} defaultSize={75}>
            <TopCard
              request={request}
              searchTerm={searchTerm}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          </Panel>
          {open && (
            <>
              <PanelResizeHandle className={classes.resizeHandle} />
              <Panel minSize={20} maxSize={80} defaultSize={25}>
                <Comments
                  idea={{}}
                  origin={'chrome extension'}
                  request={request}
                  requestsHandlers={requestsHandlers}
                  comments={comments}
                  commentsHandlers={commentsHandlers}
                />
              </Panel>
            </>
          )}
        </PanelGroup>
      ) : (
        <TopCard
          request={request}
          searchTerm={searchTerm}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      )}
    </Box>
  );
}

const TopCard = ({
  request,
  selectedRequest,
  setSelectedRequest,
}: {
  request: any;
  searchTerm: string;
  selectedRequest: string | null;
  setSelectedRequest: Dispatch<SetStateAction<string | null>>;
}) => {
  const open = request._id.toString() === selectedRequest;
  const auth0 = useAuth0();

  return (
    <Box
      h="100%"
      sx={{
        overflowY: 'auto',
        borderRadius: '4px 4px 0 0',
      }}>
      <Box
        id="card-header"
        sx={{
          position: 'sticky',
          background: '#fff',
          top: 0,
          zIndex: 10,
          '&.active': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}>
        <Group position="apart">
          <Group p={9} spacing={6} noWrap>
            {request?.unreadNotificationsCount > 0 ? (
              <Tooltip
                label={
                  request?.unreadNotificationsCount > 1
                    ? `${request?.unreadNotificationsCount} unread comments`
                    : `unread comment`
                }>
                <Box w={20}>
                  <BusinessNameNotification />
                </Box>
              </Tooltip>
            ) : (
              <img src={chrome.runtime.getURL('side-panel/notification.svg')} alt="notification" />
            )}
            <Tooltip label={`Priority: ${request.priority}`}>
              <img
                style={{ height: 16 }}
                src={chrome.runtime.getURL('side-panel/nice-to-have.svg')}
                alt="nice to have"
              />
            </Tooltip>
            <Tooltip label={`Status`}>
              <Box>
                <OverflownText
                  px={4}
                  maw={'80vw'}
                  size={12}
                  weight={600}
                  lineClamp={1}
                  color="#5C5CEB"
                  sx={{
                    background: '#5C5CEB1A',
                    borderRadius: 4,
                  }}>
                  {request.finalStatus}
                </OverflownText>
              </Box>
            </Tooltip>
          </Group>
          {open ? (
            <UnstyledButton
              px={8}
              sx={{
                fontSize: 12,
                textDecoration: 'underline',
                color: '#5C5CEB',
                zIndex: 4,
              }}
              onClick={event => {
                event.stopPropagation(); // Prevent click event from propagating to the Card
                setSelectedRequest(null);
              }}>
              Close
            </UnstyledButton>
          ) : (
            <Box p={9}>
              <Tooltip label={moment(request.createdAt)?.format('MMMM Do YYYY, h:mm:ss a')}>
                <Text size={12} color="dimmed">
                  {moment(request.createdAt).fromNow()}
                </Text>
              </Tooltip>
            </Box>
          )}
        </Group>
      </Box>
      {/* Content to scroll */}
      <Box mb="xs" mx="xs">
        <OverflownText size={15} weight={600} lineClamp={2}>
          {request.title}
        </OverflownText>

        <Spoiler
          maxHeight={22}
          showLabel="See more"
          hideLabel="Less"
          styles={{
            control: {
              color: '#5C5CEA',
              fontSize: '14px',
            },
          }}>
          <Text size="sm" color="#3B4158" sx={{ p: { margin: '5px 0px' }, h2: { marginTop: 0 } }}>
            <HtmlContent content={request.text} />
          </Text>
        </Spoiler>

        {request.idea && (
          <Box
            mt="xs"
            pt={4}
            pb="xs"
            pr={4}
            pl="sm"
            sx={{
              borderLeft: '2px solid #5C5CEB99',
              backgroundColor: '#F8F9FA',
            }}>
            <Group spacing={4} noWrap position="left">
              <IconPlugConnected color="#5C5CEB99" size={13} />
              <Text color="dimmed" size={12}>
                Related Product Idea:
              </Text>
            </Group>
            {/* @ts-ignore */}
            <OverflownText
              {...(auth0?.user?.['bagel/role'] !== UserTypes.CASUAL
                ? {
                    component: 'a',
                    /* @ts-ignore */
                    href: `${import.meta.env.VITE_MAIN_APP_URL}/idea/${request.idea?._id}`,
                    target: '_blank',
                    sx: {
                      ':hover': {
                        color: '#5C5CEA',
                        textDecoration: 'underline',
                      },
                    },
                  }
                : '')}
              color="#585C68"
              size={15}
              weight={600}
              lineClamp={1}>
              {request.idea?.title}
            </OverflownText>

            <Spoiler
              maxHeight={22}
              showLabel="See more"
              hideLabel="Less"
              styles={{
                control: {
                  color: '#5C5CEA',
                  fontSize: '14px',
                },
              }}>
              <Text size="sm" pr={3} color="#3B4158" sx={{ p: { margin: '5px 0px' }, h2: { marginTop: 0 } }}>
                <HtmlContent content={request.idea?.description} />
              </Text>
            </Spoiler>
          </Box>
        )}
      </Box>
      <Group mb="xs" mx="xs" spacing={4} hidden={!open}>
        <Tooltip label="Owner">
          <Group
            p={6}
            noWrap
            spacing={4}
            sx={{
              background: '#5C5CEB1A',
              borderRadius: 4,
              height: 26,
            }}>
            {request?.owner?.picture ? (
              <Avatar src={request?.owner?.picture} radius="xl" size="xs" />
            ) : (
              <Avatar color="cyan" radius="xl" size="xs">
                {request?.owner?.name && getInitials(request?.owner?.name)}
              </Avatar>
            )}
            <Text>{request?.owner?.name || 'Unassigned'}</Text>
          </Group>
        </Tooltip>

        {request.linkedProductItem && (
          <Tooltip label="Delivery">
            <Button
              styles={{
                root: {
                  background: '#5C5CEB1A',
                  maxWidth: '-webkit-fill-available',
                },
                label: {
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 400,
                },
              }}
              color="gray"
              variant="subtle"
              compact
              component="a"
              href={request?.linkedProductItem?.link}
              target="_blank"
              leftIcon={
                request?.linkedProductItem.origin ? (
                  <SourceIcon width={14} sourceName={request?.linkedProductItem.origin} />
                ) : (
                  <></>
                )
              }>
              {request?.linkedProductItem?.itemKey}
            </Button>
          </Tooltip>
        )}

        {request?.chat && request?.origin && request?.origin !== 'bagel' && (
          <Tooltip label={request?.origin}>
            <Button
              styles={{
                root: {
                  background: '#5C5CEB1A',
                  maxWidth: '-webkit-fill-available',
                },
              }}
              variant="light"
              color="gray"
              compact
              component="a"
              href={request?.chat?.link}
              target="_blank"
              leftIcon={<SourceIcon width={14} sourceName={request?.origin} />}>
              <OverflownText
                size={14}
                weight={400}
                lineClamp={1}
                color="black">{`${request?.origin == 'zendesk' ? '#' : ''}${request?.chat?.originId}`}</OverflownText>
            </Button>
          </Tooltip>
        )}
      </Group>
    </Box>
  );
};
