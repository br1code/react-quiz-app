import { createContext, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const SECONDS_PER_QUESTION = 30;
const API_URL = "http://localhost:9000/questions";

const QuizContext = createContext();

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

QuizProvider.propTypes = {
    children: PropTypes.any,
};

function QuizProvider({ children }) {
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

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(API_URL);

                if (!res.ok) {
                    throw new Error("Failed to fetch cities");
                }

                const data = await res.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (error) {
                console.error(error);
                dispatch({ type: "dataFailed" });
            }
        }

        fetchQuestions();
    }, []);

    function startQuiz() {
        dispatch({ type: "start" });
    }

    function answerQuestion(optionIndex) {
        dispatch({ type: "answer", payload: optionIndex });
    }

    function nextQuestion() {
        dispatch({ type: "nextQuestion" });
    }

    function finishQuiz() {
        dispatch({ type: "finish" });
    }

    function restartQuiz() {
        dispatch({ type: "restart" });
    }

    function tick() {
        dispatch({ type: "tick" });
    }

    return (
        <QuizContext.Provider
            value={{
                questions,
                status,
                index,
                answer,
                points,
                highscore,
                secondsRemaining,
                startQuiz,
                answerQuestion,
                nextQuestion,
                finishQuiz,
                restartQuiz,
                tick,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);

    if (context === undefined) {
        throw new Error("Attempted to use QuizContext outside of its provider");
    }

    return context;
}

export { QuizProvider, useQuiz };
