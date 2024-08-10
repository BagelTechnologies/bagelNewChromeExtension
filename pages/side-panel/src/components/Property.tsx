import * as React from 'react';
import { Tooltip, Box, Group, Text } from '@mantine/core';
// eslint-disable-next-line import/named
import { TablerIconsProps } from '@tabler/icons-react';
import { SourceIcon } from '../utils/SourceIcon';
import BusinessCategoryIcon from './icons/BusinessCategoryIcon';

const Property = ({
  label,
  text,
  Icon,
  bg,
  BusinessCategory,
  origin,
}: {
  label: string;
  text: string;
  // eslint-disable-next-line no-unused-vars
  Icon?: (props: TablerIconsProps | any) => React.JSX.Element;
  BusinessCategory?: string;
  bg?: string;
  origin?: string;
}) => {
  return (
    <Tooltip label={label}>
      <Box
        sx={{
          backgroundColor: bg ?? '#F8F9FB',
          borderRadius: 8,
          padding: '4px 8px',
          fontSize: 14,
        }}>
        <Group noWrap spacing={10}>
          {Icon ? <Icon size={16} /> : ''}
          {origin ? <SourceIcon sourceName={origin} width={15} height={15} /> : ''}
          {BusinessCategory ? <BusinessCategoryIcon businessName={BusinessCategory} /> : ''}
          <Text lineClamp={1}>{text}</Text>
        </Group>
      </Box>
    </Tooltip>
  );
};
export default Property;
