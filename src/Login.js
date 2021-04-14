import { React, Component } from "react";
import Head from './Header/header'
import './Style/Login.css'
const ip = '3.36.223.82'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            pwd:'',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id:this.state.id,
            pwd:this.state.pwd
        }
        fetch('http://localhost:3001/login/', {
        //fetch(`http://${ip}:3001/login/`), {
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                alert('로그인 성공!')
                localStorage.isLogged = true;
            } else {
                alert('로그인 실패!')
            }
        })

    }
    render(){
        return (
            <div>
                <Head/>
                <div className = 'login'>
                    <form onSubmit={this.handleSubmit}>
                        <div className = 'loginitem'>
                            <input name = 'id' type = 'text' placeholder = ' 아이디' onChange={this.handleChange}></input><br/>
                        </div>
                        <div className = 'loginitem'>
                            <input name = 'pwd' type = 'password' placeholder = ' 패스워드' onChange={this.handleChange}></input><br/>
                        </div>
                        <div>
                            <button onSubmit>로그인</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;




