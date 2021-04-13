import React, { Component } from 'react';
import './Style/Player.css'
import Head from './Header/header'

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:4,
            width:6,
            map:[
                [1, 0, 0, 0, 1, 1],
                [1, 0, 0, 0, 1, 1],
                [1, 0, 2, 0, 1, 0],
                [1, 3, 0, 0, 1, 0]
            ],
            table:'',
            pos:{
                x:-1,
                y:-1
            },
            timer:0,
            isUsing:false
        }
    }
    //===================== 키 입력 포커싱 ===========================
    doing = React.createRef();

    focus = () => {
        this.doing.current.focus();
    }
    start = () => {
        if(this.state.isUsing) return;

        this.doing.current.focus();
        this.initialize();
        this.searchPos();
        setInterval(this.timer, 10);
        this.setState({ isUsing:true });
    }
    //====================== 키 입력 이벤트 =============================
    moveUp = () => {
        let { map, pos } = this.state;
        let target = map[pos.y - 1][pos.x];
        if (target === 0) {
            map[pos.y - 1][pos.x] = 2;
            map[pos.y][pos.x] = 0;
            pos.y--;
        } else if (target === 3) {
            this.clear();
        }
        this.setState({
            pos
        })
    }
    moveDown = () => {
        let { map, pos } = this.state;
        let target = map[pos.y + 1][pos.x];
        if (target === 0) {
            map[pos.y + 1][pos.x] = 2;
            map[pos.y][pos.x] = 0;
            pos.y++;
        } else if (target === 3) {
            this.clear()
        }
        this.setState({
            map,
            pos
        })
    }
    moveRight = () => {
        let { map, pos } = this.state;
        let target = map[pos.y][pos.x + 1];
        if (target === 0) {
            map[pos.y][pos.x + 1] = 2;
            map[pos.y][pos.x] = 0;
            pos.x++;
        } else if (target === 3) {
            this.clear()
        }
        this.setState({
            map,
            pos
        })
    }
    moveLeft = () => {
        let { map, pos } = this.state;
        let target = map[pos.y][pos.x - 1];
        if (target === 0) {
            map[pos.y][pos.x - 1] = 2;
            map[pos.y][pos.x] = 0;
            pos.x--;
        } else if (target === 3) {
            this.clear()
        }
        this.setState({
            map,
            pos
        })
    }
    handleKeyPress = (e) => {
        e.preventDefault();
        if (!this.state.isUsing) return;

        if (e.keyCode === 38){ // Up
            this.moveUp();
        } else if (e.keyCode === 40){ // Down
            this.moveDown();
        } else if (e.keyCode === 39){ // Right
            this.moveRight();
        } else if (e.keyCode === 37){ // Left
            this.moveLeft();
        }
        this.setTable();
    }
    //=================== 게임 클리어 ==============================
    clear = () => {
        let clearTime = this.getTimer();

        alert(`축하드립니다! 게임 클리어 시간은 ${clearTime}입니다 !`);

        this.setState({ isUsing:false });
    }
    //=================== 게임 타이머 ==============================
    timer = () => {
        if(!this.state.isUsing) return

        this.setState(prevState => ({
            timer: prevState.timer + 1
        }))
    }
    getTimer = () => {
        let { timer } = this.state;

        let min = Math.floor(timer / 6000);
        let sec = Math.floor(timer / 100) % 60;
        let ms = timer % 100;

        return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}.${ms < 10 ? `0${ms}` : ms}`
    }

    //================= 플레이어 위치 검색 ==========================
    searchPos = () => {
        for(let i = 0; i < this.state.height; i++){
            for(let j = 0; j < this.state.width; j++){
                if(this.state.map[i][j] === 2){
                    this.setState({
                        pos:{
                            x:j,
                            y:i
                        }
                    })
                }
            }
        }
    }
    //======================= 맵 세팅 =============================
    setTable = () => {
        let idx = [];

        for(let i = 0; i < this.state.height; i++){
            let child = [];
            for(let j = 0; j < this.state.width; j++){
                let mode = this.state.map[i][j];

                if (mode === 0) {
                    child.push(<td style = {{backgroundColor:'white', width:'40px', height:'40px'}}></td>)
                } else if (mode === 1) { 
                    child.push(<td style = {{backgroundColor:'black', width:'40px', height:'40px'}}></td>)
                } else if (mode === 2) {
                    child.push(<td style = {{backgroundColor:'skyblue', width:'40px', height:'40px'}}></td>)
                } else if(mode === 3) {
                    child.push(<td style = {{backgroundColor:'yellow', width:'40px', height:'40px'}}></td>)
                }
            }
            idx.push(<tbody><tr>{child}</tr></tbody>)
        }
        this.setState({
            table:idx
        })
    }
    initialize = () => {
        this.setTable();
    }
    render(){
        return(
            <div>
            <Head/>
            <div className = 'bg' onClick = { this.focus }>
                <div className = 'start'>
                    <button onClick = { this.start }>Game Start!</button>
                    <p>[Game Start!] 버튼을 누르시면 맵이 켜지며 타이머가 작동합니다 !</p>
                </div>
                <div className = 'board'>
                    <input onKeyPress = { this.handleKeyPress } ref = { this.doing } value = { this.getTimer() } readOnly></input>
                    <table>{ this.state.table }</table>
                </div>
            </div>
            </div>
        );
    }
}
export default Player;