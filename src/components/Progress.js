export default function Progress({
    numQuestions,
    index,
    points,
    maxPossiblePoints,
}) {
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
