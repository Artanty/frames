import React, { useContext, useEffect } from 'react';
import styles from '@styles/components/loader.scss';
import { LoaderContext } from '../routeProviders/Loader';

const Loader = ({ visible = false, block = false, noBg=false }: { visible?: boolean, block?: boolean, noBg?: boolean}) => {
  const loader = useContext(LoaderContext)

  const isVisble = (): boolean => {
    if (visible) {
      return true
    } else {
      return loader?.isLoading
    }
  }
  const initialBg = (): string => {
    return noBg ? styles.loader__noBg : ''
  }

  const getClass = () => {
    if (block) {
      return styles.loader + ' ' + styles.loader__block
    } else {
      return styles.loader
    }
  }

  return (
    <div>
    {isVisble() && (
      <div className={getClass() + ' ' + initialBg()}>
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
