import clone from 'lodash/clone';
import escapeRegExp from 'lodash/escapeRegExp';
import React from 'react';

export function swapTags(text: string): string {
  let displayText = clone(text);
  const tags = text.match(/@\{\{[^\}]+\}\}/gi) || [];
  tags.map(myTag => {
    const tagData = myTag.slice(3, -2);
    const tagDataArray = tagData?.split('||');
    const tagDisplayValue = tagDataArray[2];
    displayText = displayText.replace(new RegExp(escapeRegExp(myTag), 'gi'), tagDisplayValue);
  });
  return displayText;
}

export function getUsersFromTags(text: string): { _id: string; name: string }[] {
  // Adjusted regex to match the provided input format
  const regex = /<span[^>]*data-id="([^"]+)"[^>]*data-label="([^"]+)"[^>]*class="mention"[^>]*>/gi;
  let match;
  const allUserIds: Array<{ _id: string; name: string }> = [];

  // Using a loop to find matches and extract the necessary data
  while ((match = regex.exec(text)) !== null) {
    // Pushing objects with _id and name properties into the allUserIds array
    if (match[1] && match[2]) {
      allUserIds.push({ _id: match[1], name: match[2] });
    }
  }

  // Removing duplicates based on the _id property
  return uniqBy(allUserIds, item => item._id);
}

// Utility function to remove duplicates, adapted for TypeScript
function uniqBy<T>(array: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    } else {
      seen.add(key);
      return true;
    }
  });
}
