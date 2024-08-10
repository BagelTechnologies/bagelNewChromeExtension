import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/dist/global.css';
import Options from '@src/Options';
import { Providers } from '@extension/shared';

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
      <Options />
    </Providers>,
  );
}

init();
