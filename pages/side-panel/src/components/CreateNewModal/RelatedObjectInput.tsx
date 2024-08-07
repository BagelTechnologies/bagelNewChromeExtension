import React from 'React';
// eslint-disable-next-line import/named
import { Loader, Autocomplete, SystemProp, SpacingValue } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
// eslint-disable-next-line import/named
import { UseFormReturnType } from '@mantine/form';
import { useState, useEffect } from 'react';
// import { searchItems } from "../../Api";
import { NewRequestFormType } from '.';
import { useDebouncedValue } from '@mantine/hooks';
import { searchOrgs } from '@src/Api';
import { useAuth0 } from '@auth0/auth0-react';

export function RelatedObjectInput({
  newRequestForm,
  mx,
}: {
  newRequestForm: UseFormReturnType<
    NewRequestFormType,
    // eslint-disable-next-line no-unused-vars
    (values: NewRequestFormType) => NewRequestFormType
  >;
  mx: SystemProp<SpacingValue> | undefined;
}) {
  // const { appState } = useAppContext();
  const auth0 = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  // const [query, setQuery] = useState("");

  const [debounced] = useDebouncedValue(newRequestForm.values.orgName, 200);

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const fetchOptions = async (_query: string) => {
    // console.log({ _query });
    setLoading(true);
    try {
      const response = await searchOrgs(_query, auth0);
      const { accounts }: { accounts: any[] | undefined } = response;
      console.log({ accounts });
      const options = (
        Array.isArray(accounts) && accounts.length > 0 ? accounts.filter(op => op.name !== null) : []
      ).map((item: any) => ({
        id: item._id,
        value: item.name,
      }));

      console.log(Array.isArray(accounts) && accounts.length > 0 ? accounts.filter(op => op.name !== null) : []);

      console.log({
        response,
        options,
        op: Array.isArray(accounts) && accounts.length > 0 ? accounts.filter(op => op.name !== null) : [],
      });

      setSearchResults(options);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounced !== '' && !searchResults.map(r => r.value).includes(debounced)) {
      fetchOptions(debounced);
    } else if (debounced == '') {
      newRequestForm.setValues({
        orgId: '',
        orgName: '',
      });
    }
  }, [debounced]);

  return (
    <div style={{ position: 'relative' }}>
      <Autocomplete
        mx={mx}
        // styles={{
        //   label: {
        //     fontWeight: 600,
        //   },
        // }}
        label={`Related Customer`}
        required
        placeholder="Select related customer"
        icon={<IconSearch size={16} />}
        data={searchResults}
        rightSection={loading ? <Loader size={16} /> : undefined}
        onItemSubmit={item => {
          newRequestForm.setValues({ orgId: item.id, orgName: item.value });
        }}
        {...newRequestForm.getInputProps('orgName')}
        disabled={newRequestForm.values.disabledInputs.includes('orgId')}
      />
    </div>
  );
}
