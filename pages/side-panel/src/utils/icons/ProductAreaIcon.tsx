import * as React from 'react';
const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={25}
    height={25}
    fill="none"
    {...props}>
    <path fill="url(#a32)" d="M0 0h25v25H0z" />
    <defs>
      <pattern id="a32" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b32" transform="scale(.00781)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAAJ1BMVEVHcEwVFzIVFjEVFzESEi8TFi8UFzEQEDISEjEVFzAAAAAVFzEWGDJuxOCIAAAADHRSTlMAj2npG07EDyiEAsC3y71gAAAAAWJLR0QAiAUdSAAAAk9JREFUeJztm+GSgjAMhBFFEHn/571znMPWpmnSTdCbSf/i7n5iSUGaYUDGPN23+zRDHkj6dXuO6wcYXumfYHhPP5aBTj+KgUv3Z2inezJI030YmPSbPwOXvqzDuvgy8OnPwTJg8evYTG8xjBDAIkrnGRYgnzoBdDrDAJ2CU/mb8vOKmLEnUwCWgb5ezAEqDNWr1QOgYODqpBNAwtCo0n4AT4bmGmECcKrXusq4LbvWBICtt0T6mmlNAAYpw1+lcgAQMCR10geAZcirtBtAhaFYIzwBCgZqhXIGeDDsR8n10R8AOhoAARAAARAAARAAARAAARAAARAA/wTgsptc1BENrSR9PG+vcR5LnzpAW6tLr/hUAERadTrlQwFItT3phU8BoNB2puc+OYBO25+e+CQAaq0ivf6b7gAd2os0/feTmm8n174YZsFn9AwS7Xl8/N8/NR06Z4hIOw2zyKHnGpFpB+LFHHKlqLXFOxGkVvRoqZcynz0DnI/LHKi+ljrmKmAANv860ATYPCvhO0BPPbfQQiuahRZa0y200F2NhRa6r7PQQne2Flro3t5CCz3dWGgdn/5kRwMgAAIgAAIgAAIgAAIgAAIgAALgiwD0+0KRPaVrAaDdGYvsqk21CQDlUzFB9hW/aXOAwocyQXZWl1rq73pufziyt5zUNjqJchNkd31N2+ilSkyQ/gK2D2vlusl2E6TDot2JpuslzB0gbTI9e3yEXTaC9B4GhF/bq2XL39GtZsgv68FEOoutupKR3mqrvmyku9yqMx3pr5dqfwBKwh2kv0JDfgAAAABJRU5ErkJggg=="
        id="b32"
        width={128}
        height={128}
      />
    </defs>
  </svg>
);
export default SvgComponent;
