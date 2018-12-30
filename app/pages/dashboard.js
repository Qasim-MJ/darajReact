import React,{Component} from 'react'
import { Button, Header, Image, Modal, Form , Grid , Divider, Message  } from 'semantic-ui-react'
import styled from 'styled-components'
import Context from '../pagesComponents/context.js'

let DashboardDiv = styled.div`
padding : 50px ;
width:100%;
`
let LeftDashboardDiv = styled.div`
    background-color : #29344E;
    color: white ;
    padding : 50px ;
    width : 100%;
    height : 100%;
`
let DashboardButton = styled.button`
   font-size : 1.2rem;
    margin-left : 15px;
    background-color : transparent;
    color: white ;
    opacity : 0.8;
    display: inline;
    border-radius: 5px;
    padding:5px;
`
class Dashboard extends Component {
    constructor(){
        super()
        this.state = {
            bookTitle:'',
            author:'',
            description:'',
            image : '',
            pdf : '',
            dashboardFormLoading : false
        }
    }

    addbook (){
        this.setState({dashboardFormLoading : true})
      
        let addBookURL = 'http://app-05ed6b0e-f15e-4831-b6af-267eef5804fa.cleverapps.io/api/books/addBook'
        let formData = new FormData();
        
        formData.append('bookTitle', this.state.bookTitle);
        formData.append('author', this.state.author);
        formData.append('description', this.state.description);
        formData.append('image', this.state.image);
        formData.append('pdf', this.state.pdf);


        fetch( addBookURL , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            })
            .then( (res) => {
                return res.json()

            })
            .then( (data) => {
                 if (data.success){
                    this.setState({dashboardFormLoading : false})
                    this.setState(this.state)
                    alert('Book Added Successfully')
                    location.reload()
                 } else {
                    this.setState({dashboardFormLoading : false})
                    alert('Please Enter Valid Book Informations')
                 }
            })
    }
    
    render() {
        return(
            <Context.Consumer>{
                (ctx) => {
                    return (
                        <Modal open={ctx.state.dashboardDisplay} size={"large"} dimmer={"blurring"} trigger={<DashboardButton onClick={()=>{ctx.displayDashboardModal()}}>Go to Dashboard</DashboardButton>}>
                            <Grid stackable columns={2}>
                                <Grid.Column width={4}>
                                    <LeftDashboardDiv>
                                             <h1>Dashboard</h1>
                                    </LeftDashboardDiv>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                <DashboardDiv>
                                  <h1>Add A Book</h1>
                                <Form onSubmit={()=>{this.addbook()}} loading={this.state.dashboardFormLoading}>
                                   <Grid  columns={2}>
                                      
                                            <Grid.Column>
                                                    <Form.Field required>
                                                    <label>Book Cover Image</label>
                                                    <input type="file" name="image"  
                                                    onChange={(event)=>{
                                                        this.setState({image : event.target.files[0]})
                                                    }}/>
                                                </Form.Field>
                                            </Grid.Column>
                                            <Grid.Column>
                                            <Form.Field required>
                                                    <label>Book PDF</label>
                                                    <input type="file" name="pdf" 
                                                    onChange={(event)=>{
                                                        this.setState({pdf : event.target.files[0]})
                                                    }}/>
                                                </Form.Field>
                                            </Grid.Column>
                                       
                                     
                                        
                                      
                                   </Grid>
                                   <Form.Field style={{marginTop : 20}} required>
                                            <label>Book Title</label>
                                            <input placeholder='Book Title' type="text"  value={this.state.bookTitle}
                                            onChange={(event)=>{
                                                this.setState({bookTitle : event.target.value})
                                            }}/>
                                        </Form.Field>
                                        <Form.Field required>
                                            <label>Author</label>
                                            <input placeholder='Author' type="text" value={this.state.author}
                                            onChange={(event)=>{
                                                this.setState({author : event.target.value})
                                            }}/>
                                        </Form.Field>

                                            <Form.Field required>
                                            <label>Description</label>
                                            <input placeholder='Description' type="text" value={this.state.description}
                                            onChange={(event)=>{
                                                this.setState({description : event.target.value})
                                            }}/>
                                        </Form.Field>
                                    <Button style={{backgroundColor : '#29344E' , color : "white"}} type='submit'>Add</Button>
                                    <Button style={{backgroundColor : '#B14242' , color : "white"}} onClick={()=>{ctx.closeDashboardModal()}}>Close</Button>

                                </Form>
                                </DashboardDiv>
                                </Grid.Column>
                            </Grid>
                        </Modal>    
                    )
                }
            }
                
            </Context.Consumer>
        )
    }
}

export default Dashboard
