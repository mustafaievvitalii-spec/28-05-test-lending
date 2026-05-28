import { useEffect, useRef, useState } from 'react';

const services = [
  {
    icon: '⌁',
    title: 'Engine diagnostics',
    description: 'Dealer-grade scans, live data analysis, and precise fault tracing for modern performance platforms.'
  },
  {
    icon: '◈',
    title: 'Suspension repair',
    description: 'Geometry, damping, bushings, and chassis refinement for confident control and comfort.'
  },
  {
    icon: '◎',
    title: 'Turbo repair',
    description: 'Boost leak testing, turbocharger inspection, actuator calibration, and reliability-focused upgrades.'
  },
  {
    icon: '⇄',
    title: 'Exhaust systems',
    description: 'Performance exhaust fitting, sound tuning, flow improvements, and clean custom fabrication.'
  },
  {
    icon: '▲',
    title: 'Performance tuning',
    description: 'Staged ECU/TCU tuning, dyno-informed optimization, and safe power delivery planning.'
  },
  {
    icon: '✦',
    title: 'Detailing',
    description: 'Correction, ceramic protection, interior restoration, and delivery-level finishing.'
  }
];

const stats = [
  { value: 12, suffix: '+', label: 'Years of experience' },
  { value: 1800, suffix: '+', label: 'Completed projects' },
  { value: 24, suffix: 'mo', label: 'Warranty support' },
  { value: 32, suffix: '+', label: 'Modern equipment systems' }
];

const processSteps = ['Request', 'Diagnostics', 'Approval', 'Repair', 'Vehicle delivery'];

const reviews = [
  {
    name: 'Daniel K.',
    car: 'BMW M4 Competition',
    text: 'The diagnostic report was surgical. They fixed the issue, refined the map, and delivered the car like a showroom piece.'
  },
  {
    name: 'Sophia R.',
    car: 'Audi RS6',
    text: 'Premium communication from start to finish. The workshop feels more like a performance studio than a repair shop.'
  },
  {
    name: 'Michael T.',
    car: 'Porsche 911',
    text: 'Suspension setup, exhaust work, and detailing were all flawless. The car feels sharper and looks incredible.'
  }
];

const HERO_VIDEO_PLAYBACK_RATE = 1.5;

const faqs = [
  ['How long does diagnostics take?', 'Most diagnostic sessions take 60–90 minutes and include a clear digital report before repairs begin.'],
  ['Do you support performance builds?', 'Yes. We plan staged upgrades around reliability, thermal management, and measurable performance goals.'],
  ['Is warranty included?', 'Warranty terms depend on the service scope, but approved repairs and supplied parts include written coverage.']
];


function AnimatedNumber({ value, suffix, active }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      return undefined;
    }

    let animationFrameId;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min(1, (now - startTime) / duration);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [active, value]);

  return <strong>{displayValue}<span>{suffix}</span></strong>;
}

function App() {
  const heroVideoRef = useRef(null);
  const finalFrameTimeRef = useRef(0);
  const beforeAfterRef = useRef(null);
  const [isHeroVideoFinished, setIsHeroVideoFinished] = useState(false);
  const [visibleStats, setVisibleStats] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(52);
  const [activeReview, setActiveReview] = useState(0);

  const handleVideoMetadataLoaded = () => {
    const video = heroVideoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    video.defaultPlaybackRate = HERO_VIDEO_PLAYBACK_RATE;
    video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    finalFrameTimeRef.current = Math.max(0, video.duration - 0.08);
  };

  const handleVideoEnded = () => {
    const video = heroVideoRef.current;
    if (!video) return;

    const finalFrameTime = finalFrameTimeRef.current || Math.max(0, video.duration - 0.08);
    video.currentTime = finalFrameTime;
    video.pause();
    setIsHeroVideoFinished(true);
  };

  const handleComparisonMove = (event) => {
    const bounds = beforeAfterRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const clientX = event.touches?.[0]?.clientX ?? event.clientX;
    const nextPosition = ((clientX - bounds.left) / bounds.width) * 100;
    setSliderPosition(Math.min(88, Math.max(12, nextPosition)));
  };

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const statsSection = document.getElementById('advantages');
    if (!statsSection) return undefined;

    const statsObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisibleStats(true);
      statsObserver.disconnect();
    }, { threshold: 0.35 });

    statsObserver.observe(statsSection);
    return () => statsObserver.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}`);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page">
      <div className="cursor-light" aria-hidden="true" />

      <header className="hero" id="top">
        <video
          ref={heroVideoRef}
          className={`hero-video${isHeroVideoFinished ? ' hero-video--finished' : ''}`}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onLoadedMetadata={handleVideoMetadataLoaded}
          onEnded={handleVideoEnded}
          aria-hidden="true"
        >
          <source src="/videos/hero-car.mp4" type="video/mp4" />
        </video>
        <div className="hero-fallback" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />

        <nav className="nav container">
          <a href="#top" className="brand">Apex Motor Atelier</a>
          <div className="nav-links" aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="nav-btn">Book now</a>
        </nav>

        <div className="hero-content container">
          <p className="kicker reveal-line">Elite Garage & Tuning Studio</p>
          <h1 className="hero-title reveal-line">Premium Automotive Workshop</h1>
          <p className="hero-copy reveal-line">Professional diagnostics, repair, tuning and restoration for modern vehicles.</p>
          <div className="hero-actions reveal-line">
            <a href="#contact" className="btn btn-primary">Book a consultation</a>
            <a href="#services" className="btn btn-ghost">View services</a>
          </div>
        </div>
      </header>

      <main>
        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Precision services</p>
              <h2>Built for modern performance vehicles</h2>
            </div>
            <div className="grid services-grid">
              {services.map((service, index) => (
                <article className="service-card" key={service.title} data-reveal style={{ '--delay': `${index * 80}ms` }}>
                  <span className="service-icon">{service.icon}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-alt advantages-section" id="advantages">
          <div className="ambient ambient-one" aria-hidden="true" />
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Why choose us</p>
              <h2>Trusted workshop standards with boutique attention</h2>
            </div>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <article className="stat-card" key={stat.label} data-reveal style={{ '--delay': `${index * 90}ms` }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} active={visibleStats} />
                  <p>{stat.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section before-after-section" id="before-after">
          <div className="container split-layout">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Before / After</p>
              <h2>Restoration clarity with an interactive reveal</h2>
              <p className="section-copy">Drag across the comparison to preview a damaged finish transformed into a delivery-ready vehicle.</p>
            </div>
            <div
              className="comparison"
              ref={beforeAfterRef}
              onMouseMove={handleComparisonMove}
              onTouchMove={handleComparisonMove}
              data-reveal
              style={{ '--position': `${sliderPosition}%` }}
            >
              <div className="comparison-panel comparison-before"><span>Before</span></div>
              <div className="comparison-panel comparison-after"><span>After</span></div>
              <div className="comparison-handle" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="section section-alt process-section" id="process">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">How we work</p>
              <h2>A transparent timeline from request to delivery</h2>
            </div>
            <div className="timeline">
              {processSteps.map((step, index) => (
                <article className="timeline-step" key={step} data-reveal style={{ '--delay': `${index * 120}ms` }}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Client stories</p>
              <h2>Premium results, measured by driver confidence</h2>
            </div>
            <div className="review-slider" data-reveal>
              <div className="review-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
                {reviews.map((review) => (
                  <article className="review-card" key={review.name}>
                    <div className="stars" aria-label="5 star rating">★★★★★</div>
                    <blockquote>{review.text}</blockquote>
                    <p><strong>{review.name}</strong><span>{review.car}</span></p>
                  </article>
                ))}
              </div>
              <div className="review-dots" aria-label="Review slider controls">
                {reviews.map((review, index) => (
                  <button
                    className={index === activeReview ? 'is-active' : ''}
                    key={review.name}
                    type="button"
                    onClick={() => setActiveReview(index)}
                    aria-label={`Show review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-alt faq-section" id="faq">
          <div className="container split-layout">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">FAQ</p>
              <h2>Clear answers before the first inspection</h2>
            </div>
            <div className="faq-list" data-reveal>
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container split-layout">
            <div className="section-heading" data-reveal>
              <p className="section-kicker">Start your build</p>
              <h2>Book your consultation</h2>
              <p className="section-copy">Tell us about your vehicle and service goals. Our team will respond with the next best diagnostic step.</p>
            </div>
            <form className="lead-form" data-reveal>
              <label><input type="text" name="name" placeholder=" " required /><span>Name</span></label>
              <label><input type="tel" name="phone" placeholder=" " required /><span>Phone number</span></label>
              <label><input type="text" name="car" placeholder=" " required /><span>Car model</span></label>
              <label><input type="text" name="service" placeholder=" " required /><span>Service needed</span></label>
              <label className="full"><textarea name="message" rows="4" placeholder=" " required /><span>Message</span></label>
              <button type="submit" className="btn btn-primary full">Submit request</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
