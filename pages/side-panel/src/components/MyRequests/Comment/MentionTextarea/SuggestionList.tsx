import './SuggestionList.scss';

import { Avatar, Box, Collapse, Group, Skeleton, Text } from '@mantine/core';
import type { SuggestionOptions, SuggestionProps } from '@tiptap/suggestion';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { MentionSuggestion } from '.';
import { useMentions } from './MentionContext';
import { getInitials } from '@extension/shared';
// import { getInitials } from "../../../../lib/utils/getInitials";

export type SuggestionListRef = {
  // For convenience using this SuggestionList from within the
  // mentionSuggestionOptions, we'll match the signature of SuggestionOptions's
  // `onKeyDown` returned in its `render` function
  onKeyDown: NonNullable<ReturnType<NonNullable<SuggestionOptions<MentionSuggestion>['render']>>['onKeyDown']>;
};

// This type is based on
// https://github.com/ueberdosis/tiptap/blob/a27c35ac8f1afc9d51f235271814702bc72f1e01/packages/extension-mention/src/mention.ts#L73-L103.
// TODO(Steven DeMartini): Use the Tiptap exported MentionNodeAttrs interface
// once https://github.com/ueberdosis/tiptap/pull/4136 is merged.
interface MentionNodeAttrs {
  id: string | null;
  label?: string | null;
}

export type SuggestionListProps = SuggestionProps<MentionSuggestion>;

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>((props, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { suggestions, loading } = useMentions();
  // console.log({suggestions, setSuggestions, loading, setLoading})
  const selectItem = (index: number) => {
    // if (index >= props.items.length) {
    //   // Make sure we actually have enough items to select the given index. For
    //   // instance, if a user presses "Enter" when there are no options, the index will
    //   // be 0 but there won't be any items, so just ignore the callback here
    //   return;
    // }

    const suggestion = suggestions[index];

    // Set all of the attributes of our Mention node based on the suggestion
    // data. The fields of `suggestion` will depend on whatever data you
    // return from your `items` function in your "suggestion" options handler.
    // Our suggestion handler returns `MentionSuggestion`s (which we've
    // indicated via SuggestionProps<MentionSuggestion>). We are passing an
    // object of the `MentionNodeAttrs` shape when calling `command` (utilized
    // by the Mention extension to create a Mention Node).
    const mentionItem: MentionNodeAttrs = {
      id: suggestion.id,
      label: suggestion.name,
    };
    props.command(mentionItem);
  };

  const upHandler = () => {
    console.log('upHandler', { selectedIndex });
    setSelectedIndex((selectedIndex + suggestions.length - 1) % suggestions.length);
  };

  const downHandler = () => {
    console.log('downHandler', { selectedIndex });
    setSelectedIndex((selectedIndex + 1) % suggestions.length);
  };

  const enterHandler = () => {
    console.log('enterHandler', { selectedIndex });
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  useEffect(() => {
    console.log('useEffect', { props });
  }, [props]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return suggestions.length > 0 || loading ? (
    <div className="items">
      {suggestions.length > 0
        ? suggestions.map((item, index) => (
            <div key={index} style={{ padding: '0.2rem', paddingBottom: 0 }}>
              <button
                className={`item ${index === selectedIndex ? 'is-selected' : ''}`}
                key={index}
                onClick={() => selectItem(index)}>
                <Group noWrap>
                  <Avatar src={item.picture} radius="xl">
                    {getInitials(item.name)}
                  </Avatar>
                  <Box>
                    <Text>{item.name}</Text>
                    <Text color="dimmed" size="xs">
                      {item.email}
                    </Text>
                  </Box>
                </Group>
              </button>
            </div>
          ))
        : loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton sx={{ margin: '0.2rem' }} mb={4} height={45} width={190} key={index} />
          ))}
      <div style={{ height: 3 }}>{loading && <div className="loader-line"></div>}</div>
    </div>
  ) : props.query.length == 1 ? (
    <Collapse className="items" in={loading || props.query.length < 2}>
      <div className="item">
        <Text size="xs">Please search using at least 2 characters.</Text>
      </div>
    </Collapse>
  ) : null;
});

SuggestionList.displayName = 'SuggestionList';

export default SuggestionList;
