import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

import styles from './layout.css';

export default class Layout extends React.Component {
  render(){
    return(
      <div>
        <Header />
        <main className={styles.wrap}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}
