import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './Screens/Home/Home';
import Quiz from './Screens/Quiz/Quiz';
import Result from './Screens/Result/Result';
import { useState } from 'react';
import axios from 'axios'
import './App.css';

function App() {

  const [name, setName] = useState("")
  const [questions, setQuestions] = useState()
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchQuestions = async(category = "", difficulty = "") => {
      try {
        setLoading(true)
        const { data } = await axios.get(`https://opentdb.com/api.php?amount=10${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
        setQuestions(data.results)
      } catch (error) {
        setLoading(true)
        console.log(error)
      }
      setLoading(false)
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/" exact>
            <Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>
          </Route>
          <Route path="/quiz" exact>
            <Quiz name={name} questions={questions} setQuestions={setQuestions} score={score} setScore={setScore} loading={loading}/>
          </Route>
          <Route path="/result" exact>
            <Result score={score} name={name}/>
          </Route>
        </Switch>
      </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
