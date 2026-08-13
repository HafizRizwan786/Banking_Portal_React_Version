import { useState } from "react";
import { useToast } from "../context/ToastContext";

function Footer() {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            showToast('Please fill in all fields', 'warning');
            return;
        }
        showToast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="right">
                    <section className="about" id="about">
                        <h2>Banking App</h2>
                        <p>Banking App is a web application that allows users to manage their bank accounts, view
                            transaction history, and perform various banking operations online.</p>
                    </section>

                    <section className="quick-links">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#feature">Features</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </section>
                </div>

                <div className="left">
                    <section className="contact" id="contact">
                        <h2>Contact Us</h2>
                        <p><b>Email:</b> info@bankingapp.com</p>
                        <p><b>Phone:</b> +1 (123) 456-7890</p>
                        <p><b>Address:</b> Faisalabad, Pakistan</p>
                    </section>

                    <section className="message">
                        <h2>Send us a message</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                aria-label="Your Name"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                aria-label="Your Email"
                            />
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                aria-label="Your Message"
                            ></textarea>
                            <button type="submit">Send Message</button>
                        </form>
                    </section>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Banking App. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer