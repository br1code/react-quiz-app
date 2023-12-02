import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
    const { questions, index, points } = useQuiz();
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce(
        (prev, curr) => prev + curr.points,
        0
    );

    return (
        <header className="progress">
            <progress max={numQuestions} value={index} />
            <p>
                Question <strong>{index}</strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}
