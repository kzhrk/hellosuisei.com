import React from 'react';
import styles from './layout.css';

export default class Header extends React.Component {
  render(){
    return(
      <header className={styles.header}>
        <h1 className={styles.title}>コミックマーケットを中心に活動する創作小説の同人サークル「HELLO-SUISEI」</h1>
        <a href="/" className={styles.logo}>HELLO-SUISEI</a>
      </header>
    )
  }
}
