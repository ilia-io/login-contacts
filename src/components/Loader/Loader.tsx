import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <div style={{height: '100vh', marginTop: '100px'}}>
      <div className={styles.ldsDefault}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader