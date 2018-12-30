import React,{Component} from 'react'
import Context from './context.js'
import styled from 'styled-components'
import { Grid, Image ,Card, Icon } from 'semantic-ui-react'

let MainBooksDiv = styled.div`
    width:100%;
    display:flex;
    flex-direction : column ;
    justify-content:center;
    align-items:center;
    margin-top : 60px;
`

let NewBooksDiv = styled.div`
    max-width : 1280px;
    width :100%;;
    
`
let NewTitle = styled.p`
    font-size : 2rem;
    color : gray;
    padding : 5px;
`
let BookDiv = styled.div`
    margin: 0 auto;
    margin-bottom : 50px;
`
let BestBooksDiv = styled.div`

`

let DownloadButton = styled.button`
    background-color : #F9DF6A;
    border : none ;
    width:100%;
    padding:10px;
    font-size: 1.2rem;
    font-weight : bold;
`

let DownloadText = styled.p`
    opacity : 0.7;
`

class AllBooks extends Component {
    render(){
        return(
            <Context.Consumer>
                {
                    (ctx) =>{
                        return (
                            <MainBooksDiv>
                                <NewBooksDiv>
                                    <NewTitle>New and Noteworthy</NewTitle>
                                        <Grid stackable centered textAlign='center' columns={4}>
                                            {ctx.state.books.map((book,i) => {
                                                return (
                                                    <BookDiv>
                                                    <Grid.Column>
                                                        <Card>
                                                            <Image src={book.imageURL} />
                                                            <Card.Content>
                                                            <Card.Header>{book.bookTitle}</Card.Header>
                                                            <Card.Meta>
                                                                <span className='date'>{book.author}</span>
                                                            </Card.Meta>
                                                            </Card.Content>
                                                            <DownloadButton
                                                                onClick={()=>{
                                                                    let checkLoginData = ctx.checkLogin()
                                                                    if (checkLoginData.success) {
                                                                        open(`${book.pdfURL}`)
                                                                    } else {
                                                                        ctx.displayLoginModal()
                                                                    }
                                                                }}
                                                            >
                                                                <DownloadText>
                                                                     Download
                                                                </DownloadText>
                                                            </DownloadButton>
                                                        </Card>
                                                    </Grid.Column>
                                                    </BookDiv>
                                                )
                                            })}
                                    </Grid>
                                    <NewTitle>Best Sellers</NewTitle>
                                        <Grid stackable centered textAlign='center' columns={4}>
                                            {ctx.state.books.map((book,j) => {
                                                return (
                                                    <BookDiv>
                                                    <Grid.Column>
                                                        <Card>
                                                            <Image src={book.imageURL} />
                                                            <Card.Content>
                                                            <Card.Header>{book.bookTitle}</Card.Header>
                                                            <Card.Meta>
                                                                <span className='date'>{book.author}</span>
                                                            </Card.Meta>
                                                            </Card.Content>
                                                            <DownloadButton
                                                                onClick={()=>{
                                                                    let checkLoginData = ctx.checkLogin()
                                                                    if (checkLoginData.success) {
                                                                        open(`${book.pdfURL}`)
                                                                        
                                                                    } else {
                                                                        ctx.displayLoginModal()
                                                                    }
                                                                }}
                                                            >
                                                                <DownloadText>
                                                                     Download
                                                                </DownloadText>
                                                            </DownloadButton>
                                                        </Card>
                                                    </Grid.Column>
                                                    </BookDiv>
                                                )
                                            })}
                                    </Grid>
                                </NewBooksDiv>
                            </MainBooksDiv>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}


export default AllBooks