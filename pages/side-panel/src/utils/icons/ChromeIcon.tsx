import React from 'react';

interface ChromeIconProps {
  width?: string | number;
  height?: string | number;
}

function ChromeIcon({ width = '48', height = '48' }: ChromeIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 48 48`}>
      <defs>
        <linearGradient id="a" x1="3.217" x2="44.781" y1="15" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d93025"></stop>
          <stop offset="1" stopColor="#ea4335"></stop>
        </linearGradient>
        <linearGradient id="b" x1="20.722" x2="41.504" y1="47.679" y2="11.684" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fcc934"></stop>
          <stop offset="1" stopColor="#fbbc04"></stop>
        </linearGradient>
        <linearGradient id="c" x1="26.598" x2="5.816" y1="46.502" y2="10.506" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1e8e3e"></stop>
          <stop offset="1" stopColor="#34a853"></stop>
        </linearGradient>
      </defs>
      <circle cx="24" cy="23.995" r="12" fill="#fff"></circle>
      <path
        fill="none"
        d="M3.215 36A24 24 0 1012 3.215 24 24 0 003.215 36zm31.177-18A12 12 0 1118 13.608 12 12 0 0134.392 18z"></path>
      <path
        fill="url(#a)"
        d="M24 12h20.781a23.994 23.994 0 00-41.564.003L13.607 30l.01-.002A11.985 11.985 0 0124 12z"></path>
      <circle cx="24" cy="24" r="9.5" fill="#1a73e8"></circle>
      <path
        fill="url(#b)"
        d="M34.391 30.003L24.001 48A23.994 23.994 0 0044.78 12.003H23.999l-.003.01a11.985 11.985 0 0110.395 17.99z"></path>
      <path
        fill="url(#c)"
        d="M13.609 30.003L3.218 12.006A23.994 23.994 0 0024.003 48l10.39-17.997-.007-.007a11.985 11.985 0 01-20.777.007z"></path>
    </svg>
  );
}

export default ChromeIcon;
