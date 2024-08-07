import '@src/Options.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { appStorage } from '@extension/storage';
import { Box, Center, Image, Paper, Avatar, Text, Button } from '@mantine/core';
import { useAuth0 } from '@auth0/auth0-react';

const Options = () => {
  // const app = useStorageSuspense(appStorage);
  const auth0 = useAuth0();
  console.log({ auth0 });
  if (!auth0.isLoading && !auth0.isAuthenticated) {
    auth0.loginWithRedirect();
    return <div>Redirecting to login...</div>;
  }

  return (
    <Center mt="10vh">
      <Box>
        <Image maw={100} src={chrome.runtime.getURL('side-panel/logo_main.svg')} />
        <Paper
          w={520}
          radius="md"
          withBorder
          p="lg"
          sx={theme => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
          })}>
          <Avatar src={auth0?.user?.picture} size={120} radius={120} mx="auto" />
          <Text ta="center" fz="lg" weight={500} mt="md">
            {auth0?.user?.name}
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            {auth0?.user?.email}
          </Text>

          <Button
            variant="default"
            fullWidth
            mt="md"
            onClick={async () => {
              await auth0.logout({
                logoutParams: { returnTo: `chrome-extension://${chrome.runtime.id}/options/index.html` },
              });
              await appStorage.setAuthObject(null);
            }}>
            Logout
          </Button>
        </Paper>
      </Box>
    </Center>
  );
};

export default withErrorBoundary(withSuspense(Options, <div> Loading ... </div>), <div> Error Occur </div>);
