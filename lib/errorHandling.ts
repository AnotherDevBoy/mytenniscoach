import React from 'react';

function useAsyncError() {
  const [_, setError] = React.useState();
  return React.useCallback(
    (e: Error) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
}

export default useAsyncError;
