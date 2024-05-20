/* eslint-disable consistent-return */
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '@uoslife/design-system';

import CardLayout from '../cardLayout/CardLayout';

type Props = {
  variant: 'ranking' | 'text' | 'card';
  width?: number;
  height?: number;
};

const switchFromVariant = ({variant, width, height}: Props) => {
  switch (variant) {
    case 'ranking':
      return (
        <SkeletonPlaceholder
          backgroundColor={colors.grey10}
          highlightColor={colors.white}>
          <SkeletonPlaceholder.Item
            width={width ?? '100%'}
            height={height ?? 244}
            borderRadius={20}
          />
        </SkeletonPlaceholder>
      );
    case 'text':
      return (
        <SkeletonPlaceholder
          backgroundColor={colors.grey20}
          highlightColor={colors.grey10}>
          <SkeletonPlaceholder.Item
            width={width ?? '100%'}
            height={height ?? 24}
            borderRadius={13}
          />
        </SkeletonPlaceholder>
      );
    case 'card':
      return (
        <CardLayout>
          <SkeletonPlaceholder
            backgroundColor={colors.grey20}
            highlightColor={colors.grey10}>
            <SkeletonPlaceholder.Item
              flexDirection="column"
              marginLeft={16}
              gap={10}>
              <SkeletonPlaceholder.Item
                width="90%"
                height={16}
                borderRadius={13}
                marginTop={16}
              />
              <SkeletonPlaceholder.Item
                width="85%"
                height={14}
                borderRadius={13}
                marginBottom={36}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </CardLayout>
      );
  }
};

const Skeleton = (props: Props) => {
  return switchFromVariant(props);
};

export default Skeleton;
