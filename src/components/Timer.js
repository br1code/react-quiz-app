import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
    const { secondsRemaining, tick } = useQuiz();
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const intervalId = setInterval(tick, 1000);
        return () => clearInterval(intervalId);
    }, [tick]);

    function formattedTime() {
        const paddedMins = String(mins).padStart(2, "0");
        const paddedSecs = String(secs).padStart(2, "0");
        return `${paddedMins}:${paddedSecs}`;
    }

    return <div className="timer">{formattedTime()}</div>;
}
