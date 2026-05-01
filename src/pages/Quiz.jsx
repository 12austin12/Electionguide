import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import './Quiz.css';

const Quiz = () => {
  const { language, isFirstTimeVoter } = useContext(AppContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: {
        en: 'What is the main purpose of a primary election?',
        es: '¿Cuál es el propósito principal de una elección primaria?'
      },
      answerOptions: [
        { answerText: { en: 'To elect the President', es: 'Para elegir al Presidente' }, isCorrect: false },
        { answerText: { en: 'To choose a political party\'s candidate', es: 'Para elegir al candidato de un partido político' }, isCorrect: true },
        { answerText: { en: 'To vote on new laws', es: 'Para votar sobre nuevas leyes' }, isCorrect: false },
        { answerText: { en: 'To register to vote', es: 'Para registrarse para votar' }, isCorrect: false },
      ],
      explanation: {
        en: 'Primary elections narrow down the candidates to one per political party before the general election.',
        es: 'Las elecciones primarias reducen los candidatos a uno por partido político antes de las elecciones generales.'
      }
    },
    {
      questionText: {
        en: 'True or False: You can only vote on Election Day.',
        es: 'Verdadero o Falso: Solo puede votar el Día de las Elecciones.'
      },
      answerOptions: [
        { answerText: { en: 'True', es: 'Verdadero' }, isCorrect: false },
        { answerText: { en: 'False', es: 'Falso' }, isCorrect: true },
      ],
      explanation: {
        en: 'Most states offer early voting and mail-in voting options before Election Day.',
        es: 'La mayoría de los estados ofrecen opciones de votación anticipada y por correo antes del Día de las Elecciones.'
      }
    },
    {
      questionText: {
        en: 'What do you typically need to bring to the polling place?',
        es: '¿Qué necesita traer generalmente al lugar de votación?'
      },
      answerOptions: [
        { answerText: { en: 'A copy of your tax return', es: 'Una copia de su declaración de impuestos' }, isCorrect: false },
        { answerText: { en: 'Valid ID (depending on state law)', es: 'Identificación válida (según la ley estatal)' }, isCorrect: true },
        { answerText: { en: 'Your birth certificate', es: 'Su certificado de nacimiento' }, isCorrect: false },
        { answerText: { en: 'Nothing', es: 'Nada' }, isCorrect: false },
      ],
      explanation: {
        en: 'Voter ID laws vary by state, but many require some form of valid identification.',
        es: 'Las leyes de identificación de votantes varían según el estado, pero muchas requieren alguna forma de identificación válida.'
      }
    }
  ];

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      <h1 className="text-center section-title">{language === 'en' ? 'Election Quiz' : 'Cuestionario Electoral'}</h1>
      
      {showScore ? (
        <div className="card score-section text-center">
          <h2>{language === 'en' ? 'Quiz Completed!' : '¡Cuestionario Completado!'}</h2>
          <p className="score-text">
            {language === 'en' 
              ? `You scored ${score} out of ${questions.length}` 
              : `Obtuvo ${score} de ${questions.length}`}
          </p>
          <button className="btn btn-primary" onClick={restartQuiz}>
            {language === 'en' ? 'Restart Quiz' : 'Reiniciar Cuestionario'}
          </button>
        </div>
      ) : (
        <div className="card question-section">
          <div className="question-count">
            <span>{language === 'en' ? 'Question' : 'Pregunta'} {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{questions[currentQuestion].questionText[language]}</div>
          
          {isFirstTimeVoter && (
            <div className="first-time-tip mb-4">
              <strong>💡 Hint: </strong> {questions[currentQuestion].explanation[language]}
            </div>
          )}

          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button 
                key={index} 
                className="btn btn-secondary answer-btn" 
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
              >
                {answerOption.answerText[language]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
