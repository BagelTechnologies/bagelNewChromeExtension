import React, { useContext, createContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { listFields } from './Api';
// eslint-disable-next-line import/named
import { UseListStateHandlers, useListState } from '@mantine/hooks';

interface AppState {
  businessCategoryMapping: any[] | null;
  fields: any | null;
  components: any[];
  domains: any[];
  ideaStatuses: any[] | null;
  ideaPriorities: any[] | null;
  requestPriorities: any[];
  objectCustomizations: any | null;
  allComponents: any[] | null;
  accountAdditionalInfo: any | null;
  opportunityAdditionalInfo: any | null;
  defaultRequestPriority: string | null;
  priorityData: string[] | null;
  requestPrioritiesColors: any | null;
  currentAccount: any | null;
  showCommittedDate: boolean | null;
  custom_objects: any[];
  showDomain: boolean;
}

interface _AppContext {
  appState: AppState;
  // eslint-disable-next-line no-unused-vars
  updateAppState: (newState: Partial<AppState>) => void;
  records: any[][];
  recordsHandlers: UseListStateHandlers<any[]>;
  originalRecords: any[];
  setOriginalRecords: React.Dispatch<React.SetStateAction<any[]>>;
  matches: any[];
  setMatches: React.Dispatch<React.SetStateAction<any[]>>;
}

const initialAppState: AppState = {
  businessCategoryMapping: null,
  fields: null,
  components: [],
  domains: [],
  ideaStatuses: [],
  ideaPriorities: [],
  requestPriorities: [],
  objectCustomizations: null,
  allComponents: null,
  accountAdditionalInfo: null,
  opportunityAdditionalInfo: null,
  defaultRequestPriority: null,
  priorityData: null,
  requestPrioritiesColors: null,
  currentAccount: null,
  showCommittedDate: null,
  custom_objects: [],
  showDomain: false,
};

const AppContext = createContext<_AppContext>({
  appState: initialAppState,
  updateAppState: () => '', // Dummy function for initial context value
  records: [],
  //@ts-ignore
  recordsHandlers: () => '',
  originalRecords: [],
  setOriginalRecords: () => '',
  matches: [],
  setMatches: () => '',
});

export function AppContextProvider(props: { children: any }) {
  const auth0 = useAuth0();
  const [appState, setAppState] = useState<AppState>(initialAppState);
  const [records, recordsHandlers] = useListState<any[]>([]);
  const [originalRecords, setOriginalRecords] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);

  const updateAppState = (newState: Partial<AppState>) => {
    setAppState(prevState => ({ ...prevState, ...newState }));
  };

  const getFields = async () => {
    try {
      const res = await listFields(auth0);
      console.log('listFields done', { res });
      updateAppState({
        businessCategoryMapping: res.businessCategoryMapping[0]?.businessNames || [],
        fields: res,
        components: res.components || [],
        domains: res.domains || [],
        ideaStatuses: res.ideaStatuses?.sort((a: any, b: any) => a.index - b.index) || [],
        ideaPriorities: res.ideaPriorities?.sort((a: any, b: any) => a.index - b.index) || [],
        requestPriorities: res.requestPriorities?.sort((a: any, b: any) => a.index - b.index) || [],
        showDomain: res?.customizations?.EvidenceDisplay?.display?.domain,
        objectCustomizations: res?.customizations || {},
        allComponents: res.allComponents || [],
        accountAdditionalInfo: Object.entries(res?.customizations?.account?.fields || {}).reduce(
          (acc: any, [key, value]: any) => {
            if (value.isExtra) acc[key] = value;
            return acc;
          },
          {},
        ),
        opportunityAdditionalInfo: Object.entries(res?.customizations?.opportunity?.fields || {}).reduce(
          (acc: any, [key, value]: any) => {
            if (value.isExtra) acc[key] = value;
            return acc;
          },
          {},
        ),
        defaultRequestPriority: res.requestPriorities?.find((o: any) => o.isDefault)?.label || null,
        priorityData: res.requestPriorities ? res.requestPriorities.map((r: any) => r.label) : [],
        requestPrioritiesColors: res.requestPriorities?.reduce((acc: any, priority: any) => {
          acc[priority.label] = priority.chartColor;
          return acc;
        }, {}),
        currentAccount: res?.currentAccount || null,
        showCommittedDate: Boolean(res?.showCommittedDate?.value),
        custom_objects: res?.customizations?.custom_objects,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getFields();
  }, []);

  return (
    <AppContext.Provider
      value={{
        appState,
        updateAppState,
        records,
        recordsHandlers,
        originalRecords,
        setOriginalRecords,
        matches,
        setMatches,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('AppContext must be used within a Provider');
  }
  return context;
}

export default AppContext;
