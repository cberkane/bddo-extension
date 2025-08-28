import { useState } from "react";

import Button from "./app/components/Button/Button";

const App = () => {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <h1>Features</h1>
            <div>
                <Button onClick={() => setCount((prev) => prev + 1)}>
                    Count {count}
                </Button>
            </div>
        </>
    );
};

export default App;
