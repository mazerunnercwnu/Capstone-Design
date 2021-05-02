import react, { Component } from 'react';
import './Style/Main.css';
import Head from './Header/header'
import List from './MapList'
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            page:this.props.match.params.page,
            length:0
        }
    }
    componentDidMount(){
        if(localStorage.length == 0) localStorage.isLogged = false;
        if(this.state.page == undefined) this.setState({page:0})
        this.length();
    }

    length = () => {
        fetch('http://localhost:3001/length')
        .then(res => res.json())
        .then(data => {
            this.setState({
                length:parseInt((data[0].cnt - 1) / 10)
            })
        })
    }

    logout = () => {
        localStorage.clear();
        localStorage.isLogged = false;
    }

    prev = () => {
        if(this.state.page == 0) {
            alert('첫번째 페이지입니다!');
            return;
        }
        this.setState({
            page : this.state.page - 1
        })
    }
    next = () => {
        if(this.state.page == this.state.length) {
            alert('마지막 페이지입니다!')
            return;
        }
        this.setState({
            page : parseInt(this.state.page + 1)
        })
    }
    render(){
        console.log(this.state.page);
        console.log(this.state.length);
        return(
            <div>
                <Head/>
                <div className = 'wrapper'>
                    <div className = 'login-button'>
                        { localStorage.isLogged === 'false' && <Link to = './login'><button>로그인</button></Link>}
                    </div>
                    <div className = 'signup-button'>
                        { localStorage.isLogged === 'false' && <Link to = './signup'><button>회원가입</button></Link>}
                    </div>
                    <div className = 'logout-button'>
                        { localStorage.isLogged === 'true' && <Link to = './'><button onClick = {this.logout}>로그아웃</button></Link>}
                    </div>
                    <div className = 'link-table'>
                        <List page = {this.props.match.params.page}/>
                    </div>
                    <div className = 'maker-button'>
                        { localStorage.isLogged === 'true' && <Link to = './maker'><button>맵 제작하기</button></Link> }
                    </div>
                    <div className = 'paging-button'>
                        <a href = {`./${this.state.page}`}><button onClick = {this.prev}>←</button></a>&nbsp;
                        <a href = {`./${this.state.page}`}><button onClick = {this.next}>→</button></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;