import React from 'react';
import { Grid, Avatar, Group, ActionIcon, Text, Menu, Box } from '@mantine/core';
import { IconDots, IconTrash, IconPencil, IconX, IconSend } from '@tabler/icons-react';
import moment from 'moment';
import { useState } from 'react';
import MentionTextarea, { MentionSuggestion } from './MentionTextarea';
import { useMentions } from './MentionTextarea/MentionContext';
import { searchUsers } from '@src/Api';
import { SourceIcon } from '@src/utils/SourceIcon';
import { getInitials } from '@extension/shared';
import { useAuth0 } from '@auth0/auth0-react';
import { getBagelId } from '@src/utils/utils';

const Comment = (props: {
  comment: any;
  index: number;
  handleSubmitComment: () => void;
  // eslint-disable-next-line no-unused-vars
  editComment: (comment: any, text: string) => void;
  // eslint-disable-next-line no-unused-vars
  deleteComment: (commentId: string) => void;
  loading: any;
}) => {
  const auth0 = useAuth0();
  const { setSuggestions } = useMentions();

  const [value, setValue] = useState(props.comment.text);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState({
    getSuggestions: false,
    comment: false,
    mentions: false,
  });

  const canEdit = getBagelId(auth0?.user) === props.comment.userId;
  const editEnable = () => {
    setEdit(!edit);
  };

  const searchUser = async ({ query }: { query: string }): Promise<MentionSuggestion[]> => {
    setLoading(prev => ({
      ...prev,
      mentions: true,
    }));
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
      setLoading(prev => ({
        ...prev,
        mentions: false,
      }));
    }
  };

  return (
    <Grid mb={0} p={0} m={0} key={props.index} mr={2}>
      <Grid.Col span="content">
        <Avatar size="sm" color={'orange'} radius="xl">
          {getInitials(props.comment.userName)}
        </Avatar>
      </Grid.Col>
      <Grid.Col pt={0} span="auto">
        <Group position="apart">
          <Text size="xs" mt={4}>
            {props.comment.userName}
          </Text>
          <Group position="right" spacing={8}>
            {canEdit && (
              <Menu>
                <Menu.Target>
                  <Box h={16}>
                    <IconDots size={16} />
                  </Box>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={edit ? <IconX size={14} /> : <IconPencil size={14} />} onClick={editEnable}>
                    {edit ? 'Close edit' : 'Edit comment'}
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    icon={<IconTrash size={14} />}
                    onClick={() => props.deleteComment(props.comment._id)}>
                    Delete comment
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
            {props.comment.createdAt && <Text size="xs">{moment(props.comment.createdAt).fromNow()}</Text>}
          </Group>
        </Group>
        <MentionTextarea<MentionSuggestion>
          placeholder="Your comment"
          getMentions={searchUser}
          commentValue={value}
          setCommentValue={setValue}
          editable={canEdit && edit}
          debounceWait={1000}
          sx={
            !(canEdit && edit)
              ? {
                  background: '#5C5CEA33',
                  borderRadius: 8,
                  borderWidth: 0,
                }
              : undefined
          }
          rightSection={
            <ActionIcon
              onClick={() => {
                setEdit(!edit);
                props.editComment(props.comment, value);
              }}
              size="md"
              mr={4}
              variant="filled"
              color="blue"
              radius="md"
              loading={loading.comment}
              disabled={value === ''}>
              <IconSend size={20} />
            </ActionIcon>
          }
        />
        {props.comment.origin && (
          <Group mt={3} position="right">
            <SourceIcon sourceName={props.comment.origin} width={15} height={15} />
          </Group>
        )}
      </Grid.Col>
    </Grid>
  );
};

export default Comment;
