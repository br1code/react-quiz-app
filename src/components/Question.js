import QuestionOptions from "./QuestionOptions";

export default function Question({ question }) {
    return (
        <div>
            <h4>{question.question}</h4>
            <QuestionOptions options={question.options} />
        </div>
    );
}
