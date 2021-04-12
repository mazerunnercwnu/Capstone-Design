import React, { Component } from 'react';
import Head from './Header/header'
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
                x:-1,
                y:-1
            },
            ep:{
                x:-1,
                y:-1
            }
        }
    }
    //================== 높이와 너비 설정 =====================
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
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
        let { map } = this.state;

        if(mode.cancel === 1 && mode.obs === 0 && mode.start === 0 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        map[i][j] = 0;
                        this.setState({
                            map
                        })
                    }
                }
            }
        }

        if(mode.cancel === 0 && mode.obs === 1 && mode.start === 0 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        map[i][j] = 1;
                        this.setState({
                            map
                        })
                    }
                }
            }
        }

        if(mode.cancel === 0 && mode.obs === 0 && mode.start === 1 && mode.end === 0){
            for(let i = 0; i < this.state.height; i++){
                for(let j = 0; j < this.state.width; j++){
                    if(x === i && y === j){
                        let { sp } = this.state;
                        if(sp.x === -1 && sp.y === -1){
                            map[i][j] = 2;
                            this.setState({
                                map,
                                sp: {
                                    x: i,
                                    y: j
                                }
                            })
                        } else {
                            map[sp.x][sp.y] = 0;
                            map[i][j] = 2;
                            this.setState({
                                map,
                                sp: {
                                    x: i,
                                    y: j
                                }
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
                        let { ep } = this.state;
                        if(ep.x === -1 && ep.y === -1){
                            map[i][j] = 3;
                            this.setState({
                                map,
                                ep: {
                                    x: i,
                                    y: j
                                }
                            })
                        } else {
                            map[ep.x][ep.y] = 0;
                            map[i][j] = 3;
                            this.setState({
                                map,
                                ep: {
                                    x: i,
                                    y: j
                                }
                            })
                        }
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
            map:arr
        })
    }

    table = () => {
        let arr = [];
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
            arr.push(<tbody><tr>{child}</tr></tbody>)
        }
        this.setState({
            table:arr
        })
    }

    render(){
        return(
            <div>
                <Head/>
                <div className = 'size'>
                    <input name = 'height' placeholder = 'height' onChange = {this.handleChange}></input>&nbsp;
                    <input name = 'width' placeholder = 'width' onChange = {this.handleChange}></input>&nbsp;
                    <button onMouseDown={this.size} onMouseUp={this.table}>Build</button>
                </div>
                <br/>
                <div className = 'mode'>
                    <button id = "obs" onClick = {this.setmodO}>obstacle</button>&nbsp;
                    <button id = "start" onClick = {this.setmodS}>start</button>&nbsp;
                    <button id = "end" onClick = {this.setmodE}>end</button>&nbsp;&nbsp;
                    <button id = "cancel" onClick = {this.setmodC}>CANCEL</button>
                </div>
                <h5>맵의 크기는 최대 30x30까지를 권장합니다.</h5>
                <table>
                    {this.state.table}
                </table>
            </div>
        );
    }
}
export default MapMaker;