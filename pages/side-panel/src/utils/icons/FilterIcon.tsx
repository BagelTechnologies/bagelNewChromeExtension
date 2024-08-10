import * as React from 'react';
const FilterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} fill="none" {...props}>
    <path
      stroke="#161832"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M1.293 1.293A1 1 0 0 0 1 2v2.586a1 1 0 0 0 .293.707l6.414 6.414a1 1 0 0 1 .293.707V19l4-4v-2.586a1 1 0 0 1 .293-.707l6.414-6.414A1 1 0 0 0 19 4.586V2a1 1 0 0 0-1-1H2a1 1 0 0 0-.707.293Z"
    />
  </svg>
);
export default FilterIcon;
