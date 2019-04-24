import React from 'react';
import {Card} from 'antd';
import {Router,Route,Link,browserHistory,BrowserRouter} from 'react-router-dom';
export default class PCNewsBlock extends React.Component{
  constructor()
  {
    super();
    this.state={
      news:''
    };
  };

  componentWillMount()
  {
    var myFetchOptions={
      method:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({news: json}));
  };

  render()
  {

        const {news}=this.state;
          console.log(news);
        const NewsList=news.length?
        news.map((newsItem,index)=>(
          <li key={index}>
          <BrowserRouter>
            <Link to={`details/${newsItem.uniquekey}`} target="_blank">
            {newsItem.title}
            </Link>
            </BrowserRouter>
          </li>
        ))
        :'没有获取到新闻';
    return(
      <div>
        <div class="topNewsList">
              <Card>
              <ul>
                {NewsList}
              </ul>
              </Card>
        </div>
      </div>
    );
  }
}
