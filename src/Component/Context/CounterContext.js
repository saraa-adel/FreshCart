import { createContext, useState } from "react";

export let CounterContext = createContext()

export default function CounterContextProvider({children}){
    const [count, setCount] = useState(0)

     return <CounterContext.Provider value={{count}}>
          {children}
     </CounterContext.Provider>
}