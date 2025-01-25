import { Skeleton } from 'common';
import userStyles from './User.module.scss';
import skeletonStyles from './UserSkeleton.module.scss';
import { concatClassNames as cn } from 'lib';

export const UserSkeleton = () => {
  return (
    <figure className={cn(userStyles.figure, skeletonStyles.figure)}>
      <Skeleton variant="circle" className={userStyles.user__avatar} />
      <Skeleton
        variant="rect"
        className={cn(
          userStyles.figure__username,
          skeletonStyles.figure__username
        )}
      />
    </figure>
  );
};
