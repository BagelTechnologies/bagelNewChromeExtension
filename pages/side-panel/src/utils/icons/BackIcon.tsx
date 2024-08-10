import * as React from 'react';
const BackIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" {...props}>
    <path
      stroke="#AFAFAF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.111 17.667 7.944 13.5m0 0 4.167-4.167M7.944 13.5h11.112M1 13.5a12.5 12.5 0 1 1 25 0 12.5 12.5 0 0 1-25 0Z"
    />
  </svg>
);
export default BackIcon;
