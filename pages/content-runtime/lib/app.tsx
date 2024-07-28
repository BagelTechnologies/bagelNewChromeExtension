// import '@src/Options.css';
import { useStorageSuspense } from '../../../packages/shared';
import { exampleThemeStorage } from '../../../packages/storage';
import { useEffect, useState } from 'react';
import { Button } from '../../../packages/ui';

export default function App() {
  const theme = useStorageSuspense(exampleThemeStorage);
  const [selectedText, setSelectedText] = useState('Toggle theme');

  useEffect(() => {
    console.log('runtime content view loaded - meir', { theme });
  }, [theme]);

  useEffect(() => {
    if (window) {
      const handleSelectionChange = () => {
        const selection = window?.getSelection?.()?.toString();
        if (selection) {
          setSelectedText(selection);
        }
      };

      document.addEventListener('selectionchange', handleSelectionChange);
      return () => {
        document.removeEventListener('selectionchange', handleSelectionChange);
      };
    }
  }, []);

  return (
    <Button onClick={exampleThemeStorage.toggle} theme={theme}>
      {selectedText}
    </Button>
  );
}
