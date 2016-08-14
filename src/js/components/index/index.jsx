import React from 'react';
import request from 'superagent';

import News from './news.jsx';
import Dojin from './dojin.jsx';

export default class Index extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      news_list: [],
      dojin_list: []
    }
  }

  componentDidMount(){
    request
      .get('/json/news.json')
      .end((err, res)=>{
        if (err) {
          console.log(err, res);
          return;
        }

        this.setState({
          news_list: JSON.parse(res.text)
        });
      });

    request
      .get('/json/dojin.json')
      .end((err, res)=>{
        if (err) {
          console.log(err, res);
          return;
        }

        this.setState({
          dojin_list: JSON.parse(res.text)
        })
      });
  }

  render(){
    return(
      <div>
        <News news_list={this.state.news_list} />
        <Dojin dojin_list={this.state.dojin_list} />
      </div>
    );
  }
}
