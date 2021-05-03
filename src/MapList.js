import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CommonTable from './table/CommonTable.js';
import CommonTableColumn from './table/CommonTableColum.js';
import CommonTableRow from './table/CommonTableRow.js';
import Loading from './Loading';
const ip = '3.36.223.82';

class MapList extends Component{
  constructor(props){
    super(props);
    this.state = {
      list:[],
      completed:0
    }
  }
  componentDidMount(){
    this.loadData();
  }

  loadData = () => {
    let data = {}

    if (this.props.page == undefined) {
      data = {
        page : 0
      }
    } else {
      data = {
        page : this.props.page
      }
    }
    fetch(`http://${ip}:3001/loading_data/`, {
    // fetch('http://localhost:3001/loading_data/', {
      method:'post',
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      for(let i = 0; i < data.length; i++){
        const postData = {
            no:data[i].map_id,
            name:data[i].map_name,
            prod:data[i].map_prod,
        }
        this.setState({
          list:this.state.list.concat(postData)
        })
      }
    })
  }
  render(){
    const { list } = this.state;
    return (
      <>
      <div>
        <CommonTable headersName={['맵 번호', '맵 이름', '제작자']}>
          {
            list ? list.map((item, index) => {
              return(
                <CommonTableRow key={ index }>
                  <CommonTableColumn>{ item.no }</CommonTableColumn>
                  <CommonTableColumn>
                    <Link id ='list' to={`/player/${ item.no }`}> { item.name } </Link>
                  </CommonTableColumn>
                  <CommonTableColumn>{ item.prod }</CommonTableColumn>
                </CommonTableRow>
              );
            }) : ''
          }
        </CommonTable>
        {
          list.length == 0 ? 
          <div className = 'loading'>
            <Loading/>
          </div> : ''
        }
      </div>
      </>
    );
  }
}
 
export default MapList;