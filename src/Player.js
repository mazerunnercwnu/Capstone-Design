import React, { Component } from 'react';
import './Style/Player.css';
import Head from './Header/header';
import Loading from './Loading';
import List from './RankList';

const ip = '3.36.223.82';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            map_id:this.props.match.params.map_id,
            height:0,
            width:0,
            map:[],
            table:'',
            pos:{
                x:-1,
                y:-1
            },
            timer:0,
            isUsing:false
        }
    }

    componentDidMount(){
        this.load();   
    }
    //===================== 맵 불러오기 ==============================
    load = () => {
        //================= DB에서 불러오기 ==========================
        let idx = '';
        const id = this.state.map_id;

        const data = {
            map_id:id
        }

        fetch(`http://localhost:3001/loading_map/`, {
        //fetch(`http://${ip}:3001/loading_map/`, {
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            idx = data.map_data;
            this.setState({
                height:data.map_height,
                width:data.map_width
            },
            () => {
                //================ 맵 데이터 형식 변환 =======================
                let count = 0;
                let map = [];

                for(let i = 0; i < this.state.height; i++){
                    let arr = [];
                    for(let j = 0; j < this.state.width; j++){
                        arr.push(parseInt(idx.charAt(count)));
                        count++;
                    }
                    map.push(arr);
                }
                this.setState({
                    map: this.state.map.concat(map)
                })
            })
        })
    }
    //===================== 키 입력 포커싱 ===========================
    doing = React.createRef();

    focus = () => {
        this.doing.current.focus();
    }
    start = () => {
        if(this.state.isUsing === true) return;
        if(this.state.map === []) {
            alert('맵 정보를 불러오는 중입니다!');
            return;
        }
        this.setTable();
        this.searchPos();
        this.setState({ isUsing : true });
        setInterval(this.timer, 10);
    }
    //====================== 키 입력 이벤트 =============================
    moveUp = () => {
        const { map, pos } = this.state;
        if (pos.y - 1 < 0) return;

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
        const { map, pos, height } = this.state;
        if (pos.y + 1 >= height) return;

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
        const { map, pos, width } = this.state;
        if (pos.x + 1 >= width) return;

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
        if (pos.x - 1 < 0) return;

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

        if (this.state.isUsing === false) return;

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
        const id = this.state.map_id;

        if(localStorage.isLogged == 'true') {
            const data = {
                map_id:id,
                user_id:localStorage.loginID,
                timer:this.state.timer
            }
            fetch('http://localhost:3001/clear', {
            //fetch(`http://${ip}:3001/clear`, {
                method:'post',
                headers:{
                   "Content-type":"application/json"
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success == true){
                    alert(`축하드립니다! 게임 클리어 시간은 ${clearTime}입니다 !`);
                    this.props.history.push('./');
                } else {
                    alert('error')
                }
            })
        } else {
            alert(`축하드립니다! 게임 클리어 시간은 ${clearTime}입니다!\n 로그인 하시지 않아 랭킹이 저장되지 않습니다!`)
        }
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
        const { timer } = this.state;

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
                } else if (mode === 3) {
                    child.push(<td style = {{backgroundColor:'#ffee7e', width:'40px', height:'40px'}}></td>)
                }
            }
            idx.push(<tbody><tr>{child}</tr></tbody>)
        }
        this.setState({
            table:idx
        })
    }
    
    render(){
        const { map } = this.state;
        return(
            <div>
                <Head/>
                { map.length == 0 ? 
                <div className = 'loading'><Loading/></div> 
                :
                <div className = 'bg' onClick = { this.focus }>
                    <div className = 'start'>
                        <button onClick = { this.start }>Game Start!</button>
                        <p>[Game Start!] 버튼을 누르시면 맵이 켜지며 타이머가 작동합니다 !</p>
                    </div>
                    <div className = 'board'>
                        <input onKeyDown = { this.handleKeyPress } ref = { this.doing } value = { this.getTimer() } readOnly></input>
                        <table>{ this.state.table }</table>
                    </div>
                </div>}
                <div className = 'rank-list'>
                    <List map_id = {this.state.map_id}/>
                </div>
            </div>
        );
    }
}
export default Player;