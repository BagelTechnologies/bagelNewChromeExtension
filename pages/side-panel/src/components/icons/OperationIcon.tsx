const OperationIcon = ({ width = '100%', height = '100%' }: { width: number | string; height: number | string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 100 100`}
    // {...props}
  >
    <g fill="#FEFEFE">
      <path
        d="M75.5 23.5c4.562-.92 7.395.746 8.5 5a9.454 9.454 0 0 0 2.5 1.5c2.595-.131 5.095.036 7.5.5a9.62 9.62 0 0 1 1.5 4.5c-4 4.333-4 8.667 0 13-.889 4.359-3.389 5.526-7.5 3.5-3.344 1.424-5.51 3.924-6.5 7.5-5.413 1.9-7.747.067-7-5.5-1.89.204-3.39-.463-4.5-2-4.289 2.105-7.122.938-8.5-3.5a21.836 21.836 0 0 0 4-7 41.942 41.942 0 0 1-4-6.5c1.457-5.096 4.291-6.096 8.5-3 3.54-1.501 5.373-4.168 5.5-8zm1 12c8.457.937 10.123 4.77 5 11.5-5.686 1.263-8.519-.904-8.5-6.5a27.241 27.241 0 0 1 3.5-5z"
        opacity={0.86}
      />
      <path
        d="M40.5 50.5c6.122-1.535 9.456.799 10 7a10.94 10.94 0 0 1 4.5 3c5.397-3.61 8.897-2.276 10.5 4-.923 2.424-2.423 4.424-4.5 6-1.297 3.654-.297 6.321 3 8 2.032 2.923 1.698 5.589-1 8-2.259 1.036-4.592 1.036-7 0a29.308 29.308 0 0 1-6.5 2c.273 6.236-2.727 8.402-9 6.5-1.487-6.993-5.654-9.493-12.5-7.5-5.544-3.08-5.877-6.747-1-11 1.362-3.959.362-6.959-3-9-.896-7.792 2.104-10.125 9-7 4.347-1.936 6.847-5.27 7.5-10zm1 15c7.648-.186 10.815 3.481 9.5 11-2.557 3.712-6.057 4.878-10.5 3.5-5.497-5.317-5.164-10.15 1-14.5z"
        opacity={0.887}
      />
    </g>
  </svg>
);
export default OperationIcon;
