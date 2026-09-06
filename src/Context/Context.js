import { useContext, createContext } from "react";

export const RevContext = createContext({
    questions:[
        {
            id:1,
            title:"abc",
            revised:false
        }
    ],
    addQues: (q) => {},
    deleteQues: (id) => {},
    editQues: (id,q) => {},
    toggleRevision: (id) => {},
    movePos: (pos,id) => {}
})

export const useRev = () => {
    return useContext(RevContext)
}

export const RevProvider = RevContext.Provider