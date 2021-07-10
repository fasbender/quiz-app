import { useState } from 'react'
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useHistory } from "react-router"
import './questions.css'

const Questions = ({current, setCurrent, questions, options, correct, score, setScore, setQuestions}) => {

    const [selected, setSelected] = useState()
    const [notSelected, setNotSelected] = useState(false)

    const history = useHistory()

    const handleSelected = (i) => {
        if (selected === i && selected === correct) return "right";
        else if (selected === i && selected !== correct) return "wrong";
        else if (i === correct) return "right";
    };

    const handleCheck = (i) => {
        setSelected(i);
        if (i === correct) setScore(score + 1);
        setNotSelected(false);
    };

    const handleNext = () => {
        if(current > 8) {
            history.push("/result")
        } else if(selected) {
            setCurrent(current + 1)
            setSelected()
        } else {
            setNotSelected("Please select an option")
        }
    }

    const handleQuit = () => {
        setCurrent(0);
        setQuestions();
        history.push("/")
    };

    return (
        <>
            <h2 style={{textAlign: 'center'}}>Question {current + 1}</h2>
            <div className="current-question">
                <h5>{questions[current].question}</h5>
                <br/>
                <div className="multipleChoice">
                    {notSelected && <Alert severity="error" className="err">Unable To Load Questions</Alert>}
                        {options.map((i) => {
                            return(
                                <Grid item xs={12} sm={12} md={8} lg={6}>
                                    <button className={`options ${selected && handleSelected(i)}`} onClick={() => handleCheck(i)} key={i} disabled={selected}>{i}</button>
                                </Grid>
                            )
                        })}
                </div>
                <div className="control">
                    <Button style={{width: '40%'}} variant="contained" color="secondary" size="large" onClick={() => handleQuit()}>Quit</Button>
                    <Button style={{width: '40%'}} variant="contained" color="primary" size="large" onClick={handleNext}>{current > 20 ? "Submit" : "Next"}</Button>
                </div>
            </div>
        </>
    )
}

export default Questions
