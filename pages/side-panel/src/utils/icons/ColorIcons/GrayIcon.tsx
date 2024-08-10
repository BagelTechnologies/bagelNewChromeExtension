import * as React from 'react';
const GrayIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" {...props}>
    <circle cx={10} cy={10} r={10} fill="#6B7280" />
  </svg>
);
export default GrayIcon;
