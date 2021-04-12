import { React, Component } from "react";
import Head from './Header/header'

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
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success === true){
                alert('로그인 성공!')
                if (typeof (Storage) == undefined) {
                    // 현재 브라우저에서는 web storage가 작동하지 않는다
                  } else {
                    localStorage.logged = true;      
                    // 여기에 local storage or session
                  }
            } else {
                alert('로그인 실패!')
            }
        })

    }
    render(){
        return (
            <div>
                <Head/>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor ='id'>아이디</label><br/>
                            <input name = 'id' type = 'text' placeholder = '아이디' onChange={this.handleChange}></input><br/>
                        </div>
                        <div>
                            <label htmlFor ='pwd'>패스워드</label><br/>
                            <input name = 'pwd' type = 'password' placeholder = '패스워드' onChange={this.handleChange}></input><br/>
                        </div>
                        <div>
                            <button onSubmit>로그인</button>&nbsp;
                            <button onClick>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;




