import * as React from 'react';
const ArrowLeft = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" {...props}>
    <path
      stroke="#5B60E3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.5 8.25 6.75 12m0 0 3.75 3.75M6.75 12h10.5"
    />
  </svg>
);
export default ArrowLeft;
