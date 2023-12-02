import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
    const { questions, startQuiz } = useQuiz();
    const numQuestions = questions.length;

    return (
        <div className="start">
            <h2>Welcome to The React Quiz</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={startQuiz}>
                Let's start
            </button>
        </div>
    );
}
