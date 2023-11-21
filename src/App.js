import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

const API_URL = "http://localhost:9000/questions";

const initialState = { questions: [], status: "loading", index: 0 };

function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return { ...state, status: "active" };
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [{ questions, status, index }, dispatch] = useReducer(
        reducer,
        initialState
    );

    const numQuestions = questions.length;
    const currentQuestion = questions[index];

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) {
                    // This will handle HTTP errors by throwing an error
                    throw new Error(`HTTP status code: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => dispatch({ type: "dataReceived", payload: data }))
            .catch((err) => {
                console.error(err);
                dispatch({ type: "dataFailed" });
            });
    }, []);

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "error" && <Error />}
                {status === "ready" && (
                    <StartScreen
                        numQuestions={numQuestions}
                        dispatch={dispatch}
                    />
                )}
                {status === "active" && <Question question={currentQuestion} />}
            </Main>
        </div>
    );
}
