// eslint-disable-next-line import/named
import { MentionOptions } from '@tiptap/extension-mention';
import { ReactRenderer } from '@tiptap/react';
import tippy, { type Instance as TippyInstance } from 'tippy.js';
import SuggestionList, { type SuggestionListRef } from './SuggestionList';

const DOM_RECT_FALLBACK: DOMRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {
    return {};
  },
};

export const createMentionSuggestionOptions = (): MentionOptions['suggestion'] => ({
  render: () => {
    let component: ReactRenderer<SuggestionListRef> | undefined;
    let popup: TippyInstance | undefined;

    return {
      onStart: async props => {
        component = new ReactRenderer(SuggestionList, {
          props: { ...props },
          editor: props.editor,
        });

        popup = tippy('body', {
          getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'auto',
        })[0];

        if (!popup.state.isVisible) {
          popup.show();
        }

        return {
          onDestroy: () => {
            popup?.destroy();
            component?.destroy();
          },
        };
      },
      onBeforeUpdate(props) {
        console.log('onBeforeUpdate', { props });
      },
      onUpdate(props) {
        console.log({ props });
        component?.updateProps(props);

        popup?.setProps({
          getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
        });
        if (!popup?.state.isVisible) {
          popup?.show();
        }
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup?.hide();
          return true;
        }

        if (!component?.ref) {
          return true;
        }

        return component.ref.onKeyDown(props);
      },

      onExit() {
        popup?.destroy();
        component?.destroy();
        // Remove references to the old popup and component upon destruction/exit.
        // (This should prevent redundant calls to `popup.destroy()`, which Tippy
        // warns in the console is a sign of a memory leak, as the `suggestion`
        // plugin seems to call `onExit` both when a suggestion menu is closed after
        // a user chooses an option, *and* when the editor itself is destroyed.)
        popup = undefined;
        component = undefined;
      },
    };
  },
});
