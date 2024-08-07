import '@src/Popup.css';
import { getInitials, withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import { ComponentPropsWithoutRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Group, Image, Avatar, Center, Button } from '@mantine/core';
import { appStorage } from '@extension/storage';
import { useEffect } from 'react';

const Popup = () => {
  // const theme = useStorageSuspense(exampleThemeStorage);
  // const isLight = theme === 'light';
  // const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';
  const auth0 = useAuth0();
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
        await appStorage.setAuthObject(auth0);
      }
    } catch (error) {
      console.error('Error fetching auth data:', error);
    }
  };

  useEffect(() => {
    console.log({ auth0 });
    fetchAuthData();
  }, []);

  // console.log({ authData });

  return (
    // <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
    //    <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
    //     <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>pages/popup/src/Popup.tsx</code>
    //     </p>
    //     <pre>
    //       {JSON.stringify(auth0) }
    //     </pre>
    //     <button
    //       className={
    //         'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
    //         (isLight ? 'bg-blue-200 text-black' : 'bg-gray-700 text-white')
    //       }
    //       onClick={fetchAuthData}>
    //       fetchAuthData
    //     </button>
    //     <ToggleButton>Toggle theme</ToggleButton>
    //   </header>
    //   </div>

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
      <Box m="sm">
        <Center>
          {!auth0.isAuthenticated && (
            <Button mt="sm" miw={180} radius="xl" onClick={async () => await auth0.loginWithPopup()}>
              Login
            </Button>
          )}
        </Center>
        <Group grow>
          <Button
            mt="sm"
            radius="xl"
            variant="outline"
            onClick={() => chrome.tabs.create({ url: '/options/index.html' })}>
            Options
          </Button>
          <Button mt="sm" radius="xl" onClick={openSidePanel}>
            Side Panel
          </Button>
        </Group>
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
