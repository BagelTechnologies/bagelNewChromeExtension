import * as React from 'react';
const ArrowRight = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" {...props}>
    <path
      stroke="#5B60E3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.5 8.25 17.25 12m0 0-3.75 3.75M17.25 12H6.75"
    />
  </svg>
);
export default ArrowRight;
