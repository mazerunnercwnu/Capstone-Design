import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import CommonTable from './table/CommonTable.js';
import CommonTableColumn from './table/CommonTableColum.js';
import CommonTableRow from './table/CommonTableRow.js';
import Player from './Player';

class MapList extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[]
    }
  }
  componentDidMount(){
    this.loadData();
  }
  loadData = () => {
    fetch('http://localhost:3001/loading_data/')
    .then(res => res.json())
    .then(data => {
      let postList = [];
      for(let i = 0; i < data.length; i++){
          const postData = {
              no:data[i].map_id,
              name:data[i].map_name
          }
          postList.push(postData);
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
        <CommonTable headersName={['맵 번호', '맵 이름']}>
          {
            list ? list.map((item, index) => {
              return(
                <CommonTableRow key={ index }>
                  <CommonTableColumn>{ item.no }</CommonTableColumn>
                  <CommonTableColumn>
                    <Link id ='list' to={`/player/${ item.no }`}>{ item.name }</Link>
                  </CommonTableColumn>
                </CommonTableRow>
              );
            }) : ''
          }
        </CommonTable>
      </div>
    );
  }
}
 
export default MapList;