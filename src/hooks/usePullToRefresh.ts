import {useState, useCallback} from 'react';

const REFRESH_STOP_TIME = 0.5 * 1000;

type Props = () => Promise<unknown> | undefined;

const usePullToRefresh = (refetch: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const setRefreshFinish = () =>
    setTimeout(() => {
      setRefreshing(false);
    }, REFRESH_STOP_TIME);

  const onRefresh = useCallback(() => {
    if (!refetch) return;
    setRefreshing(true);
    try {
      refetch();
    } catch (err) {
      setRefreshFinish();
    }
    setRefreshFinish();
  }, [refetch]);

  return {
    onRefresh,
    refreshing,
  };
};
export default usePullToRefresh;
