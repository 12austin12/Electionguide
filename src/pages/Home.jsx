import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Map, Calendar, CheckCircle, PlayCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

const Home = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);

  const t = {
    en: {
      welcome: "Election Guide",
      subtitle: "Your definitive interactive platform for civic education and election readiness.",
      firstTimeWelcome: "Welcome, First-Time Voter! We're here to guide you to the ballot box.",
      getStarted: "Explore the Guide",
      features: "Learning Modules",
      cards: [
        { title: "Voting Guide", desc: "Comprehensive step-by-step instructions on the voting process.", path: "/guide", icon: <Map size={32} /> },
        { title: "Voting Simulator", desc: "Experience the voting process interactively in our virtual polling booth.", path: "/simulator", icon: <PlayCircle size={32} /> },
        { title: "Election Timeline", desc: "Important dates, deadlines, and milestones you can't miss.", path: "/timeline", icon: <Calendar size={32} /> },
        { title: "Eligibility Checker", desc: "Instantly verify if you meet the requirements to cast your vote.", path: "/eligibility", icon: <CheckCircle size={32} /> }
      ]
    },
    es: {
      welcome: "Guía Electoral",
      subtitle: "Su plataforma interactiva definitiva para la educación cívica y la preparación electoral.",
      firstTimeWelcome: "¡Bienvenido, votante primerizo! Estamos aquí para guiarle hasta las urnas.",
      getStarted: "Explorar la Guía",
      features: "Módulos de Aprendizaje",
      cards: [
        { title: "Guía de Votación", desc: "Instrucciones detalladas paso a paso sobre el proceso de votación.", path: "/guide", icon: <Map size={32} /> },
        { title: "Simulador de Votación", desc: "Experimente el proceso de votación interactivamente en nuestra cabina virtual.", path: "/simulator", icon: <PlayCircle size={32} /> },
        { title: "Calendario Electoral", desc: "Fechas, plazos e hitos importantes que no se puede perder.", path: "/timeline", icon: <Calendar size={32} /> },
        { title: "Verificador de Elegibilidad", desc: "Verifique instantáneamente si cumple con los requisitos para votar.", path: "/eligibility", icon: <CheckCircle size={32} /> }
      ]
    }
  };

  const content = t[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section 
        className="hero-section glass-card text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="hero-badge">
          <ShieldCheck size={16} /> <span>{language === 'en' ? 'Official Civic Platform' : 'Plataforma Cívica Oficial'}</span>
        </div>
        <h1 className="hero-title">{content.welcome}</h1>
        <p className="hero-subtitle">{isFirstTimeVoter ? content.firstTimeWelcome : content.subtitle}</p>
        
        <div className="hero-actions">
          <Link to="/guide" className="btn btn-primary hero-btn">
            {content.getStarted} <ArrowRight size={20} />
          </Link>
          <Link to="/simulator" className="btn btn-secondary hero-btn">
            {language === 'en' ? 'Try Simulator' : 'Probar Simulador'} <Zap size={20} className="text-warning" />
          </Link>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">{content.features}</h2>
          <div className="title-underline"></div>
        </div>
        
        <motion.div 
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {content.cards.map((card, idx) => (
            <motion.div variants={itemVariants} key={idx}>
              <Link to={card.path} className="card feature-card glass-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">{card.icon}</div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{card.title}</h3>
                  <p className="feature-desc">{card.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
