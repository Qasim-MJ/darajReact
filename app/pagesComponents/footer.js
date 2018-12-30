import React,{Component} from 'react'
import styled from 'styled-components'

let FooterDiv = styled.div`
        height :300px;
        width:100%;
        margin-top :50px;
        background-color : #29344E ;
`
class Footer extends Component {
    render(){
        return(
            <FooterDiv></FooterDiv>
        )
    }
}

export default Footer