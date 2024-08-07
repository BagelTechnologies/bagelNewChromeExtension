import * as React from 'react';
import { Box, LoadingOverlay, Text, Card, Group, ActionIcon, Center } from '@mantine/core';

// eslint-disable-next-line import/named
import { UseFormReturnType } from '@mantine/form';
import { NewRequestFormType } from '.';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
// import { searchIdeas } from "../../Api";
import { useState } from 'react';
// import { useDebouncedValue } from '@mantine/hooks';
// import { useAppContext } from "@src/AppContext";
import { IdeasCard } from '../IdeasCard';
// eslint-disable-next-line import/named
import { Carousel, Embla } from '@mantine/carousel';

export function SuggestedSearch({
  matchesIdeas,
  newRequestForm,
  loading,
  // setLoading,
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
  setLoading: React.Dispatch<
    React.SetStateAction<{
      suggestions: boolean;
      search: boolean;
    }>
  >;
}) {
  // const { apiUrl, signedRequest } = useAppContext();
  // const [searchValue, setSearchValue] = useState('');
  // const [debounced] = useDebouncedValue(searchValue, 1500);
  // const [searchResults, setSearchResults] = useState<any[]>();
  const [embla, setEmbla] = useState<Embla | null>(null);
  const [slidesInView, setSlidesInView] = useState<number | null>(null);

  const handleNext = () => embla?.scrollNext();
  const handlePrev = () => embla?.scrollPrev();
  // const fetchOptions = (_query: string) => {
  //   // if (_query !== "") {
  //   //   setLoading((prev: any) => ({ ...prev, search: true }));
  //   //   searchIdeas(apiUrl, signedRequest, _query)
  //   //     .then((response) => {
  //   //       setSearchResults(response.ideas);
  //   //     })
  //   //     .catch((e) => {
  //   //       console.error(e);
  //   //     })
  //   //     .finally(() => {
  //   //       setLoading((prev: any) => ({ ...prev, search: false }));
  //   //     });
  //   // }
  // };

  // useEffect(() => {
  //   setSearchValue(newRequestForm.values.suggestedSearch);
  // }, [newRequestForm.values.suggestedSearch]);

  // useEffect(() => {
  //   fetchOptions(debounced);
  // }, [debounced]);

  return (
    <Box>
      <Box
        mx="1rem"
        p={8}
        bg="#5C5CEB1A"
        sx={{
          borderRadius: ' 4px 4px 0px 0px',
        }}>
        <Group position="apart">
          <Text weight={500} size={14} pl={4}>
            Matching product Ideas
          </Text>
          <Group spacing={0}>
            <ActionIcon onClick={handlePrev}>
              <IconChevronLeft size={16} />
            </ActionIcon>
            <Text
              sx={{ textAlign: 'center', color: matchesIdeas.length === 0 || loading.suggestions ? 'gray' : 'black' }}
              size={14}
              w={35}>
              {slidesInView}/{matchesIdeas.length}
            </Text>
            <ActionIcon onClick={handleNext}>
              <IconChevronRight size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>
      {matchesIdeas.length === 0 && (
        <Box
          mx="1rem"
          p={20}
          sx={{
            borderRadius: '0px 0px 4px 4px',
            border: 'solid 1px #5C5CEB1A',
            background: '#fff',
          }}>
          <Center>
            <Card
              p={12}
              radius="sm"
              bg="#5C5CEB1A"
              sx={{
                textAlign: 'center',
                color: '#585C68',
              }}>
              <LoadingOverlay visible={loading.suggestions} overlayBlur={2} />

              <Text>
                There are no ideas that match your description. Please describe your request to get matching ideas.
              </Text>
            </Card>
          </Center>
        </Box>
      )}
      <Carousel
        getEmblaApi={setEmbla}
        slideSize="calc(100% - (2rem - 4px))"
        //@ts-ignore
        slideGap={'0'}
        loop
        onSlideChange={index => setSlidesInView(index + 1)}
        // includeGapInSize
        withControls={false}>
        <LoadingOverlay visible={loading.suggestions} overlayBlur={2} />
        {matchesIdeas.map((idea, index) => (
          <Carousel.Slide key={index} maw="calc(100% - (2rem - 4px))">
            <IdeasCard newRequestForm={newRequestForm} item={idea} attached={idea.attached} />
          </Carousel.Slide>
        ))}
      </Carousel>
      {/* <Box
        p="sm"
        sx={{
          borderRadius: 8,
          backgroundColor: '#F5F6FE',
        }}>
        <Box>
          <Text weight={600}>
            {!hasMatches
              ? 'You can search for existing Product Ideas that may address this customer’s needs'
              : 'AI found existing Product Ideas that may address this customer’s needs'}
          </Text>
          <Text pb={!hasMatches ? 'sm' : 0} size={14} weight={400} color="#3B4158">
            {!hasMatches
              ? 'Found one? add this customer as a stakeholder to help prioritize this Idea'
              : 'Add this customer as a stakeholder to help prioritize this Idea'}
          </Text>
        </Box>
        {!loading.suggestions && (
          <TextInput
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              boxShadow: `rgb(245, 246, 254) 0px 0px 10px 5px`,
              borderRadius: 8,
            }}
            icon={<IconSearch size={16} />}
            rightSection={loading.search || loading.suggestions ? <Loader size={16} /> : undefined}
            placeholder="Search for existing product Ideas"
            {...newRequestForm.getInputProps('suggestedSearch')}
          />
        )}
        {loading.suggestions ||
          (loading.search &&
            Array.from({ length: 3 }).map((_, index) => <Skeleton mt={8} height={120} width={'100%'} key={index} />))}
        {(matchesIdeas?.length > 0 && hasMatches && newRequestForm.values.suggestedSearch === ''
          ? matchesIdeas
          : searchResults
        )?.map((idea: any) => (
          <IdeasCard key={idea._id} newRequestForm={newRequestForm} item={idea} attached={idea.attached} />
        ))}
      </Box> */}
    </Box>
  );
}
