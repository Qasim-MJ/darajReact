import React ,{Component} from 'react'
import Header from '../pagesComponents/header.js'
import AllBooks from '../pagesComponents/allbooks.js'
import Footer from '../pagesComponents/footer.js'


class Home extends Component {
    render() {
        return (
            <div>
                <Header />
                 <AllBooks />
                 <Footer />
            </div>

        )
    }
}

export default Home