import React, { Component } from 'react';
import './MapMaker.css';

class MapMaker extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:0,
            width:0,
            map: [],
        }
    }
    setMapSize(){
        let number = document.getElementById('number');
        this.setState({
            height: number.children[0].value,
            width: number.children[1].value
        });
    }
    initMap(){
        let list = [];
        for(let i = 0; i<this.state.width; i++){
            list.push(0);
        }
        for(let i = 0; i<this.state.height; i++){
            this.state.map.push(list);
        }
        this.setTable();
    }
    setTable(){
        let mapTable = "<table border = '1'>"
        for(let i = 0; i<this.state.width; i++){
            mapTable += "<tr>";
            for(let j = 0; j<this.state.height; j++){
                mapTable += "<td id=x"+i+"y"+j+"></td>";
            }
            mapTable += "</tr>";
        }
        mapTable += "</table>";

        return mapTable;
    }
    render(){
        let table = this.setTable();
        this.initMap();
        return(
            <div>
                <div id='number'>
                    <input 
                        id='height'
                        type='number' 
                        min ='0' 
                        max = '20'>
                    </input>
                    <input 
                        id='width' 
                        type='number' 
                        min ='0' 
                        max = '20'>
                    </input>
                    <button onClick={this.setMapSize.bind(this)}>Click</button>
                </div>
                <div id='map' dangerouslySetInnerHTML={ {__html: table} }></div>
            </div>
        );
    }
}
export default MapMaker;