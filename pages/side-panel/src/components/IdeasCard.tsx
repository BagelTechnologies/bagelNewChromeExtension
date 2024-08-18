import { Text, Button, Group, Spoiler, Paper, Box, Tooltip, Table } from '@mantine/core';
// import { IconUser } from "@tabler/icons-react";
import { useAppContext } from '../AppContext';
// import IdeaIcon from '../utils/icons/IdeaIcon';
// eslint-disable-next-line import/named
import { UseFormReturnType } from '@mantine/form';
import { OverflownText } from './OverflownText';
import HtmlContent from './HtmlContent';
import { NewRequestFormType } from './CreateNewModal';
import { IconArrowRight, IconExternalLink, IconLayersLinked, IconX } from '@tabler/icons-react';
// import { BusinessNameNotification } from './icons/x-symbol-svgrepo-com';

export function IdeasCard({
  item,
  newRequestForm,
}: {
  item: any;
  attached: boolean;
  newRequestForm: UseFormReturnType<
    NewRequestFormType,
    // eslint-disable-next-line no-unused-vars
    (values: NewRequestFormType) => NewRequestFormType
  >;
}) {
  const { appState, records } = useAppContext();

  const showDomain = appState.showDomain;
  //   appState?.objectCustomizations?.IdeaPageDisplay.display.domain;

  const includedComponent = appState?.components?.reduce((acc, component) => {
    if (component._id === item.componentId) {
      return component;
    }

    if (component.childComponents && component.childComponents.length > 0) {
      const foundChild = component.childComponents.find(
        (childComponent: any) => childComponent._id === item.componentId,
      );
      if (foundChild) {
        return component;
      }
    }

    return acc;
  }, undefined);

  const includedDomain = includedComponent
    ? appState?.domains?.find(domain => domain.name?.toLowerCase() === includedComponent.domain?.toLowerCase())
    : undefined;

  const ideaInRecords = records.some((r: any) => r?.idea?._id === item._id);

  const handleButtonClick = () => {
    if (newRequestForm.values.ideaId !== item._id) {
      newRequestForm.setValues({
        evidenceTitle: item.title,
        ideaId: item._id,
        ...(showDomain && includedDomain
          ? {
              domainId: includedDomain?._id,
              domain: includedDomain?.name,
            }
          : { domainId: '', domain: '' }),
        ...(includedComponent
          ? {
              areaId: includedComponent?._id,
              area: includedComponent?.name,
            }
          : { areaId: '', area: '' }),
        ...(item.match_id ? { match_id: item.match_id } : { match_id: '' }),
        ...(item.match_type ? { match_type: item.match_type } : { match_type: '' }),
        ...(item.match_text_id ? { match_text_id: item.match_text_id } : { match_text_id: '' }),
        ...(item.match_chat_id ? { match_chat_id: item.match_chat_id } : { match_chat_id: '' }),
        ...(item.match_yes_score ? { match_yes_score: item.match_yes_score } : { match_yes_score: '' }),
        //@ts-ignore
        disabledInputs: [
          ...newRequestForm.values.disabledInputs.filter(input => !['areaId', 'domainId'].includes(input)),
          ...(includedComponent ? ['areaId'] : []),
          ...(showDomain && includedDomain ? ['domainId'] : []),
        ],
      });
    } else {
      newRequestForm.setValues({
        evidenceTitle: '',
        ideaId: '',
        domain: '',
        domainId: '',
        area: '',
        areaId: '',
        match_id: '',
        match_type: '',
        match_text_id: '',
        match_chat_id: '',
        match_yes_score: '',
        disabledInputs: newRequestForm.values.disabledInputs.includes('relatedObject') ? ['relatedObject'] : [],
      });
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: '0px 0px 4px 4px',
        borderColor: '#5C5CEB1A',
      }}
      radius="md"
      withBorder
      mx={2}>
      <Box
        p={10}
        h={280}
        sx={{
          overflowY: 'scroll',
          overflowX: 'unset',
        }}>
        <Group p={0} spacing={8} mb={5} noWrap>
          <Tooltip label={`Priority: ${item.priority}`}>
            <img style={{ height: 16 }} src={chrome.runtime.getURL('side-panel/nice-to-have.svg')} alt="nice to have" />
          </Tooltip>
          <Tooltip label="Status">
            <Box>
              <OverflownText
                px={4}
                maw={'80vw'}
                size={12}
                weight={600}
                lineClamp={1}
                color="#5C5CEB"
                sx={{
                  background: '#5C5CEB1A',
                  borderRadius: 4,
                }}>
                {item?.status || 'Unassigned'}
              </OverflownText>
            </Box>
          </Tooltip>
        </Group>
        <Box mb="xs">
          <OverflownText size={15} weight={500} lineClamp={2}>
            {item?.title}
          </OverflownText>

          <Spoiler
            maxHeight={48}
            showLabel="See more"
            hideLabel="Less"
            styles={{
              control: {
                color: '#5C5CEA',
                fontSize: '14px',
              },
            }}>
            <Text size="sm" color="#3B4158" sx={{ p: { margin: '5px 0px' }, h2: { marginTop: 0 } }}>
              <HtmlContent content={item?.description} />
            </Text>
          </Spoiler>
        </Box>

        <Table verticalSpacing={5} horizontalSpacing={0} className="Idea-prop">
          <tbody>
            <tr>
              <td>Owner</td>
              <td>
                <Text weight={500}>{item?.owner?.name || 'Unassigned'}</Text>
              </td>
            </tr>
            <tr>
              <td>Product area</td>
              <td>
                <Text weight={500}>{includedComponent?.name || item?.component || 'Unassigned'}</Text>
              </td>
            </tr>
            <tr>
              <td>No. of evidence</td>
              <td>
                <Text weight={500}>{item?.owner?.name || 'Unassigned'}</Text>
              </td>
            </tr>
          </tbody>
        </Table>
      </Box>
      <Group>
        <Tooltip
          hidden={!ideaInRecords}
          label={
            ideaInRecords
              ? 'This Idea is already connected to this customer. You can review its status inside the table'
              : undefined
          }>
          <Group
            w="100%"
            position="apart"
            p={8}
            sx={{
              borderTop: 'solid 1px #D8D8DB',
            }}>
            <Button
              radius={4}
              leftIcon={<IconExternalLink size={16} />}
              h={32}
              color="gray"
              sx={{
                color: 'black',
              }}
              variant="subtle"
              disabled={ideaInRecords}
              onClick={handleButtonClick}
              component="a"
              target="_blank"
              //@ts-ignore
              href={`${import.meta.env.VITE_MAIN_APP_URL}/idea/${item._id}`}>
              Open
            </Button>

            <Button
              radius={4}
              leftIcon={
                ideaInRecords ? (
                  <IconLayersLinked size={16} />
                ) : newRequestForm.values.ideaId == item._id ? (
                  <IconX size={16} />
                ) : (
                  <IconArrowRight size={16} />
                )
              }
              h={32}
              sx={{
                ':disabled': {
                  backgroundColor: ideaInRecords ? '#D8D8D8' : 'inherit',
                  color: ideaInRecords ? '#ffffff' : 'inherit',
                },
                backgroundColor: ideaInRecords
                  ? '#D8D8D8'
                  : newRequestForm.values.ideaId == item._id
                    ? 'gray'
                    : '#5C5CEB',
              }}
              disabled={ideaInRecords}
              onClick={handleButtonClick}>
              {ideaInRecords ? 'Connected' : newRequestForm.values.ideaId == item._id ? 'Disconnect' : 'Connect'}
            </Button>
          </Group>
        </Tooltip>
      </Group>
    </Paper>
  );
}
