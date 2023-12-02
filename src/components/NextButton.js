import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
    const { questions, answer, index, nextQuestion, finishQuiz } = useQuiz();
    const numQuestions = questions.length;

    if (answer === null) return null;

    const thereAreQuestionsLeft = index < numQuestions - 1;

    return (
        <button
            className="btn btn-ui"
            onClick={thereAreQuestionsLeft ? nextQuestion : finishQuiz}
        >
            {thereAreQuestionsLeft ? "Next" : "Finish"}
        </button>
    );
}
