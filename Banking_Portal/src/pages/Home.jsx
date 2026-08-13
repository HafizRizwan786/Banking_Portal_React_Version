import Header from "../components/Header"
import HomeMain from "../components/HomeMain"
import Footer from "../components/Footer"

function Home(){
    return(
        <>
            <div className="home-page">
                <Header/>
                <HomeMain/>
                <Footer/>
            </div>
        </>
    )
}

export default Home