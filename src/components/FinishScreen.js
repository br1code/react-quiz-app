import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
    const { questions, points, highscore, restartQuiz } = useQuiz();
    const maxPossiblePoints = questions.reduce(
        (prev, curr) => prev + curr.points,
        0
    );
    const percentage = Math.ceil((points / maxPossiblePoints) * 100);

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
                ({percentage}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={restartQuiz}>
                Restart Quiz
            </button>
        </>
    );
}
