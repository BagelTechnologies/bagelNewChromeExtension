import React from 'react';
import './styles.scss';

import Mention from '@tiptap/extension-mention';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// import { mentionSuggestionOptions } from "./suggestion";
// eslint-disable-next-line import/named
import { Box, Sx } from '@mantine/core';
import Placeholder from '@tiptap/extension-placeholder';
import { createMentionSuggestionOptions } from './suggestion';
import { useEffect } from 'react';
import { debounce } from 'lodash';

export type MentionSuggestion = {
  id: string;
  name: string;
  email: string;
  picture?: string;
};

interface MentionTextareaProps<T> {
  getMentions: ({
    // eslint-disable-next-line no-unused-vars
    query,
    // eslint-disable-next-line no-unused-vars
    editor,
  }: {
    query: string;
    editor: Editor;
  }) => Promise<T[]>;
  sx?: Sx;
  rightSection?: React.ReactNode;
  placeholder: string;
  commentValue: string;
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
  editable: boolean;
  debounceWait?: number | undefined;
  clearOnRightSectionClick?: boolean;
}

// Using generic type T for dynamic return type
const MentionTextarea = <T,>({
  sx,
  getMentions,
  rightSection,
  placeholder,
  commentValue,
  setCommentValue,
  editable,
  debounceWait,
  clearOnRightSectionClick,
}: MentionTextareaProps<T>) => {
  const getMentionsDebounced = React.useMemo(() => debounce(getMentions, debounceWait), [getMentions, debounceWait]);

  const editor = useEditor({
    onUpdate({ editor }) {
      setCommentValue(editor.getHTML());
    },
    editable,
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'mention',
        },
        suggestion: {
          //@ts-ignore
          items: ({ query }) => getMentionsDebounced({ query }),
          ...createMentionSuggestionOptions(),
        },
        renderHTML({ options, node }) {
          return [
            'span',
            {
              'data-id': node.attrs.id,
              'data-label': node.attrs.label,
              class: 'mention',
              'data-type': 'mention',
            },
            `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
          ];
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],

    content: commentValue,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable]);

  const handleRightSectionClick = (
    event: React.MouseEvent<HTMLElement>,
    // eslint-disable-next-line no-unused-vars
    originalOnClick?: (event: React.MouseEvent<HTMLElement>) => void,
  ) => {
    // Wrap the original onClick call in a Promise to handle both synchronous and asynchronous cases
    Promise.resolve()
      .then(() => {
        if (originalOnClick) {
          return originalOnClick(event);
        }
      })
      .then(() => {
        if (clearOnRightSectionClick) editor?.commands.setContent('');
      })
      .catch(error => {
        console.error('Error in original onClick:', error);
      });
  };

  const enhancedRightSection = React.useMemo(() => {
    if (React.isValidElement(rightSection)) {
      return React.cloneElement(rightSection as React.ReactElement<any>, {
        onClick: (event: React.MouseEvent<HTMLElement>) => {
          // Extract the original onClick if it exists
          const originalOnClick = (rightSection.props as any).onClick as (
            // eslint-disable-next-line no-unused-vars
            event: React.MouseEvent<HTMLElement>,
          ) => void;
          handleRightSectionClick(event, originalOnClick);
        },
      });
    }
    return rightSection;
  }, [rightSection]);

  if (!editor) {
    return null;
  }

  return (
    <Box className="wrap" sx={sx}>
      <EditorContent style={{ width: '100%', maxHeight: 100 }} editor={editor} />
      {rightSection && editable && <Box className="rightSection">{enhancedRightSection}</Box>}
    </Box>
  );
};

export default MentionTextarea;
