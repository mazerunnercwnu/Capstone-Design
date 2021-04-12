import { React, component } from "react";
import Head from './Header/header'

class Login extends Component {
    
    render(){
        return (
            <div>
                <Head/>
                <div>
                    <a>아이디</a><br/>
                    <input type = 'text' placeholder = '아이디'></input><br/>
                    <a>패스워드</a><br/>
                    <input type = 'password' placeholder = '패스워드'></input><br/>
                </div>
            </div>
        );
    }
}

export default Login;




