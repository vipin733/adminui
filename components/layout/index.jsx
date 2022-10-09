import Footer from "./footer"
import Header from "./header"

const Layout = (props) => {
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <Header/>
                {props.children}
                <Footer/>
            </div>
        </div>
    )
}

export default Layout