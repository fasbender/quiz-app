import { useEffect, useState } from 'react'
import CircularProgress from "@material-ui/core/CircularProgress"
import Paper from '@material-ui/core/Paper';
import { Alert } from '@material-ui/lab';
import Questions from '../../components/Questions/Questions';
import './quiz.css'

const Quiz = ({name, questions, score, loading, setQuestions, setScore}) => {

    const [options, setOptions] = useState()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
       setOptions(
           questions && handleShuffle([
               questions[current]?.correct_answer,
               ...questions[current]?.incorrect_answers
           ])
       )
    }, [questions, current])

    const handleShuffle = (option) => {
        return option.sort(() => Math.random() - 0.5)
    }

    return (
        <>
            <div className="name">
                <Paper style={{padding: '5px', background: '#343a40'}} elevation={5}><h3 className="hi" style={{color: 'whitesmoke'}}>Hi, {name}!</h3></Paper>
                <br/>
                <br/>
                {loading ? (
                    <CircularProgress color="secondary"/>
                ) : (
                    <>
                        {questions ? (
                            <div className="quiz-info">
                               <div className="current-score">
                                    <span>{questions[current].category}</span>
                                    <span>Score: {score}</span>
                                </div>
                                <div className="question">
                                    <Questions current={current} setCurrent={setCurrent} questions={questions} options={options} correct={questions[current]?.correct_answer} score={score} setScore={setScore} setQuestions={setQuestions}/>
                                </div> 
                            </div>
                        ) : (
                            <>
                                <Alert severity="error" className="err">Unable To Load Questions</Alert>
                            </>
                        )}
                        
                    </>
                )}
            </div>
        </>
    )
}

export default Quiz
