import React from 'react';
import * as MuiIcons from '@mui/icons-material';

export function getIconComponent(iconName: string) {
  try {
    const IconComponent = MuiIcons[iconName as keyof typeof MuiIcons];
    return IconComponent ? React.createElement(IconComponent) : null;
  } catch (error) {
    console.warn(`Icon not found: ${iconName}`);
    return null;
  }
}

export function getIconName(iconComponent: React.ComponentType): string {
  return iconComponent.displayName || iconComponent.name || 'Unknown';
}
