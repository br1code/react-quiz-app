export default function NextButton({ numQuestions, index, answer, dispatch }) {
    if (answer === null) return null;

    function handleOnClickNext() {
        dispatch({ type: "nextQuestion" });
    }

    function handleOnClickFinish() {
        dispatch({ type: "finish" });
    }

    const thereAreQuestionsLeft = index < numQuestions - 1;

    return (
        <button
            className="btn btn-ui"
            onClick={
                thereAreQuestionsLeft ? handleOnClickNext : handleOnClickFinish
            }
        >
            {thereAreQuestionsLeft ? "Next" : "Finish"}
        </button>
    );
}
