import {
  Stack,
  TextInput,
  Select,
  Button,
  Textarea,
  Text,
  Group,
  // eslint-disable-next-line import/named
  SystemProp,
  // eslint-disable-next-line import/named
  SpacingValue,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
// eslint-disable-next-line import/named
import { UseFormReturnType } from '@mantine/form';
import { NewRequestFormType } from '.';
import { RelatedObjectInput } from './RelatedObjectInput';
import { createNewRequest } from '../../Api';
import { forwardRef, useState, ComponentPropsWithoutRef, Dispatch, SetStateAction } from 'react';
import { closeAllModals } from '@mantine/modals';
import { useAppContext } from '@src/AppContext';
import { useAuth0 } from '@auth0/auth0-react';
import { SuggestedSearch } from './SuggestedSearch';
import { IconArrowNarrowRight, IconSparkles, IconX } from '@tabler/icons-react';
import { useStorageSuspense } from '@extension/shared';
import { appStorage } from '@extension/storage';
import { prepareProductAreaData } from './helpers';

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  isChild?: boolean;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ value, label, isChild, ...others }: ItemProps, ref) => {
  const { appState } = useAppContext();

  const isSuggested = appState.mlComponentSuggestions.some(suggestion => suggestion.componentId === value);

  return (
    <div ref={ref} {...others} key={value}>
      <Tooltip hidden={!isSuggested} label={'Suggested by AI'}>
        <Group spacing={7} position="apart">
          <Text
            lineClamp={1}
            ml={isChild ? 'sm' : undefined}
            /* @ts-ignore */
            color={isSuggested && !others['data-selected'] ? '#5B60E3' : undefined}>
            {label}
          </Text>
          {/* @ts-ignore */}
          {isSuggested && (
            /* @ts-ignore */
            <IconSparkles size={16} color={isSuggested && !others['data-selected'] ? '#5B60E3' : undefined} />
          )}
        </Group>
      </Tooltip>
    </div>
  );
});
export function NewRequestForm({
  newRequestForm,
  onBlur,
  reRunInit,
  matchesIdeas,
  loading,
  setLoading,
  mx,
}: {
  matchesIdeas: any[];
  newRequestForm: UseFormReturnType<
    NewRequestFormType,
    // eslint-disable-next-line no-unused-vars
    (values: NewRequestFormType) => NewRequestFormType
  >;
  loading: {
    suggestions: boolean;
    search: boolean;
  };
  setLoading: Dispatch<
    SetStateAction<{
      suggestions: boolean;
      search: boolean;
    }>
  >;
  // eslint-disable-next-line no-unused-vars
  reRunInit: (loading?: boolean) => Promise<void>;
  onBlur: () => void;
  mx?: SystemProp<SpacingValue> | undefined;
}) {
  const auth0 = useAuth0();
  const _appStorage = useStorageSuspense(appStorage);

  const { appState } = useAppContext();
  const [CreateRequestLoading, setCreateRequestLoading] = useState(false);
  const handleCreateRequest = (body: any) => {
    setCreateRequestLoading(true);
    createNewRequest(
      {
        ...body,
        title_origin_url: _appStorage.titleCurrentUrl,
        description_origin_url: _appStorage.descriptionCurrentUrl,
      },
      auth0,
    )
      .then(async (res: any) => {
        console.log({ handleCreateRequest: res });
        await newRequestForm.setValues({
          evidenceTitle: '',
          evidenceDescription: '',
          relatedObject: '',
          orgId: '',
          orgName: '',
          priority: '',
          domain: '',
          domainId: '',
          area: '',
          areaId: '',
          ideaId: '',
          match_id: '',
          match_type: '',
          match_text_id: '',
          match_chat_id: '',
          match_yes_score: '',

          suggestedSearch: '',
          disabledInputs: [],
        });
        await appStorage.setTab('my-requests');
        await appStorage.setDescription(null, null);
        await appStorage.setTitle(null, null);
      })
      .finally(() => {
        setCreateRequestLoading(false);
        reRunInit(false);
        closeAllModals();
      });
  };
  // console.log({
  //   domains: appState.domains,
  //   components: appState.components,
  //   requestPriorities: appState.requestPriorities,
  //   objectCustomizations: appState?.objectCustomizations
  // });

  // console.log({ objectCustomizations: appState?.objectCustomizations });
  console.log({ newRequestForm: newRequestForm.errors });
  return (
    <form
      onSubmit={newRequestForm.onSubmit(values => {
        console.log({ values });
        handleCreateRequest(values);
      })}>
      <Stack spacing={12}>
        <Textarea
          mx={mx}
          label="Description"
          placeholder="What problem or need should it solve? Who is this for (persona)?"
          {...newRequestForm.getInputProps('evidenceDescription')}
          minRows={2}
          autosize
          withAsterisk
          onBlur={onBlur}
          disabled={newRequestForm.values.disabledInputs.includes('evidenceDescription')}
          rightSection={
            newRequestForm.values.evidenceDescription !== '' ? (
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={async () => {
                  newRequestForm.setFieldValue('evidenceDescription', '');
                  await appStorage.setDescription(null, null);
                }}
                p={0}>
                <IconX radius="50%" size={14} />
              </ActionIcon>
            ) : undefined
          }
        />

        {_appStorage.tab === 'create-new-request' && (
          <SuggestedSearch
            newRequestForm={newRequestForm}
            matchesIdeas={matchesIdeas}
            loading={loading}
            setLoading={setLoading}
          />
        )}

        <TextInput
          mx={mx}
          label="Title"
          placeholder="What would you like to add?"
          {...newRequestForm.getInputProps('evidenceTitle')}
          withAsterisk
          onBlur={onBlur}
          disabled={newRequestForm.values.disabledInputs.includes('evidenceTitle')}
          rightSection={
            newRequestForm.values.evidenceTitle !== '' ? (
              <ActionIcon
                size="sm"
                variant="transparent"
                onClick={async () => {
                  newRequestForm.setFieldValue('evidenceTitle', '');
                  await appStorage.setTitle(null, null);
                }}
                p={0}>
                <IconX radius="50%" size={14} />
              </ActionIcon>
            ) : undefined
          }
        />
        <RelatedObjectInput newRequestForm={newRequestForm} mx={mx} />
        <Select
          mx={mx}
          label="Priority"
          placeholder="Choose priority"
          data={appState.requestPriorities.map((priority: any) => ({
            label: priority.label,
            value: priority.key.toLowerCase(),
          }))}
          {...newRequestForm.getInputProps('priority')}
          disabled={newRequestForm.values.disabledInputs.includes('priority')}
          withAsterisk
        />

        {appState.showDomain && (
          <Select
            mx={mx}
            label="Domain"
            placeholder="Choose domain"
            data={appState.domains.map((domain: any) => ({
              label: domain.name,
              value: domain._id,
            }))}
            onChange={value => {
              value && newRequestForm.setFieldValue('domainId', value);
              newRequestForm.setValues({ areaId: '', area: '' });
            }}
            value={newRequestForm.values.domainId}
            error={newRequestForm.getInputProps('domainId').error}
            // {...newRequestForm.getInputProps("domain")}
            disabled={newRequestForm.values.disabledInputs.includes('domainId')}
            withAsterisk
          />
        )}

        <Select
          mx={mx}
          label="Product area"
          placeholder="Choose Product area"
          data={prepareProductAreaData(appState, newRequestForm)}
          {...newRequestForm.getInputProps('areaId')}
          disabled={
            newRequestForm.values.disabledInputs.includes('areaId') ||
            (appState.showDomain && newRequestForm.values.domainId == '')
          }
          withAsterisk
          itemComponent={SelectItem}
          description={appState.showDomain && newRequestForm.values.domainId == '' ? 'Select domain first' : undefined}
        />

        <Group position="right" my={20} mx={mx}>
          <Button
            leftIcon={<IconArrowNarrowRight size={16} />}
            h={40}
            loading={CreateRequestLoading}
            sx={{ backgroundColor: '#5B60E3' }}
            w="50%"
            type="submit">
            Create request
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
