import React, { useContext } from 'react';
import styles from '@styles/components/loader.scss';
import { LoaderContext } from '../routeProviders/Loader';

const Loader = () => {
  const loader = useContext(LoaderContext)

  return (
    <div>
    {loader?.isLoading && (
      <div className={styles.loader}>
        <div className={styles.ldsEllipsis}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )}
    </div>
  );
};

export default Loader;