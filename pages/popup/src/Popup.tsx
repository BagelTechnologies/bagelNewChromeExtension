import '@src/Popup.css';
import { getInitials, withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import { ComponentPropsWithoutRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Group, Image, Avatar, Button, ActionIcon, Grid } from '@mantine/core';
import { appStorage } from '@extension/storage';
import { useEffect, useState } from 'react';
import { IconSettings } from '@tabler/icons-react';

// import { getUnreadNotificationsCount } from './Api';

const Popup = () => {
  // const theme = useStorageSuspense(exampleThemeStorage);
  // const isLight = theme === 'light';
  // const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';
  const auth0 = useAuth0();
  const [badgeText, setBadgeText] = useState('');

  // if (!auth0.isLoading && !auth0.isAuthenticated) {
  //   auth0.loginWithRedirect();
  //   return <div>Redirecting to login...</div>;
  // }

  // const injectContentScript = async () => {
  //   const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

  //   await chrome.scripting.executeScript({
  //     target: { tabId: tab.id! },
  //     files: ['content-runtime/index.iife.js'],
  //   });
  // };
  // const fetchUnreadNotifications = async () => {
  //   try {
  //     const count = await getUnreadNotificationsCount(auth0);

  //     if (count > 0) {
  //       chrome.action.setBadgeBackgroundColor({ color: '#5C5CEB' });
  //       chrome.action.setBadgeText({
  //         text: `${count > 10 ? '10+' : count}`,
  //       });
  //     } else {
  //       chrome.action.setBadgeText({ text: '' });
  //     }
  //   } catch (e) {
  //     console.error('Failed to fetch unread notifications count', e);
  //   }
  // };

  const openSidePanel = async () => {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
    await chrome.sidePanel.open({ tabId: tab.id! });
  };

  const fetchAuthData = async () => {
    try {
      if (auth0.isLoading && auth0.isAuthenticated) {
        const token = await auth0.getAccessTokenSilently();

        console.log({ token, auth0 });
        // Update storage with auth data
        await appStorage.setAuthObject({ auth0, token });
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
    }
  };

  useEffect(() => {
    console.log({ auth0 });
    fetchAuthData();
    chrome.action.getBadgeText({}, text => {
      console.log({ text });
      setBadgeText(text);
    });
  }, []);

  return (
    <Box p="md" miw={260}>
      <Group noWrap position="apart">
        <Image maw={100} src={chrome.runtime.getURL('side-panel/logo_main.svg')} />
        {auth0?.user?.picture ? (
          <Avatar src={auth0?.user?.picture} radius="xl" size="md" />
        ) : (
          <Avatar color="cyan" radius="xl" size="md">
            {auth0?.user?.['bagel/name'] && getInitials(auth0?.user?.['bagel/name'])}
          </Avatar>
        )}
      </Group>
      <Box>
        {!auth0.isAuthenticated && (
          <Button fullWidth mt="md" miw={180} radius="xl" onClick={async () => await auth0.loginWithPopup()}>
            Login
          </Button>
        )}
        <Grid mt="md" gutter={0} p={0} m={0}>
          <Grid.Col span="content">
            <ActionIcon
              mr="xs"
              size={36}
              onClick={() => chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/options/index.html` })}>
              <IconSettings color="#000" />{' '}
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span="auto">
            <Button
              fullWidth
              variant="outline"
              radius="xl"
              onClick={openSidePanel}
              styles={{
                root: {
                  color: '#5C5CEB',
                  borderColor: '#5C5CEB',
                },
              }}
              rightIcon={
                badgeText !== '' && (
                  <Box
                    px={5}
                    py={2}
                    sx={{ textAlign: 'center', borderRadius: 4, background: '#5C5CEB', fontSize: 10, color: '#fff' }}>
                    {badgeText}
                  </Box>
                )
              }>
              Open Side Panel
            </Button>
          </Grid.Col>
        </Grid>
        {/* <Button
            mt="sm"
            radius="xl"
            variant="subtle"
            fullWidth
            onClick={() => chrome.tabs.create({ url: '/options/index.html' })}>
            
          </Button> */}

        {/* <Button mt="sm" radius="xl" onClick={injectContentScript}>
          injectContentScript
          </Button> */}
      </Box>
    </Box>
  );
};

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorageSuspense(exampleThemeStorage);
//   return (
//     <button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
//         (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </button>
//   );
// };

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
