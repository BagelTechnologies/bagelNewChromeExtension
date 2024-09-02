import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
// eslint-disable-next-line import/named
import { MantineProvider } from '@mantine/core';

interface ProvidersProps {
  domain: string;
  clientId: string;
  audience?: string;
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ domain, clientId, audience, children }) => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `chrome-extension://${chrome.runtime.id}/options/index.html`,
        audience,
      }}
      cacheLocation="localstorage">
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          colors: {
            // Custom brand color scale
            brand: [
              '#EBEDFE', // Lightest shade
              '#C7CAF8',
              '#A2A6F3',
              '#7E82EE',
              '#5B60E3', // Main color
              '#494DC7',
              '#373AAB',
              '#363699', // Darker shade
              '#2A2A77',
              '#1D1D55', // Darkest shade
            ],
            // Replace default blue with brand colors
            blue: [
              '#EBEDFE',
              '#C7CAF8',
              '#A2A6F3',
              '#7E82EE',
              '#5B60E3',
              '#494DC7',
              '#373AAB',
              '#363699',
              '#2A2A77',
              '#1D1D55',
            ],
          },
          components: {
            Select: {
              styles: theme => ({
                item: {
                  '&[data-selected]': {
                    backgroundColor: theme.colors.brand[5], // Use main brand color
                    color: theme.white, // Set text color to white
                    '&:hover': {
                      backgroundColor: theme.colors.brand[7], // Use darker shade on hover
                    },
                  },
                  // '&[data-hovered]': {
                  //   backgroundColor: theme.colors.brand[2], // Lighter shade on hover
                  // },
                },
                icon: {
                  color: theme.colors.brand[5], // Main brand color for icon
                  '&[data-selected]': {
                    color: theme.white, // White icon when selected
                  },
                },
              }),
            },
          },
        }}>
        {children}
      </MantineProvider>
    </Auth0Provider>
  );
};

export default Providers;
