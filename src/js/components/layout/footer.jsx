import React from 'react';
import styles from './layout.css';

export default class Footer extends React.Component {
  render(){
    return(
      <footer className={styles.footer}>
        <p>&copy; <a href="/">hellosuisei.com</a></p>
      </footer>
    )
  }
}
