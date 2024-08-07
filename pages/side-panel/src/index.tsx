import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanel from '@src/SidePanel';
import { Providers } from '@extension/shared';
import { AppContextProvider } from './AppContext';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <Providers
      //@ts-ignore
      domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
      //@ts-ignore
      clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
      //@ts-ignore
      audience={import.meta.env.VITE_APP_AUTH0_AUDIENCE}>
      <AppContextProvider>
        <SidePanel />
      </AppContextProvider>
    </Providers>,
  );
}

init();
