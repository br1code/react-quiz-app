import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const API_URL = "http://localhost:9000/questions";
const SECONDS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return { ...state, questions: action.payload, status: "ready" };
        case "dataFailed":
            return { ...state, status: "error" };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
            };
        case "answer":
            const question = state.questions.at(state.index);
            const isCorrectOption = question.correctOption === action.payload;
            const updatedPoints = isCorrectOption
                ? state.points + question.points
                : state.points;
            return { ...state, answer: action.payload, points: updatedPoints };
        case "nextQuestion":
            return { ...state, index: state.index + 1, answer: null };
        case "finish":
            const isGreaterHighscore = state.points > state.highscore;
            const updatedHighscore = isGreaterHighscore
                ? state.points
                : state.highscore;
            return {
                ...state,
                status: "finished",
                highscore: updatedHighscore,
            };
        case "restart":
            return {
                ...initialState,
                status: "ready",
                questions: state.questions,
            };
        case "tick":
            const updatedSecondsRemaining = state.secondsRemaining - 1;
            const timeIsOver = updatedSecondsRemaining <= 0;
            const updatedStatus = timeIsOver ? "finished" : state.status;
            return {
                ...state,
                status: updatedStatus,
                secondsRemaining: updatedSecondsRemaining,
            };
        default:
            throw new Error("Action unknown");
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
    } = state;

    const numQuestions = questions.length;
    const currentQuestion = questions[index];
    const maxPossiblePoints = questions.reduce(
        (prev, curr) => prev + curr.points,
        0
    );

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) {
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
                {status === "active" && (
                    <>
                        <Progress
                            numQuestions={numQuestions}
                            index={index + 1}
                            points={points}
                            maxPossiblePoints={maxPossiblePoints}
                        />
                        <Question
                            question={currentQuestion}
                            answer={answer}
                            dispatch={dispatch}
                        />
                        <Footer>
                            <Timer
                                secondsRemaining={secondsRemaining}
                                dispatch={dispatch}
                            />
                            <NextButton
                                numQuestions={numQuestions}
                                index={index}
                                answer={answer}
                                dispatch={dispatch}
                            />
                        </Footer>
                    </>
                )}
                {status === "finished" && (
                    <FinishScreen
                        points={points}
                        maxPossiblePoints={maxPossiblePoints}
                        highscore={highscore}
                        dispatch={dispatch}
                    />
                )}
            </Main>
        </div>
    );
}
