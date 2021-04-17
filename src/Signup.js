import React, { Component } from 'react';
import Head from './Header/header'
import './Style/Signup.css'
const ip = '3.36.223.82'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            pwd:'',
            cpwd:'',
            alertID : '',
            alertPwd : '',
            checkedID : false,
            checkedPWD : false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        },
        () => {
            if (e.target.name === 'pwd' || e.target.name === 'cpwd'){ // 비밀번호 비교
                this.checkPwd();
            } else if (e.target.name === 'id'){ // id의 input이 변경 될 경우 아이디 중복 재검사
                this.setState({
                    alertID : '',
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
            return;
        } else if (this.state.checkedPWD === false) {
            alert('비밀번호를 다시 확인해주세요!');
            return;
        } else {
            const data = {
                id : e.target.id.value,
                pwd : e.target.pwd.value
            }
            // fetch(`http://localhost:3001/check/`, {
            fetch(`http://${ip}:3001/signup/`, {
                method:"post",
                headers: {
                    "content-type":"application/json"
                },
                body: JSON.stringify(data)
            })
            alert('회원가입이 완료되었습니다!')
        }
    }
    checkID = (e) => {
        e.preventDefault();
        let message = '';
        const data = {
            id : this.state.id
        }
        // fetch(`http://localhost:3001/check/`, {
        fetch(`http://${ip}:3001/check/`, {
            method:"post",
            headers: {  
                "Content-Type":"application/json" 
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.possible === true){
                this.setState({
                    alertID : '사용 가능한 ID입니다.',
                    checkedID : true
                })
            } else {
                this.setState({
                    alertID : '사용 불가능한 ID입니다.',
                    checkedID : false
                })
            }
        })
    }
    checkPwd = () => {
        if ( this.state.pwd === this.state.cpwd) {
            if(this.state.pwd === ''){
                this.setState({
                    alertPwd : '',
                    checkedPWD : false
                })
                return;
            }
            this.setState({
                alertPwd : '비밀번호가 일치합니다.',
                checkedPWD : true
            })
        } else {
            this.setState({
                alertPwd : '비밀번호가 일치하지 않습니다.',
                checkedPWD : false
            })
        }
    }
    render(){
        return(
            <div>
                <Head/>
                <div className = 'signup'>
                    <form onSubmit={this.handleSubmit}>
                        <div className = 'signupitem'>
                            <label htmlFor = 'id'>아이디 </label><br/>
                            <input name = 'id' type = 'text' placeholder = ' 아이디 입력' value = {this.state.id} onChange = {this.handleChange} onBlur = {this.checkID}/><br/>
                        </div>
                        <div className = 'alert'>
                            {this.state.alertID}
                        </div>
                        <div className = 'signupitem'>
                            <label htmlFor = 'pwd'>비밀번호 </label><br/>
                            <input name = 'pwd' type = 'password' placeholder = ' 비밀번호 입력' value = {this.state.pwd} onChange = {this.handleChange}/><br/>
                        </div>
                        <div className = 'signupitem'>
                            <label htmlFor = 'cpwd'>비밀번호 확인 </label><br/>
                            <input name = 'cpwd' type = 'password' placeholder = ' 비밀번호 재입력' value = {this.state.cpwd} onChange = {this.handleChange}/>
                        </div>
                        <div className = 'alert'>
                            {this.state.alertPwd}
                        </div>
                        <div className = 'submit'>
                            <input type = 'submit' value = '회원가입'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup;