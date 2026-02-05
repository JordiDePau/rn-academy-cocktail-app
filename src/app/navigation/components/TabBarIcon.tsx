import React from 'react';

import { Icon } from 'ui/components/icon/Icon';
import { IconName } from 'ui/components/icon/types';

interface Props {
  name: IconName;
  color: string;
}

export const TabBarIcon = ({ name, color }: Props) => <Icon name={name} color={color} />;
