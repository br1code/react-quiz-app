import QuestionOptions from "./QuestionOptions";

export default function Question({ question, answer, dispatch }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <QuestionOptions
                question={question}
                answer={answer}
                dispatch={dispatch}
            />
        </div>
    );
}
