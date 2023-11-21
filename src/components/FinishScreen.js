export default function FinishScreen({
    points,
    maxPossiblePoints,
    highscore,
    dispatch,
}) {
    const percentage = Math.ceil((points / maxPossiblePoints) * 100);

    function handleOnClickRestart() {
        dispatch({ type: "restart" });
    }

    return (
        <>
            <p className="result">
                You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
                ({percentage}%)
            </p>
            <p className="highscore">(Highscore: {highscore} points)</p>
            <button className="btn btn-ui" onClick={handleOnClickRestart}>
                Restart Quiz
            </button>
        </>
    );
}
