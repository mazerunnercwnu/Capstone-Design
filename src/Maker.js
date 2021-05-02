import React, { Component } from 'react';
import Head from './Header/header'
import './Style/Maker.css';
const ip = '3.36.223.82;'

class Maker extends Component {
    constructor(props){
        super(props);
        this.state = {
            height:0,
            width:0,
            title:'',
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
    //==================== 맵 저장 ==========================
    save = () => {
        if(this.findS() == true && this.findE() == true && this.bfs() == true){;
            //=========== 맵 정보 데이터 변환 =============
            let idx = '';
            const { map, height, width, title } = this.state;
            for(let i = 0; i < height; i++){
                for(let j = 0; j < width; j++){
                    idx = idx + map[i][j];
                }
            }
            //=============== DB에 저장 ================
            const data = {
                map: idx,
                height: height,
                width: width,
                title: title,
                prod: localStorage.loginID
            }
            fetch(`http://localhost:3001/saving_map/`, {
            //fetch(`http://${ip}:3001/saving_map/`, {
                method:'post',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success == true){
                    alert('맵 저장이 완료되었습니다 !');
                    this.props.history.push('./');
                }
            })
        } else if (this.findS() == false) {
            alert('시작 지점을 정해주세요!');
        } else if (this.findE() == false) {
            alert('클리어 지점을 정해주세요!');
        } else if (this.bfs() == false) {
            alert('클리어가 불가능한 맵입니다. 클리어가 가능하도록 맵을 수정해주세요!')
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
        const { height, width } = this.state;
        if(height > 30 || width > 30){
            alert('맵의 크기는 최대 30x30까지입니다!')
            return;
        }

        let arr = [];
        for(let i = 0; i < height; i++){
            let idx = [];
            for(let j = 0; j < width; j++){
                idx.push(0);
            }
            arr.push(idx);
        }

        this.setState({
            map:arr
        },
        () => {
            this.table();
        })
    }

    table = () => {
        let arr = [];
        for(let i = 0; i < this.state.height; i++){
            let child = [];
            for(let j = 0; j < this.state.width; j++){
                let mode = this.state.map[i][j];

                if (mode === 0) {
                    child.push(<td><button style = {{backgroundColor:"white", width:"40px", height:"40px", transition:"0.5s"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if (mode === 1) { 
                    child.push(<td><button style = {{backgroundColor:"black", width:"40px", height:"40px", transition:"0.5s"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if (mode === 2) {
                    child.push(<td><button style = {{backgroundColor:"skyblue", width:"40px", height:"40px", transition:"0.5s"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                } else if(mode === 3) {
                    child.push(<td><button style = {{backgroundColor:"#ffee7e", width:"40px", height:"40px", transition:"0.5s"}} onMouseDown = {() => this.set(i, j)} onMouseUp = {this.table}></button></td>)
                }
            }
            arr.push(<tbody><tr>{child}</tr></tbody>)
        }
        this.setState({
            table:arr
        })
    }
    //============== 시작점, 도착점 찾기 ======================
    findS = () => {
        const { map, height, width } = this.state;

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if( map[i][j] == 2) return true;
            }
        }

        return false;
    }
    findE = () => {
        const { map, height, width } = this.state;

        for(let i = 0; i < height; i++){
            for(let j = 0; j < width; j++){
                if( map[i][j] == 3) return true;
            }
        }

        return false;
    }
    //======================= BFS =============================
    bfs = () => {
        let path = [];
        let queue = [];

        let start = {
            x:-1,
            y:-1
        }
        let end = {
            x:-1,
            y:-1
        }
        const dx = [0, 0, 1, -1];
        const dy = [1, -1, 0, 0];

        const { map, height, width } = this.state;

        for(let i = 0; i < height; i++){
            let idx = [];
            for(let j = 0; j < width; j++){
                if (map[i][j] == 0 || map[i][j] == 2 || map[i][j] == 3) {
                    idx.push({
                        noObstacles:true,
                        visit:false
                    })
                    if (map[i][j] == 2) {
                        start = {
                            x:i,
                            y:j
                        }
                    } else if (map[i][j] == 3) {
                        end = {
                            x:i,
                            y:j
                        }
                    }
                } else {
                    idx.push({
                        noObstacles:false,
                        visit:false
                    })
                }
            }
            path.push(idx);
        }
        
        let current = start;

        path[current.x][current.y].visit = true;
        queue.push(current);

        while(queue.length != 0){
            current = queue.shift();

            for(let i = 0; i < 4; i++){
                const next = {
                    x:current.x + dx[i],
                    y:current.y + dy[i]
                }
                
                if(next.x >= 0 && next.x < width && next.y >= 0 && next.y < height){
                    if(end.x == next.x && end.y == next.y) {
                        return true;
                    } else {
                        const target = path[next.x][next.y];

                        if(target.noObstacles == true && target.visit == false){
                            path[next.x][next.y].visit = true;
                            queue.push(next)
                        }
                    }
                }
            }
        }
        return false;
    }
    render(){
        return(
            <div>
                <Head/>
                <div className = 'size'>
                    <input name = 'height' placeholder = 'height' onChange = {this.handleChange}></input>&nbsp;
                    <input name = 'width' placeholder = 'width' onChange = {this.handleChange}></input>&nbsp;
                    <button onClick = {this.size}>Build</button>
                </div>
                <br/>
                <div className = 'mode'>
                    <button id = "obs" onClick = {this.setmodO}>obstacle</button>&nbsp;
                    <button id = "start" onClick = {this.setmodS}>start</button>&nbsp;
                    <button id = "end" onClick = {this.setmodE}>end</button>&nbsp;
                    <button id = "cancel" onClick = {this.setmodC}>CANCEL</button>
                </div>
                <div className = 'tip'>
                    <p>맵의 크기는 최대 30x30까지 지원합니다.</p>
                </div>
                <div className = 'title'>
                    <input name = 'title' placeholder = 'INPUT TITLE HERE' onChange = {this.handleChange}></input>
                </div>
                <div className = 'save'>
                    <button onClick = {this.save}>SAVE</button>
                </div>
                <div className = 'table'>
                    <table>{this.state.table}</table>
                </div>
            </div>
        );
    }
}
export default Maker;