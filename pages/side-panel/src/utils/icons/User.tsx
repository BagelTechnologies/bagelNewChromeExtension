import * as React from 'react';
const User = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.width}
    height={props.height}
    fill="none"
    {...props}>
    <path fill="url(#a35)" d="M0 0h35v35H0z" />
    <defs>
      <pattern id="a35" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b35" transform="scale(.00781)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b35"
        width={128}
        height={128}
      />
    </defs>
  </svg>
);
export default User;
