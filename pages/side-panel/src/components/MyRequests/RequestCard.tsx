import { useEffect } from 'react';
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
import { useListState } from '@mantine/hooks';
import { appStorage } from '@extension/storage';
import { getInitials, useStorageSuspense } from '@extension/shared';
import moment from 'moment';
import { Comments } from './Comments';
import { BusinessNameNotification } from '../icons/x-symbol-svgrepo-com';
import { OverflownText } from '../OverflownText';
import HtmlContent from '../HtmlContent';
import { SourceIcon } from '@src/utils/SourceIcon';

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

export function RequestCard({ request, searchTerm }: { request: any; searchTerm: string }) {
  const { classes } = useStyles();
  const [comments, commentsHandlers] = useListState<any[]>(request.comments || []);
  const _appStorage = useStorageSuspense(appStorage);
  const open = request._id.toString() === _appStorage.selectedRequest;

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
      onClick={async () => await appStorage.selectRequest(request._id)}
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
          <Panel minSize={20} maxSize={80} defaultSize={50}>
            <TopCard request={request} searchTerm={searchTerm} />
          </Panel>
          {open && (
            <>
              <PanelResizeHandle className={classes.resizeHandle} />
              <Panel minSize={20} maxSize={80} defaultSize={50}>
                <Comments
                  idea={{}}
                  origin={'chrome extension'}
                  request={request}
                  comments={comments}
                  commentsHandlers={commentsHandlers}
                />
              </Panel>
            </>
          )}
        </PanelGroup>
      ) : (
        <TopCard request={request} searchTerm={searchTerm} />
      )}
    </Box>
  );
}

const TopCard = ({ request }: { request: any; searchTerm: string }) => {
  const _appStorage = useStorageSuspense(appStorage);
  const open = request._id.toString() === _appStorage.selectedRequest;

  return (
    <Box
      h="100%"
      sx={{
        overflowY: 'scroll',
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
              <Box w={20}>
                <BusinessNameNotification />
              </Box>
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
                  {request.status}
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
              onClick={async event => {
                event.stopPropagation(); // Prevent click event from propagating to the Card
                await appStorage.resetSelection();
              }}>
              Close
            </UnstyledButton>
          ) : (
            <Text size={12} p={9} color="dimmed">
              {moment(request.createdAt).fromNow()}
            </Text>
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
            py="xs"
            px="sm"
            sx={{
              borderLeft: '2px solid #5C5CEB99',
              backgroundColor: '#F8F9FA',
            }}>
            <OverflownText color="#585C68" size={15} weight={600} lineClamp={1}>
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
              <Text size="sm" color="#3B4158" sx={{ p: { margin: '5px 0px' }, h2: { marginTop: 0 } }}>
                <HtmlContent content={request.idea?.text} />
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
            <Text>{request?.owner?.name}</Text>
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
