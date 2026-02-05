import React from 'react';

import { iconNames } from '../../../assets/icon';

export const DEFAULT_ICON_SIZE = 24;

// use iconNames to get icons do not change color or size
export type IconProps = {
  name: keyof typeof iconNames;
  size?: number;
  color?: string;
};

export function Icon({ name, size = DEFAULT_ICON_SIZE, color = 'black' }: IconProps) {
  const icon = iconNames[name];

  // If no sizes are available, return null
  if (!icon) {
    return null;
  }

  const iconPath = `/assets/icon/${name}.svg`;

  return <img src={iconPath} alt={name} style={{ width: size, height: size, fill: color }} />;
}
