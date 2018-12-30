import React,{Component} from 'react'
import styled from 'styled-components'
import Context from './context.js'
import LoginModal from './login.js';
import SignupModal from './signup.js';
import Dashboard from '../pages/dashboard.js'
import cover from '/assets/cover.jpg'
import logo from '/assets/logo.png'
import scroll from '/assets/scroll.gif'
import {Icon} from 'semantic-ui-react'

let Countainer = styled.div`
    width :100%;
`
let AboveHeader = styled.div`
    background-image: linear-gradient(to right, #29314C , #27F4D6);
    justify-content:center;
    align-items:center;
    
`

let LoginSignupCartDiv = styled.div`
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    max-width :1280px;
    padding: 15px;
`

let LoginSignupDiv = styled.div`
`
let CartDiv = styled.div`
`

let HelloSignoutDiv = styled.div`
    
`
let HelloText = styled.p`
    color : white; 
    font-size : 1.2rem;
    padding: 0 ;
    opacity:0.8;
    display : inline;
`
let HeaderButton = styled.button`
    font-size : 1.2rem;
    margin-left : 15px;
    background-color : transparent;
    color: white ;
    opacity : 0.8;
    display: inline;
    border-radius: 5px;
    padding:5px;
`

let CartButton = styled.button`
    background-color : transparent ; 
    border: none;
    color: white;
    font-size: 1.5rem;
    padding: 0 ;
`

let NavHeader = styled.div`
    background-image: url(${cover});
    height: 100vh;
    background-size : cover;
`

let NavLogoDiv = styled.div`
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    max-width :1280px;
    padding :15px;

`
let Nav = styled.div``
let Button = styled.button``
let Logo = styled.img`
    width : 120px;
    height: 52.8px;

`

let ReadABookDiv = styled.div`
    width : 100% ;
    display:flex;
    justify-content:center;
    align-items: center;
    padding-top : 20vh;
    flex-direction : column ;

`

let ScrollDiv = styled.div`
    width : 100% ;
    display:flex;
    justify-content:center;
    align-items: center;
    padding-top : 20vh;
    flex-direction : column ;

`

let ScrollGif = styled.img`
    width : 120px;
    opacity : 0.8;
`

let ReadABook = styled.h1`
    color : white;
    font-size: 4rem;

`

let ChangeTheWorld = styled.p`
    color : white;
    font-weight : lighter;
    font-size: 2rem;
    margin-top : -10px;
`


class Header extends Component {
    constructor(){
        super()
        this.state = {
        }
    }
    componentWillMount(){
     
            let userDetails = JSON.parse(localStorage.getItem("userDetails"))
            if (userDetails) {
                return (
                <Context.Consumer>
                    {
                        (ctx)=>{
                            let checkLoginData = ctx.checkLogin()
                            let checkAdmin = ctx.checkAdmin()
                            if (checkLoginData.success && checkAdmin) {
                                return (
                                    <AboveHeader>
                                        <LoginSignupCartDiv>
                                        <LoginSignupDiv>
                                        <HelloSignoutDiv>
                                            <HelloText>Hello, Admin {userDetails.name}</HelloText>
                                            <HeaderButton onClick={()=>{ctx.signout()}}>Sign out</HeaderButton>
                                            <Dashboard />
                                        </HelloSignoutDiv>
                                        </LoginSignupDiv>
                                        <CartDiv>
                                            <CartButton><Icon name="cart" /></CartButton>
                                        </CartDiv>
                                        </LoginSignupCartDiv>
                                    </AboveHeader>
                                )
                            } else {
                                return (
                                    <AboveHeader>
                                        <LoginSignupCartDiv>
                                        <LoginSignupDiv>
                                        <HelloSignoutDiv>
                                            <HelloText>Hello, {userDetails.name}</HelloText>
                                            <HeaderButton onClick={()=>{ctx.signout()}}>Sign out</HeaderButton>
                                        </HelloSignoutDiv>
                                        </LoginSignupDiv>
                                        <CartDiv>
                                            <CartButton><Icon name="cart" /></CartButton>
                                        </CartDiv>
                                        </LoginSignupCartDiv>
                                    </AboveHeader>
                                )
                            }
                           
                        }
                    }
                </Context.Consumer> )
            } else {
                return (
                    <AboveHeader>
                       <LoginSignupCartDiv>
                       <LoginSignupDiv>
                            <SignupModal />
                            <LoginModal /> 
                        </LoginSignupDiv>
                        <CartDiv>
                          <CartButton><Icon name="shopping bag" /></CartButton>
                        </CartDiv>
                       </LoginSignupCartDiv>
                    </AboveHeader>
                )
            }

    }
    render() {
        return (
            <Context.Consumer> 
                {
                    (ctx)=>{
                        return(
                            <Countainer>
                                {this.componentWillMount()}
                                <NavHeader>
                                    <NavLogoDiv>
                                        <Logo src={logo}></Logo>
                                        {/* <Nav>
                                            <Button>Home</Button>
                                            <Button>Books</Button>
                                            <Button>Locations</Button>
                                            <Button>About</Button>
                                            <Button>Contact</Button>
                                        </Nav> */}
                                    </NavLogoDiv>
                                    <ReadABookDiv>
                                        <ReadABook>Read A Book</ReadABook>
                                        <ChangeTheWorld>Change The World</ChangeTheWorld>
                                    </ReadABookDiv>
                                    <ScrollDiv>
                                        <ScrollGif src={scroll} />
                                    </ScrollDiv>
                                </NavHeader>
                            </Countainer>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}


export default Header