import * as React from 'react';

const JiraIcon = (props: any) => (
  <svg
    height={2500}
    viewBox="2.59 0 214.091 224"
    width={2361}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <linearGradient
      id="a"
      gradientTransform="matrix(1 0 0 -1 0 264)"
      gradientUnits="userSpaceOnUse"
      x1={102.4}
      x2={56.15}
      y1={218.63}
      y2={172.39}>
      <stop offset={0.18} stopColor="#0052cc" />
      <stop offset={1} stopColor="#2684ff" />
    </linearGradient>
    <linearGradient id="b" x1={114.65} x2={160.81} xlinkHref="#a" y1={85.77} y2={131.92} />
    <path
      d="M214.06 105.73 117.67 9.34 108.33 0 35.77 72.56 2.59 105.73a8.89 8.89 0 0 0 0 12.54l66.29 66.29L108.33 224l72.55-72.56 1.13-1.12 32.05-32a8.87 8.87 0 0 0 0-12.59zm-105.73 39.39L75.21 112l33.12-33.12L141.44 112z"
      fill="#2684ff"
    />
    <path d="M108.33 78.88a55.75 55.75 0 0 1-.24-78.61L35.62 72.71l39.44 39.44z" fill="url(#a)" />
    <path d="m141.53 111.91-33.2 33.21a55.77 55.77 0 0 1 0 78.86L181 151.35z" fill="url(#b)" />
  </svg>
);

export default JiraIcon;
