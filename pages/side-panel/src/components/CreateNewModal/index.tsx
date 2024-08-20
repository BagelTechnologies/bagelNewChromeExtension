import { useForm } from '@mantine/form';
import { NewRequestForm } from './NewRequestForm';
import { useEffect, useState } from 'react';
import { useHover } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '@src/AppContext';
import { appStorage } from '@extension/storage';
import { getSuggestions, useStorageSuspense } from '@extension/shared';

type NewRequestFormKeys =
  | 'evidenceTitle'
  | 'evidenceDescription'
  | 'relatedObject'
  | 'orgId'
  | 'priority'
  | 'domain'
  | 'domainId'
  | 'area'
  | 'areaId'
  | 'ideaId';

export type NewRequestFormType = {
  evidenceTitle: string;
  evidenceDescription: string;
  relatedObject: string;
  orgId: string;
  orgName: string;
  priority: string;
  domain: string;
  domainId: string;
  area: string;
  areaId: string;
  ideaId: string;
  match_id: string;
  match_type: string;
  match_text_id: string;
  match_chat_id: string;
  match_yes_score: string | number;

  suggestedSearch: string;
  disabledInputs: NewRequestFormKeys[];
};
export function CreateNewModal() {
  const auth0 = useAuth0();
  // const token = await auth0.getAccessTokenSilently();
  // const apiClient = new APIClient(token);

  const { appState } = useAppContext();
  const _appStorage = useStorageSuspense(appStorage);

  const { hovered: suggestedIdeasHovered } = useHover();

  const [matchesIdeas, setMatchesIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    suggestions: false,
    search: false,
  });
  const showDomain = appState.showDomain;
  //   appState?.objectCustomizations?.IdeaPageDisplay.display.domain;

  const newRequestForm = useForm<NewRequestFormType>({
    initialValues: {
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
    },

    validate: {
      evidenceTitle: value => (value.trim().length > 0 ? null : 'Please provide a evidence title'),
      evidenceDescription: value => (value.trim().length > 2 ? null : 'Please provide a valid evidence description'),
      domainId: value => (!showDomain || value.trim().length > 0 ? null : 'Please choose a domain'),
      areaId: value => (value.trim().length > 0 ? null : 'Please choose an area'),
      orgId: value => (value.trim().length > 0 ? null : 'Please choose related customer'),
    },
  });

  const fetchSuggestions = () => {
    setLoading((prev: any) => ({ ...prev, suggestions: true }));
    getSuggestions({
      title: newRequestForm.values.evidenceTitle,
      text: newRequestForm.values.evidenceDescription,
      auth0,
    })
      .then((response: any) => {
        console.log({ response });
        // response?.suggestions?.ideaMatches?.map(({ idea }: any) => idea) || []
        const _matchesIdeas =
          response?.ideaMatches?.map((match: any) => ({
            ...match.idea,
            match_id: match._id,
            match_type: match.type,
            match_text_id: match.textId,
            match_chat_id: match.chatId,
            match_yes_score: match.yes,
          })) || [];

        newRequestForm.setFieldValue('suggestedSearch', '');
        setMatchesIdeas(_matchesIdeas);
      })
      .catch((e: any) => {
        console.error(e);
      })
      .finally(() => {
        setLoading((prev: any) => ({ ...prev, suggestions: false }));
      });
  };

  const onInputBlur = () => {
    console.log(`blur`);
    if (!loading.suggestions && newRequestForm.isDirty() && newRequestForm.values.ideaId == '') fetchSuggestions();
  };

  useEffect(() => {
    if (appState?.defaultRequestPriority && newRequestForm.values.priority == '') {
      newRequestForm.setFieldValue('priority', appState?.defaultRequestPriority?.toLowerCase());
    }
  }, [appState?.requestPriorities]);

  useEffect(() => {
    if (
      _appStorage.title &&
      _appStorage.title !== newRequestForm.values.evidenceTitle &&
      (newRequestForm.values.evidenceTitle !== '' || _appStorage.title != null)
    ) {
      newRequestForm.setFieldValue('evidenceTitle', _appStorage.title);
      onInputBlur();
    }

    if (
      _appStorage.description &&
      _appStorage.description !== newRequestForm.values.evidenceDescription &&
      (newRequestForm.values.evidenceDescription !== '' || _appStorage.description != null)
    ) {
      newRequestForm.setFieldValue('evidenceDescription', _appStorage.description);
      onInputBlur();
    }
  }, [_appStorage.title, _appStorage.description]);

  return (
    <NewRequestForm
      newRequestForm={newRequestForm}
      reRunInit={async (loading: boolean | undefined) => await console.log(loading)}
      onBlur={() => {
        console.log('onInputBlur', { suggestedIdeasHovered });
        if (!suggestedIdeasHovered) {
          onInputBlur();
        }
      }}
      matchesIdeas={matchesIdeas}
      loading={loading}
      setLoading={setLoading}
      mx={'1rem'}
    />
  );
}
