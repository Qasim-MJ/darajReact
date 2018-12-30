import React,{Component} from 'react'
import { Button, Header, Image, Modal, Form , Divider, Message  } from 'semantic-ui-react'
import styled from 'styled-components'

import Context from './context.js'

let LoginDiv = styled.div`
padding : 50px ;
`
let LoginButton = styled.button`
    background-color : transparent; 
    color : white ;
    border : none;
    font-size : 1.3rem;
    opacity : 0.8;
    padding :0 ;
    margin-left:30px;
`
class LoginModal extends Component {
    constructor(){
        super()
        this.state = {
            name:'',
            email:'',
            password:''
        }
    }
    render() {
        return(
            <Context.Consumer>{
                (ctx) => {
                    return (
                        <Modal open={ctx.state.loginModalDisplay} size={"small"} dimmer={"blurring"} trigger={<LoginButton onClick={()=>{ctx.displayLoginModal()}}>Login</LoginButton>}>
                            <LoginDiv>
                                <h1>Login</h1>
                                <p style={{color:'red' , fontSize : 16}}>Please Login to be able to Download Books</p>
                                <Form onSubmit={()=>{ctx.login(this.state.email,this.state.password)}} loading={ctx.state.loginFormLoading}>
                                    <Form.Field required>
                                        <label>Email</label>
                                        <input placeholder='Email' type="email"  value={this.state.email}
                                        onChange={(event)=>{
                                            this.setState({email : event.target.value})
                                        }}/>
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Password</label>
                                        <input placeholder='Password' type="password" value={this.state.password}
                                        onChange={(event)=>{
                                            this.setState({password : event.target.value})
                                        }}/>
                                    </Form.Field>
                                    <Button style={{backgroundColor : '#29344E' , color : "white"}} type='submit'>Login</Button>
                                    <Button style={{backgroundColor : '#B14242' , color : "white"}} onClick={()=>{ctx.closeLoginModal()}}>Close</Button>

                                </Form>
                                </LoginDiv>
                        </Modal>    
                    )
                }
            }
                
            </Context.Consumer>
        )
    }
}

export default LoginModal
