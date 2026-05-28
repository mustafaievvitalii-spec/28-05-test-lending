function App() {
  return (
    <div className="page">
      <header className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src="/videos/hero-car.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="nav container">
          <div className="brand">Apex Motor Atelier</div>
          <a href="#contact" className="nav-btn">Book now</a>
        </nav>

        <div className="hero-content container">
          <p className="kicker">Elite Garage & Tuning Studio</p>
          <h1>Premium Automotive Workshop</h1>
          <p>Professional diagnostics, repair, tuning and restoration for modern vehicles.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Book a consultation</a>
            <a href="#services" className="btn btn-ghost">View services</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="services">
          <div className="container">
            <h2>Services</h2>
            <div className="grid cards">
              {['Diagnostics', 'Engine repair', 'Suspension repair', 'Body work', 'Detailing', 'Performance tuning'].map((service) => (
                <article className="card" key={service}>{service}</article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt" id="advantages">
          <div className="container">
            <h2>Why choose us</h2>
            <div className="grid cards">
              {['Professional equipment', 'Experienced mechanics', 'Transparent pricing', 'Premium service'].map((item) => (
                <article className="card" key={item}>{item}</article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="reviews">
          <div className="container">
            <h2>Reviews</h2>
            <div className="grid reviews">
              <blockquote className="review">Outstanding precision and communication. My car drives better than new.</blockquote>
              <blockquote className="review">They explained every detail before work started. Premium service and clean execution.</blockquote>
              <blockquote className="review">Fast turnaround, top-tier diagnostics, and tasteful performance upgrades.</blockquote>
            </div>
          </div>
        </section>

        <section className="section section-alt" id="faq">
          <div className="container">
            <h2>FAQ</h2>
            <div className="faq-list">
              <details><summary>How long does a diagnostic session take?</summary><p>Most inspections take 60–90 minutes including a transparent report and quote.</p></details>
              <details><summary>Do you work with modern and performance vehicles?</summary><p>Yes, we specialize in modern daily drivers, premium brands, and tuned builds.</p></details>
              <details><summary>Can I request staged upgrades?</summary><p>Absolutely. We can plan progressive stages based on reliability and target performance.</p></details>
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <h2>Book your consultation</h2>
            <form className="lead-form">
              <label>Name<input type="text" name="name" required /></label>
              <label>Phone number<input type="tel" name="phone" required /></label>
              <label>Car model<input type="text" name="car" required /></label>
              <label>Service needed<input type="text" name="service" required /></label>
              <label className="full">Message<textarea name="message" rows="4" required /></label>
              <button type="submit" className="btn btn-primary full">Submit request</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
