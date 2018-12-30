import React,{Component} from 'react'
import { Button, Header, Image, Modal, Form , Divider, Message  } from 'semantic-ui-react'
import styled from 'styled-components'

import Context from './context.js'

let SignupDiv = styled.div`
padding : 50px ;
`

let SignupButton = styled.button`
    background-color : transparent; 
    color : white ;
    border : none;
    font-size : 1.3rem;
    opacity : 0.8;
    padding : 0;
`

class SignupModal extends Component {
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
                        <Modal open={ctx.state.signupModalDisplay} size={"small"} dimmer={"blurring"} trigger={<SignupButton onClick={()=>{ctx.displaySignupModal()}}>Sign up</SignupButton>}>
                            <SignupDiv>
                                <h1>Sign up</h1>
                                <Form onSubmit={()=>{ctx.signup(this.state.email,this.state.password , this.state.name)}} loading={ctx.state.loginFormLoading}>
                                    <Form.Field required>
                                        <label>Name</label>
                                        <input placeholder='Name' type="text"  value={this.state.name}
                                        onChange={(event)=>{
                                            this.setState({name : event.target.value})
                                        }}/>
                                    </Form.Field>
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
                                    <Button style={{backgroundColor : '#29344E' , color : "white"}} type='submit'>Sign up</Button>
                                    <Button style={{backgroundColor : '#B14242' , color : "white"}} negative onClick={()=>{ctx.closeSignupModal()}}>Close</Button>

                                </Form>
                                </SignupDiv>
                        </Modal>    
                    )
                }
            }
                
            </Context.Consumer>
        )
    }
}

export default SignupModal
