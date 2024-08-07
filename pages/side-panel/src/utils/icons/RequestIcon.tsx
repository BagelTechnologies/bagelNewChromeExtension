import * as React from 'react';
const RequestIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props}>
    <g stroke="#5B60E3" strokeLinecap="round" strokeLinejoin="round">
      <path
        strokeMiterlimit={10}
        strokeWidth={1.6}
        d="M21 9v3c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4H7c-4 0-6-1-6-6V7c0-4 2-6 6-6h6"
      />
      <path fill="#5B60E3" strokeWidth={1.5} d="M18.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" opacity={0.2} />
      <path strokeWidth={1.6} d="M18.5 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path strokeWidth={2} d="M14.995 10h.009M10.995 10h.009M6.995 10h.008" />
    </g>
  </svg>
);
export default RequestIcon;
