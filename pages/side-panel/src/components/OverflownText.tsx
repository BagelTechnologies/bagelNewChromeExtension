// eslint-disable-next-line import/named
import { Tooltip, Text, TextProps } from '@mantine/core';
import { useRef, useState, useEffect } from 'react';

export function OverflownText({ children, maw, ...props }: TextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOverflown, setIsOverflown] = useState(false);
  useEffect(() => {
    const element = ref.current!;
    // console.log({
    //   scrollWidth: element?.scrollWidth,
    //   clientWidth: element?.clientWidth,
    //   offsetHeight: element.offsetHeight,
    //   scrollHeight: element.scrollHeight,
    // });

    setIsOverflown(
      element ? element.offsetWidth < element.scrollWidth || element.offsetHeight < element.scrollHeight : false,
    );
  }, [children]);

  return (
    <Tooltip
      sx={{
        whiteSpace: 'break-spaces',
      }}
      label={children}
      disabled={!isOverflown}
      maw={maw || '80vw'}
      multiline>
      <Text ref={ref} {...props}>
        {children}
      </Text>
    </Tooltip>
  );
}
