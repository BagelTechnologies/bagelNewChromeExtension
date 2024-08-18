import { Box, ActionIcon, Card } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import { addCommentToRequest, deleteCommentFromRequest, searchUsers, updateRequestComment } from '../../Api';
import Comment from './Comment';
// eslint-disable-next-line import/named
import { UseListStateHandlers } from '@mantine/hooks';
import MentionTextarea, { MentionSuggestion } from './Comment/MentionTextarea';
import { getUsersFromTags } from './Comment/tags';
import { useMentions } from './Comment/MentionTextarea/MentionContext';
import { useAuth0 } from '@auth0/auth0-react';

export function Comments({
  idea,
  request,
  comments,
  commentsHandlers,
}: {
  idea: any;
  request: any;
  origin: string;
  comments: any[];
  commentsHandlers: UseListStateHandlers<any>;
}) {
  const auth0 = useAuth0();
  const { setSuggestions, setLoading: setSuggestionsLoading } = useMentions();

  const [commentValue, setCommentValue] = useState('');
  const [loading, setLoading] = useState({
    getSuggestions: false,
    comment: false,
    mentions: false,
  });

  const handleSubmitComment = async () => {
    setLoading(prev => ({
      ...prev,
      comment: true,
    }));

    const _commentValue = commentValue.trim();
    const usersMentioned = getUsersFromTags(_commentValue);

    try {
      const response = await addCommentToRequest(auth0, request._id, _commentValue, usersMentioned, idea?._id);
      if (response.success) {
        commentsHandlers.prepend(response.comment);
        setCommentValue('');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(prev => ({
        ...prev,
        comment: false,
      }));
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      await deleteCommentFromRequest(auth0, commentId, idea?._id);
      const index = comments.findIndex(c => c._id === commentId);
      if (index !== -1) {
        commentsHandlers.remove(index);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const editComment = async (comment: any, text: string) => {
    const commentValue = text.trim();

    try {
      await updateRequestComment(auth0, comment._id, { text: commentValue }, idea?._id);
      const index = comments.findIndex(c => c._id === comment._id);
      if (index !== -1) {
        commentsHandlers.setItem(index, { ...comment, text: commentValue });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const searchUser = async ({ query }: { query: string }): Promise<MentionSuggestion[]> => {
    setSuggestionsLoading(true);
    try {
      const { members } = await searchUsers(query, auth0);
      const suggestions = members?.map((user: any) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      }));
      setSuggestions(suggestions);
      return suggestions;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    } finally {
      setSuggestionsLoading(false);
    }
  };

  return (
    <Card p={0} h="100%">
      <Box
        h="100%"
        sx={{
          overflowY: 'scroll',
          paddingBottom: '64px',
        }}>
        {comments.map((comment: any, index: number) => (
          <Comment
            comment={comment}
            index={index}
            key={comment._id}
            handleSubmitComment={handleSubmitComment}
            editComment={editComment}
            deleteComment={deleteComment}
            loading={loading}
          />
        ))}
      </Box>

      <Box
        sx={{
          background: '#F5F6FE',
          padding: 10,
          position: 'sticky',
          bottom: '0px',
          right: '0px',
          left: '0px',
        }}>
        <MentionTextarea<MentionSuggestion>
          placeholder="Your comment"
          getMentions={searchUser}
          commentValue={commentValue}
          setCommentValue={setCommentValue}
          debounceWait={1000}
          editable
          clearOnRightSectionClick
          sx={{
            background: '#fff',
            borderRadius: 8,
          }}
          rightSection={
            <ActionIcon
              onClick={handleSubmitComment}
              size="md"
              mr={4}
              variant="filled"
              color="blue"
              radius="md"
              loading={loading.comment}
              disabled={commentValue === ''}>
              <IconSend size={20} />
            </ActionIcon>
          }
        />
      </Box>
    </Card>
  );
}
