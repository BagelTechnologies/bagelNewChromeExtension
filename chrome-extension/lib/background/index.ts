import 'webextension-polyfill';
import { getUnreadNotificationsCount } from './Api';
import { appStorage } from '@extension/storage';

const fetchUnreadNotifications = async (token: any) => {
  try {
    const count = await getUnreadNotificationsCount(token);

    if (count > 0) {
      chrome.action.setBadgeBackgroundColor({ color: '#5C5CEB' });
      chrome.action.setBadgeText({
        text: `${count > 10 ? '10+' : count}`,
      });
    } else {
      chrome.action.setBadgeText({ text: '' });
    }
  } catch (e) {
    console.error('Failed to fetch unread notifications count', e);
  }
};

// Check if the alarm already exists
chrome.alarms.get('checkUnreadNotifications', existingAlarm => {
  if (!existingAlarm) {
    // Only create the alarm if it doesn't already exist
    chrome.alarms.create('checkUnreadNotifications', { periodInMinutes: 1 });
  }
});

// Listen for the alarm event
chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'checkUnreadNotifications') {
    // Log a message to the console every time the alarm triggers
    console.log('Alarm triggered: checkUnreadNotifications');
    //@ts-ignore
    console.log({ env: import.meta.env });
    appStorage.get().then(async appState => {
      console.log('appState', appState);
      if (appState.auth0?.token) {
        fetchUnreadNotifications(appState.auth0?.token);
      }
    });
  }
});

console.log('background loaded');
console.log("Edit 'chrome-extension/lib/background/index.ts' and save to reload.");
