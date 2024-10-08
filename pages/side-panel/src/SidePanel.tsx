import '@src/SidePanel.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { appStorage } from '@extension/storage';
// import { ComponentPropsWithoutRef } from 'react';
import { Anchor, Box, Button, Card, Center, Group, SegmentedControl, Text } from '@mantine/core';
// eslint-disable-next-line import/named
import { Auth0ContextInterface, useAuth0, User } from '@auth0/auth0-react';
import { CreateNewModal } from './components/CreateNewModal';
import { IconLogin } from '@tabler/icons-react';
import { MyRequests } from './components/MyRequests';
import { useEffect } from 'react';
import { UserTypes } from './types/types';

const SidePanel = () => {
  const app = useStorageSuspense(appStorage);
  const auth0 = useAuth0();
  console.log({ user: auth0.user });

  // if (!auth0.isLoading && !auth0.isAuthenticated) {
  //   auth0.loginWithPopup()
  //   return <div>Redirecting to login...</div>;
  // }
  const saveAuthObject = async (auth0: Auth0ContextInterface<User>) => {
    const token = await auth0.getAccessTokenSilently();
    await appStorage.setAuthObject({ auth0, token });
  };

  useEffect(() => {
    if (auth0.isAuthenticated) {
      saveAuthObject(auth0);
    }
  }, [auth0]);

  return (
    <div className={`App`}>
      <header className={`App-header`}>
        <Group position="apart" mb="sm">
          <img style={{ height: 22 }} src={chrome.runtime.getURL('side-panel/logo_main.svg')} alt="logo" />
          <Anchor
            sx={{
              fontSize: 12,
              color: '#5C5CEB',
            }}
            hidden={auth0?.user?.['bagel/role'] == UserTypes.CASUAL}
            //@ts-ignore
            href={import.meta.env.VITE_MAIN_APP_URL}
            target="_blank">
            Go to dashboard
          </Anchor>
        </Group>
        <SegmentedControl
          value={app.tab}
          onChange={t => appStorage.setTab(t)}
          data={[
            { label: 'New request', value: 'create-new-request' },
            { label: 'My requests', value: 'my-requests' },
          ]}
          styles={{
            root: {
              backgroundColor: '#5C5CEB1A',
            },
          }}
        />
      </header>
      <main>
        {!auth0.isAuthenticated && (
          <Card
            mx="1rem"
            sx={{
              textAlign: 'center',
              alignItems: 'center',
            }}
            withBorder
            radius="md">
            <Center>
              <IconLogin size={22} />
            </Center>
            <Text align="center" mt="md">
              Please log in first.
            </Text>
            <Button mt="sm" miw={180} radius="xl" onClick={async () => await auth0.loginWithPopup()}>
              Login
            </Button>
          </Card>
        )}
        <Box hidden={!(auth0.isAuthenticated && app.tab === 'create-new-request')}>
          <CreateNewModal />
        </Box>
        {auth0.isAuthenticated && app.tab === 'my-requests' && <MyRequests />}
      </main>
    </div>
  );
};

// const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
//   const theme = useStorageSuspense(exampleThemeStorage);
//   return (
//     <Button
//       className={
//         props.className +
//         ' ' +
//         'font-bold mt-4 py-1 px-4 rounded shadow' +
//         (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
//       }
//       onClick={exampleThemeStorage.toggle}>
//       {props.children}
//     </Button>
//   );
// };

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
