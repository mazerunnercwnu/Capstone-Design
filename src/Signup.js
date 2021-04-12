import React, { Component } from 'react';
import Head from './Header/header'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            pwd:'',
            cpwd:'',
            message : '',
            checkedID : false,
            checkedPWD : false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        },
        () => {
            if (e.target.name === 'pwd' || e.target.name === 'cpwd'){
                this.checkPwd();
            } else if (e.target.name === 'id'){
                this.setState({
                    checkedID : false
                })
            }
        }
        )
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.checkedID === false) {
            alert('ID 중복 확인을 해주세요!');
            return false;
        } else if (this.state.checkedPWD === false) {
            alert('비밀번호를 다시 확인해주세요!');
            return false;
        } else {
            alert('회원가입이 완료되었습니다!')
            return true;
        }
    }
    checkID = (e) => {
        e.preventDefault();
        let message = '';
        const data = {
            id : this.state.id
        }
        fetch('http://localhost:3001/check/', {
            method:"post",
            headers: {  
                "Content-Type":"application/json" 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.possible === true){
                alert('사용 가능한 ID입니다.');
                this.setState({
                    checkedID : true
                })
            } else {
                alert('사용 불가능한 ID입니다.');
            }
        })
    }
    checkPwd = () => {
        if ( this.state.pwd === this.state.cpwd) {
            if(this.state.pwd === ''){
                this.setState({
                    message : '',
                    checkedPWD : false
                })
                return;
            }
            this.setState({
                message : '비밀번호가 일치합니다.',
                checkedPWD : true
            })
        } else {
            this.setState({
                message : '비밀번호가 일치하지 않습니다.',
                checkedPWD : false
            })
        }
    }
    render(){
        return(
            <div className = 'login'>
                <div className = 'inputbox'>
                    <form action = 'http://localhost:3001/signup' method = 'post' onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor = 'id'>아이디</label><br/>
                            <input type = 'text' name = 'id' placeholder = '아이디 입력' value = {this.state.id} onChange = {this.handleChange}/>
                            <button onClick = {this.checkID}> 중복 확인 </button><br/>
                        </div>
                        <div>
                            <label htmlFor = 'pwd'>비밀번호</label><br/>
                            <input type = 'password' name = 'pwd' placeholder = '비밀번호 입력' value = {this.state.pwd} onChange = {this.handleChange}/><br/>
                        </div>
                        <div>
                            <label htmlFor = 'cpwd'>비밀번호 확인</label><br/>
                            <input type = 'password' name = 'cpwd' placeholder = '비밀번호 재입력' value = {this.state.cpwd} onChange = {this.handleChange}/>
                        </div>
                        <button onSubmit>회원가입</button>
                    </form>{this.state.message}
                </div>
            </div>
        )
    }
}

export default Signup;