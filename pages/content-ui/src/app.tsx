import React, { useEffect, useState } from 'react';
// import { Button } from '@mantine/core';
import { appStorage } from '../../../packages/storage';
// import { useStorageSuspense } from '../../../packages/shared';

export default function App() {
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    console.log('Content UI loaded');
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString();
      if (text && text?.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();
        rect &&
          setTooltip({
            show: true,
            text: text,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY - 40, // Adjust tooltip position above the selection
          });
      } else {
        setTooltip({ show: false, text: '', x: 0, y: 0 });
      }
    };

    document.addEventListener('mouseup', handleSelection);
    // document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      // document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleAddAsTitle = async () => {
    console.log('Add as Title:', tooltip.text);
    const currentUrl = window?.location?.href;

    await appStorage.setTitle(tooltip.text, currentUrl);
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  const handleAddAsDescription = async () => {
    console.log('Add as Description:', tooltip.text);
    const currentUrl = window?.location?.href;

    await appStorage.setDescription(tooltip.text, currentUrl);
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };
  // const _appStorage = useStorageSuspense(appStorage);

  return (
    <div>
      {/* Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload. */}
      {/* <Button>
       Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
      </Button> */}
      {tooltip.show && (
        <div
          className="absolute tooltip rounded-xl shadow-lg p-1 bg-white border border-gray-300 -mt-0"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            zIndex: 15,
          }}>
          {/* <div className="mb-2">{tooltip.text}</div> */}
          {/* <div className="mb-2">{_appStorage.tab}</div>
          <div className="mb-2">{_appStorage.title}</div> */}

          <div className="flex space-x-1" style={{ direction: 'ltr' }}>
            <img style={{ maxWidth: '20px' }} alt="Add as Text" src={chrome.runtime.getURL('content-ui/favicon.svg')} />
            <button
              onClick={handleAddAsTitle}
              className="bg-indigo-600 text-white px-1 py-1 rounded-lg hover:bg-indigo-800">
              <img
                style={{
                  filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(153deg) brightness(111%) contrast(109%)',
                }}
                alt="Add as Title"
                title="Add as Title"
                src={chrome.runtime.getURL('content-ui/letter-t.svg')}
              />
            </button>
            <button
              onClick={handleAddAsDescription}
              className="bg-indigo-600 text-white px-1 py-1 rounded-lg hover:bg-indigo-800">
              <img
                style={{
                  filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(153deg) brightness(111%) contrast(109%)',
                }}
                alt="Add as Description"
                title="Add as Description"
                src={chrome.runtime.getURL('content-ui/align-left.svg')}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
