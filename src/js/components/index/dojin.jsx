import React from 'react';
import styles from './dojin.css';

export default class Dojin extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    let list = this.props.dojin_list.map((dojin)=>{
      let dojinData = dojin.data.map((digit)=>{
        return (
          <li>
            <dl><dt>{digit.key}</dt><dd>{digit.value}</dd></dl>
          </li>
        )
      });

      return (
        <li>
          <figure>
            <img src={dojin.img} alt={dojin.title} className={styles.thumbnail} />
            <figcaption className={styles.data}>
              <h2>{dojin.title}</h2>
              <ul>
                {dojinData}
              </ul>
            </figcaption>
          </figure>
        </li>
      )
    });

    return(
      <section className={styles.wrap}>
        <h2 className={styles.title}>作品情報</h2>
        <ul className={styles.list}>
          {list}
        </ul>
      </section>
    )
  }
}
