import React from 'react';
import styles from './news.css';

export default class News extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let list = this.props.news_list.map((news)=>{
      return (
        <li>
          <dl><dt>{news.date}</dt><dd>{news.text}</dd></dl>
        </li>
      )
    });

    return(
      <section className={styles.wrap}>
        <h2 className={styles.title}>更新情報</h2>
        <ul className={styles.list}>
          {list}
        </ul>
      </section>
    )
  }
}
