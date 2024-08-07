import * as React from 'react';
const TickInCircle = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width}
    height={props.height}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="icon icon-tabler icon-tabler-check"
    viewBox="0 0 24 24"
    {...props}>
    <path stroke="none" d="M0 0h24v24H0z" />
    <path d="m5 12 5 5L20 7" />
  </svg>
);
export default TickInCircle;
