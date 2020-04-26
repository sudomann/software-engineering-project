import React from 'react';
import {Button, Icon} from '@ui-kitten/components';

export const ArrowSteerLeft = ({onPressIn, onPressOut}) => (
  <Button
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-left-outline" />}
  />
);

export const ArrowSteerUp = ({onPressIn, onPressOut}) => (
  <Button
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-up-outline" />}
  />
);

export const ArrowSteerRight = ({onPressIn, onPressOut}) => (
  <Button
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-right-outline" />}
  />
);

export const ArrowSteerDown = ({onPressIn, onPressOut}) => (
  <Button
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    appearance="outline"
    size="giant"
    icon={style => <Icon {...style} name="arrow-down-outline" />}
  />
);
