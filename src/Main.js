import react, { Component } from 'react';
import './Style/Main.css';
import Head from './Header/header'
import List from './MapList'
import { Link } from 'react-router-dom';

class Main extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if(localStorage.length == 0) localStorage.isLogged = false;
    }
    logout(){
        localStorage.clear();
        localStorage.isLogged = false;
    }
    render(){
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
                        <List/>
                    </div>
                    <div className = 'maker-button'>
                        { localStorage.isLogged === 'true' && <Link to = './maker'><button>맵 제작하기</button></Link> }
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;