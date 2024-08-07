import * as React from 'react';
const Bin = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={props.width}
    height={props.height}
    fill="none"
    {...props}>
    <path fill="url(#a52)" d="M0 0h15v15H0z" />
    <defs>
      <pattern id="a52" width={1} height={1} patternContentUnits="objectBoundingBox">
        <use xlinkHref="#b52" transform="scale(.00781)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAA3NCSVQICAjb4U/gAAAANlBMVEVHcEwUFjAUFjAVFzESFC8DCSUVFzETFi8VFzEPEC4UFjATFDAUFjEVFzEUFzETFTAVFzEWGDKXmr5+AAAAEXRSTlMAZFa2IQfhQJESczN9xagt9xhPCKoAAAABYktHRACIBR1IAAAE10lEQVR4nO2b2XajMBBEgxdssI3N///snEzSmOW21AXCZx6mHhUtpVarSsjK15eCpurqPo26qxqpTwGnY2Zww/G0y/hVcPhvVDuMfxXG7/tr8fHv0vh9fy88/k0cv+9vZQnkkn+Juuj4egAKh+Cdge0ljXaoWTQPh17zItMMdfcgcAnUvVjl8w4EIirbKJX/E/j3CAQMdwtyZh023C1ImLViuFvgmbVmuFvAIqka7haQWa/xm/UAp9oz+ZdYmvVnAwAhiBvuFiTMevjLbqf6v/DN2sojhrsFlxyBfQMwCoFHYJ+PmjdOOQKlz/Nz3D0Cgwy0JU9Sc5xtG7wWQvApIzIsDKnJtymKZbJ/0osw1c4fJUCJdso3Kwbe7J9j4IlN031k+C6hts/9j2XXpz/8NwOrV9yJreP0+O88KK2HwybLmM0u31VKx1GiMsKhtXqF75jeZ85cxSEJCxNwT0JzmC2Xvus0t81enpkWzdyiudf1fZk/l0f/WMaKKpvXdTkCpkTTY3PDGfxzvGjn41Nl7hdgR5bHpPT3s/04rWuZPdsxWPnxW3fOdoEDrhXvoRY7HXbypNRy65AjwNlqhZGw8sE7vLueyebTYDMBPnhbYcYKPMXi5kwApxBXWNZsK5zqIxNAzYt7DFPlFWQCmEWCy+JkOYeZAO6jsBU4k7VdPBVoJmCiO1GSsBU4ZsACzQRQdMNWMOjYdCweSig1VjMtJWD7FtszAZtBm6+KwLFwXZ1eMV+QFQOTmB2CCeCOCVuBk6+cxEzAql6yhQxUUt7GaQI3KsxagaNZLGRIAKVUOWyjajcrCGD7wOcGkuUOkABWlT64aA05hEgAxxKsgBN2IDBJIiTwJAKCFThblsLCBHCyrCMOULQoLEwAJ8tS7gC7xbBgTZysYAUOWxR47BZtQ7ACZwp4IEga7+Q4IFiBs4g4VrwQU8gDmgHOC8fCWFmXAStwlARXFglQtmj3Lqil8dym5dZunpBuPDFoucW7N1ow1LckgbFm8gdnlkB2DkQgHj8ftIrbCEhWwLKFaUQEsKJkBcLEqGI4VAkQ320EJCtwVsz6HSc3EcDtIlmBk7NWNt4aRCDcOIHwJIhAOHwJ4DKSxBMBMg31Ch53EpkcESDbVH+ECGd8tEz+Gcbqj82AZkaDUaREK+CkpbUlApQrohVwxlN2E4Fo2yRIuGgWRICiJ1pBXOFSBHKKmQRdadEnH3SMH5F48ZYCXerRVkoRGG9h+XcoWm8SEyCAmkN5kQStN118pAiMNYfyIgkKN8UWCESbppGM4yi7gACJnv57NFKGhQQClD4rfpGH2ZLEAQESPdkKOG1B5IEAWYZsBSzooM9AgFRXtgI2AxgtVqRbQfioA9WiB6cMyAxgdaFnOg7IVsBmACsJBCh7VjxJoLyFMiBglcb7h8oyIDOw3TyKAPx6brMdK4h1JjxLSSn6YVltJJiV31B5mIPq/bMGk70ELyiOi2iveZrEpE/dq54lErwhqepXN20G4QwTCN3rZYD39zmsSFwXK6xA/qBPYoUVCG9eAuB3ORlc1zRyYJOR/vtueOa8fQ1sBbTHYUPm9t3Gh5TvZ6rajurLQxr/HbhiUBez9D/dyP8DW/qVs/5EtOz//ax5IXp6FRv+te6J7LnUPz1UCRv6Azp+jqd2QXxIAAAAAElFTkSuQmCC"
        id="b52"
        width={128}
        height={128}
      />
    </defs>
  </svg>
);
export default Bin;
