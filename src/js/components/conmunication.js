import React from 'react';
import { Comment, Avatar, Form, Button, List, Input,message,Tooltip } from 'antd';
import moment from 'moment';
import $ from 'jquery';
import Cookies from 'js-cookie';

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? '讨论区' : '快来发表你的第一条消息吧'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加消息
      </Button>
    </Form.Item>
  </div>
);


function lowerJSONKey(jsonObj){
    for (var key in jsonObj){
        jsonObj["\""+key.toLowerCase()+"\""] = jsonObj[key];
        delete(jsonObj[key]);
    }
    return jsonObj;
};

function lowerJsonList(jsonList){
  var newList=[];
  for(let item of jsonList){
    newList.push(lowerJSONKey(item));
  }
  return newList;
}

class Conmunication extends React.Component {


  constructor()
  {
    super();
    this.state = {
      comments: [],
      submitting: false,
      value: '',
      status:'',
    };
  }

  componentWillMount()
  {
    var url='http://127.0.0.1:8070/comments/findAllComments';
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };
    console.log(url);



    fetch(url,myFetchOptions)
    .then(response=>response.json())
    .then(res=>{
        console.log('comments');
        this.setState({comments:res});
    }).catch(e => console.log('错误:', e));
    var _this=this;
    $.ajax({
                    type:"GET",
                    url:url,
                    dataType:"json",
                    success:function (comments) {
                      console.log('comments');
                      console.log(comments);
                      comments=lowerJsonList(comments);
                      console.log(_this);
                      var newC=[];
                      $.foreach(comments,function(index,item){
                          console.log(comments[index].workId);
                          console.log(comments[index].comment);
                      }
                    )
                      _this.setState({comments:comments});
                    },
                    error:function()
                    {
                      console.log('获取评论失败');
                    }

          });
    console.log('comments');
    console.log(this.state.comments);
  }

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
    var workid=Cookies.get("workId");
    console.log('workId in communication ：'+workid);
    var test=workid!=undefined?message.success('获取工号成功'):message.warning('工号获取失败');
    var url='http://127.0.0.1:8070/comments/commentApply?workId='+workid+'&comment='+this.state.value;
    console.log('comment apply url:'+url);
    var myFetchOptions = {
      method: 'GET',
      // mode:'no-cors',
      headers:{
        'Content-Type':'application/json;charset=UTF-8'
      },
      timeout:10000,
    };


    fetch(url,myFetchOptions)
    .then(response=>response.json())
    .then(coms=>{
        this.setState({status:coms.status})
    }).catch(e => console.log('错误:', e));


    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };



  render() {
    const { comments, submitting, value } = this.state;

    var newComments=[];
    for(let item of  comments)
    {
      newComments.push({
        author:item.workid,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
          <p>
            {item.comment}
          </p>
        ),
        datetime: (
          <Tooltip
          title={moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss')}
            >
            <span>
            {moment()
              .subtract(1, 'days')
              .fromNow()}
              </span>
              </Tooltip>
            )
      });
    }
    console.log('communication render state:');
    console.log(this.state);
    console.log('newComments');
    console.log(newComments);
    return (
      <div>
      <List
        className="comment-list"
        header={`${newComments.length} replies`}
        itemLayout="horizontal"
        dataSource={newComments}
        renderItem={item => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
              />
          </li>
        )}
        />
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}

export default  Conmunication;
