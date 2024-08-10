import * as React from 'react';
const Opportunity = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.width}
    height={props.height}
    fill="none"
    {...props}>
    <path fill="url(#a31)" d="M0 0h35v35H0z" />
    <defs>
      <pattern id="a31" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b31" transform="scale(.00781)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b31"
        width={128}
        height={128}
      />
    </defs>
  </svg>
);
export default Opportunity;
