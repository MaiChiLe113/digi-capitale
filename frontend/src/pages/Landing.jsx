import React  from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
    <div className="landing-page">
        <main>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to D'Capitale</h1>
                    <p className='hero-subtitle'>Where Prime Location Meets Perfect Connection</p>
                    <Link to="/about" className="btn btn-primary">Find out more</Link>
                </div>
                <div className='hero-image'>
                    <img src="https://vinhomelands.com/Areas/Admin/Content/Fileuploads/images/vinhomes%20-d'capitale.jpg" alt="D'Capitale Building" />
                </div>
            </section>

            {/* Service Section */}
            <section className="services-section">
                <h2>Our Services</h2>
                <p>Discover the range of services we offer to enhance your living experience.</p>
                <Link to="/login" className="btn btn-secondary">Log In to Explore Services</Link>
            </section>

            {/* Resident Dynamic Website Section */}
            <section className="resident-website-section">
                <h2>Resident Dynamic Website</h2>
                <p>Access your personalized resident portal for exclusive features and updates.</p>
                <Link to="/login" className="btn btn-secondary">Log In to Resident Portal</Link>
            </section>
        </main>
    </div>
    );
};