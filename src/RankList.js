import React, { Component } from 'react';
import CommonTable from './table/CommonTable.js';
import CommonTableColumn from './table/CommonTableColum.js';
import CommonTableRow from './table/CommonTableRow.js';
import Loading from './Loading';

class RankList extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }
  componentDidMount(){
    this.loadData();
  }

  getTimer = timer => {

    let min = Math.floor(timer / 6000);
    let sec = Math.floor(timer / 100) % 60;
    let ms = timer % 100;

    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}.${ms < 10 ? `0${ms}` : ms}`
  }

  loadData = () => {
    const limit = 10;
    const data = {
      map_id : this.props.map_id
    }
    fetch('http://localhost:3001/loading_rank/', {
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      let postList = [];

      if (data.length < limit){
        for(let i = 0; i < data.length; i++){
            const postData = {
                no:i,
                user_id:data[i].user_id,
                timer:this.getTimer(data[i].timer)
            }
            postList.push(postData);
        }
      } else {
        for(let i = 0; i < limit; i++){
            const postData = {
                no:i,
                user_id:data[i].user_id,
                timer:this.getTimer(data[i].timer)
            }
            postList.push(postData);
        }
    }
      this.setState({
        list:this.state.list.concat(postList)
      })
    })
  }

  render(){
    const { list } = this.state;
    return (
      <div>
        <CommonTable headersName={['순위', '아이디', '클리어 시간']}>
          {
            list ? list.map((item, index) => {
              return(
                <CommonTableRow key={ index }>
                  <CommonTableColumn>{ item.no + 1 }</CommonTableColumn>
                  <CommonTableColumn>{ item.user_id }</CommonTableColumn>
                  <CommonTableColumn>{ item.timer }</CommonTableColumn>
                </CommonTableRow>
              );
            }) : ''
          }
        </CommonTable>
      </div>
    );
  }
}
 
export default RankList;