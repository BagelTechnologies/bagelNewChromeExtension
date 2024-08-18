import { useEffect } from 'react';
// eslint-disable-next-line import/named
import { Box, Card, createStyles, Group, Spoiler, Text, UnstyledButton } from '@mantine/core';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useListState } from '@mantine/hooks';
import { appStorage } from '@extension/storage';
import { useStorageSuspense } from '@extension/shared';
import moment from 'moment';
import { Comments } from './Comments';
import { BusinessNameNotification } from '../icons/x-symbol-svgrepo-com';
import { OverflownText } from '../OverflownText';
import HtmlContent from '../HtmlContent';
import { scroller } from 'react-scroll'; // Import scroller from react-scroll

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

export function RequestCard({ request }: { request: any }) {
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
    <Card
      id={`request-card-${request._id}`}
      onClick={async () => await appStorage.selectRequest(request._id)}
      mb={'xs'}
      withBorder
      mx="1rem"
      p={0}
      sx={{
        borderColor: open ? '#5C5CEB' : '#D8D8DB',
        ...(open
          ? {
              height: 'calc(100vh - 105.7px - 1rem)',
            }
          : {}),
      }}>
      {open ? (
        <PanelGroup
          autoSaveId="example"
          direction="vertical"
          style={{
            height: 'calc(100vh - 105.7px - 1rem)',
          }}>
          <Panel minSize={20} maxSize={80} defaultSize={50}>
            <TopCard request={request} />
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
        <TopCard request={request} />
      )}
    </Card>
  );
}

const TopCard = ({ request }: { request: any }) => {
  const _appStorage = useStorageSuspense(appStorage);
  const open = request._id.toString() === _appStorage.selectedRequest;

  return (
    <Box
      h="100%"
      sx={{
        overflowY: 'scroll',
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
              <img src={chrome.runtime.getURL('side-panel/notification.svg')} alt="nice to have" />
            )}
            <img style={{ height: 16 }} src={chrome.runtime.getURL('side-panel/nice-to-have.svg')} alt="nice to have" />
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

        <Box
          mt="xs"
          py="xs"
          px="sm"
          sx={{
            borderLeft: '2px solid #5C5CEB99',
            backgroundColor: '#F8F9FA',
          }}>
          <OverflownText color="#585C68" size={15} weight={600} lineClamp={1}>
            Provide a Mentee the option to connect its LinkedIn account and automatically import their profile
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
              <HtmlContent
                content={
                  'Provide a Mentee the option to connect its LinkedIn account and automatically import their profile Provide a Mentee the option to connect its LinkedIn account and automatically import their profile'
                }
              />
            </Text>
          </Spoiler>
        </Box>
      </Box>
    </Box>
  );
};
