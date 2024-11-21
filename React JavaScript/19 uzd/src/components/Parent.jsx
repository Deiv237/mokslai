import IncrementButton from "./IncrementButton";
import DisplayCounter from "./DisplayCounter";
import { useState } from "react";

export default function Parent() {
    
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1>Counter App</h1>
            <DisplayCounter counter={counter}/>
            <IncrementButton increment={incrementCounter}/>
        </div>
    );
}