import React ,{Component} from 'react'
import Home from './pages/home.js'
import Context from './pagesComponents/context.js'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'



class App extends Component {
    constructor(){
        super()
        this.state = {
            loginModalDisplay : false,
            dashboardDisplay : false,
            dashboardFormLoading  : false,
            loginFormLoading  : false,
            signupModalDisplay : false,
            signupFormLoading  : false,
            token : "",
            books : [{id : "" , bookTitle : "" , author : "" , imageURL : "" , pdfURL : ""}],
            checkLoginData : {},
            isAdmin : false

        }
    }

    checkLogin(){
        let userDetails = JSON.parse(localStorage.getItem("userDetails"))
        if (userDetails) {
            let token = userDetails.token
            let checkLoginURL = "https://daraj.herokuapp.com/api/user/checkLogin"
            fetch( checkLoginURL , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: token
                    
                })
            })
            .then( (res) => {
                return res.json()

            })
            .then( (data) => {
                this.setState({checkLoginData : data})
            })
            this.setState(this.state)
            return this.state.checkLoginData.success
        } else {
            return this.setState({checkLoginData : {'success' : false}})
        }
    
    }

    checkAdmin() {
        let userDetails = JSON.parse(localStorage.getItem("userDetails"))
        if (userDetails) {
            let email = userDetails.email
            let checkAdminURL = "http://app-05ed6b0e-f15e-4831-b6af-267eef5804fa.cleverapps.io/api/user/checkAdmin"
            fetch( checkAdminURL , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                    
                })
            })
            .then( (res) => {
                return res.json()

            })
            .then( (data) => {
                this.setState({isAdmin : data.isAdmin})
            })
            this.setState(this.state)
            return this.state.isAdmin
    }
}
    componentWillMount() {
        let getAllBooksURL = "http://app-05ed6b0e-f15e-4831-b6af-267eef5804fa.cleverapps.io/api/books/books"
        fetch( getAllBooksURL , {
            method: 'Get',
        })
        .then( (res) => {
            return res.json()

        })
        .then( (data) => {
            this.setState({books : data})
        })

        this.checkLogin()
        this.checkAdmin()
    }

    
      
    render(){
        return (
            <Context.Provider
                value = {{
                    state : this.state,
                    checkLogin : ()=>{
                       return this.state.checkLoginData
                    },
                    checkAdmin: () => {
                        return this.state.isAdmin
                    },
                    login : (email,password) => {
                        this.setState({loginFormLoading : true})
                        let loginURL = 'http://app-05ed6b0e-f15e-4831-b6af-267eef5804fa.cleverapps.io/api/user/login'
                        fetch( loginURL , {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password
                                })
                            })
                            .then( (res) => {
                                return res.json()

                            })
                            .then( (data) => {
                                 if (data.success){
                                    let userDetails = {name : data.name , token : data.token, email:email}
                                    this.setState({loginFormLoading : false , loginModalDisplay : false})
                                    localStorage.setItem('userDetails' , JSON.stringify(userDetails))
                                    this.setState(this.state)
                                    this.checkLogin()
                                 } else {
                                    this.setState({loginFormLoading : false})
                                    alert('Wrong Email or password')
                                 }
                                this.checkAdmin()
                            })
                    },
                    displayLoginModal : ()=> {this.setState({loginModalDisplay : true})},
                    closeLoginModal : ()=> {this.setState({loginModalDisplay : false})},
                    signup : (email,password, name) => {
                        this.setState({signupFormLoading : true})
                        let signnupURL = 'http://app-05ed6b0e-f15e-4831-b6af-267eef5804fa.cleverapps.io/api/user/register'
                        fetch( signnupURL , {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    email: email,
                                    password: password,
                                    name : name
                                })
                            })
                            .then( (res) => {
                                return res.json()

                            })
                            .then( (data) => {
                                 if (data.success){
                                    let userDetails = {name : name , token : data.token , email : email}
                                    this.setState({signupFormLoading : false , signupModalDisplay : false})
                                    localStorage.setItem('userDetails' , JSON.stringify(userDetails))
                                    this.setState(this.state)
                                    this.checkLogin()
                                 } else {
                                    this.setState({loginFormLoading : false})
                                    console.log(data)
                                    alert('Please Enter Valid Email and Password')
                                 }

                            })
                    },
                    displaySignupModal : ()=> {this.setState({signupModalDisplay : true})},
                    closeSignupModal : ()=> {this.setState({signupModalDisplay : false})},
                    displayDashboardModal : ()=> {this.setState({dashboardDisplay : true})},
                    closeDashboardModal : ()=> {this.setState({dashboardDisplay : false})},
                    signout : ()=>{

                        
                        localStorage.removeItem("userDetails") ; this.setState(this.state)
                        this.checkLogin()
                        this.checkAdmin()
                    },
  
                }}>
                <Router>
                    <Home />
                </Router>
            </Context.Provider>    
        )
    }
}

export default App
