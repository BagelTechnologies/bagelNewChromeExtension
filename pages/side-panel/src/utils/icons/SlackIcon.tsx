import * as React from 'react';

const SlackIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height="px" viewBox="0 0 20 20" {...props}>
    <path
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: '#36c5f0',
        fillOpacity: 1,
      }}
      d="M7.332 0c-1.105 0-2 .898-2 2 0 1.102.895 2 2 2h2.004V2a2.007 2.007 0 0 0-2.004-2m0 5.332H2a1.999 1.999 0 1 0 0 4h5.332a1.996 1.996 0 0 0 2-2 2.001 2.001 0 0 0-2-2Zm0 0"
    />
    <path
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: '#2eb67d',
        fillOpacity: 1,
      }}
      d="M20 7.332a2.004 2.004 0 0 0-2-2c-1.105.004-2 .898-2 2v2h2c1.105 0 2-.895 2-2Zm-5.332 0V2a1.999 1.999 0 1 0-4 0v5.332c-.004 1.106.895 2 2 2s2-.895 2-2Zm0 0"
    />
    <path
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: '#ecb22e',
        fillOpacity: 1,
      }}
      d="M12.668 20c1.105 0 2-.898 2-2 0-1.102-.895-2-2-2h-2.004v2c0 1.102.899 1.996 2.004 2Zm0-5.336H18c1.105 0 2-.894 2-1.996 0-1.105-.895-2-2-2.004h-5.332a2.001 2.001 0 0 0-2 2c-.004 1.106.895 2 2 2Zm0 0"
    />
    <path
      style={{
        stroke: 'none',
        fillRule: 'evenodd',
        fill: '#e01e5a',
        fillOpacity: 1,
      }}
      d="M0 12.668c0 1.102.895 1.996 2 1.996s2-.894 2-1.996v-2H2c-1.105 0-2 .895-2 2Zm5.332 0V18a1.999 1.999 0 1 0 4 0v-5.332c.004-1.102-.895-2-2-2s-2 .895-2 2"
    />
  </svg>
);

export default SlackIcon;
