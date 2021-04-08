import React, { Component } from 'react';
import './MapMaker.css';

class MapMaker extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:0,
            width:0,
            map:[],
            table:"",
            mod:{
                cancel:0,
                obs:0,
                start:0,
                end:0
            },
            sp:{
                x:0,
                y:0
            },
            ep:{
                x:0,
                y:0
            }
        }
    }
    //================== 높이와 너비 설정 =====================
    height = (e) => {
        this.setState({
            height:e.target.value
        })
    }
    width = (e) => {
        this.setState({
            width:e.target.value
        })
    }
    //===================== 모드 세팅 ========================
    setmodC = () => {
        this.setState({
            mod:{
                cancel:1,
                obs:0,
                start:0,
                end:0
            }
        })
    }
    setmodO = () => {
        this.setState({
            mod:{
                cancel:0,
                obs:1,
                start:0,
                end:0
            }
        })
    }
    setmodS = () => { 
        this.setState({
            mod:{
                cancel:0,
                obs:0,
                start:1,
                end:0
            }
        })
    }
    setmodE = () => {
        this.setState({
            mod:{
                cancel:0,
                obs:0,
                start:0,
                end:1
            }
        })
    }

    //================== 사용자 클릭 이벤트 ========================
    set = (x, y) => {
        let mode = this.state.mod;
        let arr = this.state.map;

        if(mode.cancel === 1 && mode.obs === 0 && mode.start === 0 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        arr[i][j] = 0;
                        this.setState({
                            map: arr.concat([]),
                            exe: true
                        })
                    }
                }
            }
        }

        if(mode.cancel === 0 && mode.obs === 1 && mode.start === 0 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        arr[i][j] = 1;
                        this.setState({
                            map: arr.concat([])
                        })
                    }
                }
            }
        }

        if(mode.cancel === 0 && mode.obs === 0 && mode.start === 1 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        if(x === i && y === j){
                            arr[i][j] = 2;
                            this.setState({
                                map: arr.concat([])
                            })
                        }
                    }
                }
            }
        }

        if(mode.cancel === 0 && mode.obs === 0 && mode.start === 0 && mode.end === 1){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        arr[i][j] = 3;
                        this.setState({
                            map: arr.concat([])
                        })
                    }
                }
            }
        }
    }

    //=================== 맵 제작 테이블 세팅 ===================
    size = () => {
        let arr = [];
        for(let i = 0; i < this.state.height; i++){
            let idx = [];
            for(let j = 0; j < this.state.width; j++){
                idx.push(0);
            }
            arr.push(idx);
        }

        this.setState({
            map : arr.concat([])
        })
    }

    table = () => {
        let idx = [];
        for(let i = 0; i < this.state.height; i++){
            let child = [];
            for(let j = 0; j < this.state.width; j++){
                let mode = this.state.map[i][j];

                if (mode === 0) {
                    child.push(<td><button style = {{backgroundColor:"white", width:"40px", height:"40px"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if (mode === 1) { 
                    child.push(<td><button style = {{backgroundColor:"black", width:"40px", height:"40px"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if (mode === 2) {
                    child.push(<td><button style = {{backgroundColor:"skyblue", width:"40px", height:"40px"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if(mode === 3) {
                    child.push(<td><button style = {{backgroundColor:"yellow", width:"40px", height:"40px"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                }
            }
            idx.push(<tbody><tr>{child}</tr></tbody>)
        }
        this.setState({
            table:idx
        })
    }

    render(){
        return(
            <div>
                <div id = 'size'>
                    <input style = {{width:'50px'}} placeholder = 'height' onChange = {this.height}></input>&nbsp;
                    <input style = {{width:'50px'}} placeholder = 'width' onChange = {this.width}></input>&nbsp;
                    <button onMouseDown={this.size} onMouseUp={this.table}>Build</button>
                </div>
                <br/>
                <div id = 'mode'>
                    <button id = "obs" onClick = {this.setmodO}>obstacle</button>&nbsp;
                    <button id = "start" onClick = {this.setmodS}>start</button>&nbsp;
                    <button id = "end" onClick = {this.setmodE}>end</button>&nbsp;&nbsp;
                    <button id = "cancel" onClick = {this.setmodC}>CANCEL</button>
                </div>
                <br/>
                <table>
                    {this.state.table}
                </table>
            </div>
        );
    }
}
export default MapMaker;