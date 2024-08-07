import React, { useEffect, useState } from 'react';
// import { Button } from '@mantine/core';
import { appStorage } from '@extension/storage';

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
    document.addEventListener('keyup', handleSelection);

    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, []);

  const handleAddAsTitle = async () => {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
    await chrome.sidePanel.open({ tabId: tab.id! });

    // console.log('Add as Title:', tooltip.text);
    await appStorage.setTitle(tooltip.text);

    // setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  const handleAddAsDescription = () => {
    console.log('Add as Description:', tooltip.text);
    setTooltip({ show: false, text: '', x: 0, y: 0 });
  };

  return (
    <div>
      {/* Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload. */}
      {/* <Button>
       Edit <strong>pages/content-ui/src/app.tsx</strong> and save to reload.
      </Button> */}
      {tooltip.show && (
        <div
          className="absolute tooltip rounded shadow-lg p-2 bg-gray-100 text-red-500 -mt-5"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            zIndex: 5,
          }}>
          {/* <div className="mb-2">{tooltip.text}</div> */}
          <div className="flex space-x-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              onClick={async () => {
                const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });
                await chrome.sidePanel.open({ tabId: tab.id! });

                // console.log('Add as Title:', tooltip.text);
                // setTooltip({ show: false, text: '', x: 0, y: 0 });
              }}>
              Add as Title
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              onClick={handleAddAsDescription}>
              Add as Description
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
