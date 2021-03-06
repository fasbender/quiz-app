import { useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import './result.css'

const Result = ({name, score}) => {

    const history = useHistory();

    useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, [name, history]);

    return (
        <div className="resultss">
            <h1>Final Score : {score}</h1>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                href="/"
            >
                Go to homepage
            </Button>
        </div>
    )
}

export default Result
