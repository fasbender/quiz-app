/* eslint-disable jsx-a11y/alt-text */
import { Button, MenuItem, TextField,  } from "@material-ui/core"
import { Alert } from '@material-ui/lab';
import { Categories } from '../../Data/Categories'
import { useState } from "react"
import { useHistory } from "react-router"
import Gif from "./dribbble.gif"
import './home.css'

const Home = ({name, setName, fetchQuestions}) => {

    const [category, setCategory] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [error, setError] = useState(false)

    const history = useHistory()

    const handleSubmit = () => {
        if(!category || !difficulty || !name) {
            setError(true)
            return
        } else {
            setError(false)
            fetchQuestions(category, difficulty)
            history.push("/quiz")
        }
    }

    return (
        <>
            <div className="home-container">
                <div className="select">
                    <span>Select Preferred Quiz</span>
                </div>
                <div className="img">
                    {/* <img width="40%" src={process.env.PUBLIC_URL + '/images/dribble.gif'}></img> */}
                    <img className="gif" src={Gif}></img>
                </div>
            </div>
            <div className="credentials">
                {error && <Alert severity="error" className="err">Please Fill In The Fields</Alert>}
                <br/>            
                <TextField className="textfield" label="Enter Your Name" variant="outlined" onChange={(e) => setName(e.target.value)}/>
                <br/>
                <TextField className="textfield" select label="Select Category" variant="outlined" onChange={(e) => setCategory(e.target.value)} value={category}>
                    {Categories.map(category => {
                        return(
                            <MenuItem key={category.category} value={category.value}>
                                {category.category}
                            </MenuItem>
                        )
                    })}
                </TextField>
                <br/>
                <TextField className="textfield" select label="Select Difficulty" variant="outlined" onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
                    <MenuItem key="Easy" value="easy">Easy</MenuItem>
                    <MenuItem key="Medium" value="medium">Medium</MenuItem>
                    <MenuItem key="Hard" value="hard">Hard</MenuItem>
                </TextField>
                <br/>
                <br/>
                <Button onClick={handleSubmit} className="btn" variant="contained" color="secondary" size="large">Start Quiz</Button>
            </div> 
        </>
    )
}

export default Home
