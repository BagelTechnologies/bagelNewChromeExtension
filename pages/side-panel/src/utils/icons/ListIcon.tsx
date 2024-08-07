import * as React from 'react';
const ListIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.width}
    height={props.height}
    fill="none"
    {...props}>
    <path fill="url(#a24)" d="M0 0h35v35H0z" />
    <defs>
      <pattern id="a24" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b24" transform="scale(.00781)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAALVBMVEVHcEwVFzIQEywUFjAUFjAVFzETFDESFjAVFjAUFzAVFjEUFzENDSoUFzAWGDIjCp6VAAAADnRSTlMAjxdgR+EnOX6yyZkMbNDcecgAAAABYktHRACIBR1IAAAB7ElEQVR4nO2b3XKDIBCFETESNb7/4zYJ/4h2mi5zcnG+K2WnLrCwHAJVihBCCCHfgjZ2sOPtwiqJNbp0YKbdY/XRfbIKMpmsfUtuGevWL2ff+CdLaOutMgyF/9oqiYu4PpTbvP0d/e/7uw8aAc7C0yP8ienpYWwZtuC/aRXkOeDOyh2d/e+7mtPzeo+Pk/efWyXzQFaB+DwWI87HoLBKEkOrwiS/l3POp8TSKkno7RhkP/DD61y+mvMvfYj5mgrAQwAfhNlEGy6noeQsXNNn8YkIn4rhixF+OYYLErwke023S1E69xal73ZiZTkhhBBC1OyU8jI2l8l5/WVx/zvrXDjIFIfdDu77CNMpVcGWlkqV2PbfCxDE71AbihocrII4+fs4GrIoNKyCPFRbdq/Rf09R/uKW9sl1uaNpFeR+svMJXdB3X/Qi232aTacB7yuQW1sJ4kM2kxzFPtbFkNNVBKRlfOzauPt9uKqFcp8kSqskoalnP1K1XwWJP1LBewA+BuCzAJ4H4JkQvxbAV0O8HsArIrwmVHBVTAghhBAFPzO6vsrV/dQMfW6IPjmFnx2jT8/h9wfOyh2d/X/DHRL4LRr4PaLgkVe5eJVrR92ohCcifCqGL0b45RguSPCSTMH/v+DdTl7lIoQQQkD8AOcGNeWZ2F2ZAAAAAElFTkSuQmCC"
        id="b24"
        width={128}
        height={128}
      />
    </defs>
  </svg>
);
export default ListIcon;
