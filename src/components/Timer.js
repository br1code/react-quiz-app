import { useEffect } from "react";

export default function Timer({ secondsRemaining, dispatch }) {
    const mins = Math.floor(secondsRemaining / 60);
    const secs = secondsRemaining % 60;

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({ type: "tick" });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    function formattedTime() {
        const paddedMins = String(mins).padStart(2, "0");
        const paddedSecs = String(secs).padStart(2, "0");
        return `${paddedMins}:${paddedSecs}`;
    }

    return <div className="timer">{formattedTime()}</div>;
}
