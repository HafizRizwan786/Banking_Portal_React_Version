import { useNavigate } from "react-router-dom"
import { FEATURES } from "../utils/constants"

function HomeMain() {
    const navigate = useNavigate();

    return (
        <main>
            <section className="hero" id="home">
                <div className="hero-content">
                    <h1>Welcome to Banking App</h1>
                    <p>Our simple banking portal offers a fast, secure, and intuitive way to manage your money in real time.
                        Effortlessly track your balance, view transaction history, and send instant payments with total
                        peace of mind.</p>
                    <button onClick={() => navigate('/signup')} className="get-started-btn" id="start">Get Started</button>
                </div>
            </section>

            <section className="feature" id="feature">
                <h1>Our Features</h1>
                <div className="feature-container">
                    <div className="first">
                        {FEATURES.slice(0, 2).map(feature => (
                            <div className="feature-card" key={feature.title}>
                                <h2>{feature.title}</h2>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="second">
                        {FEATURES.slice(2, 4).map(feature => (
                            <div className="feature-card" key={feature.title}>
                                <h2>{feature.title}</h2>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default HomeMain