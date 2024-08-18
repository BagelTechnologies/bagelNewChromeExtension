import { appStorage } from '@extension/storage';
import { Anchor, Center, Stack } from '@mantine/core';

export function EmptyState() {
  return (
    <Center>
      <Stack spacing={20} align="center">
        <img width={100} src={chrome.runtime.getURL('side-panel/zero_illustration.svg')} alt="no requests" />
        <Anchor
          sx={{
            fontSize: 12,
            color: '#5C5CEB',
          }}
          onClick={() => appStorage.setTab('create-new-request')}>
          Add your first request
        </Anchor>
      </Stack>
    </Center>
  );
}
