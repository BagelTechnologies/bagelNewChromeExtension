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
      <MantineProvider withGlobalStyles withNormalizeCSS>
        {children}
      </MantineProvider>
    </Auth0Provider>
  );
};

export default Providers;
