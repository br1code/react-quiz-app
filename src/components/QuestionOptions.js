export default function QuestionOptions({ question, answer, dispatch }) {
    const questionWasAnswered = answer != null;

    function handleOnClick(optionIndex) {
        dispatch({ type: "answer", payload: optionIndex });
    }

    const addSelectedAnswerClass = (i) => (i === answer ? "answer" : "");

    const addCorrectAnswerClass = (i) => {
        if (!questionWasAnswered) return "";
        return i === question.correctOption ? "correct" : "wrong";
    };

    const addOptionsClasses = (i) =>
        `${addSelectedAnswerClass(i)} ${addCorrectAnswerClass(i)}`;

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${addOptionsClasses(index)}`}
                    key={option}
                    onClick={() => handleOnClick(index)}
                    disabled={questionWasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
