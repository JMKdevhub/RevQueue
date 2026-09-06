import { useState } from "react";
import { useRev } from "../Context";

function RevForm() {
    const [qname,setQname] = useState('')
    const {addQues} = useRev()

    const handler = (e) => {
        e.preventDefault()
        addQues({title:qname, revised:false})
        setQname('')
    }
    return (
        <form onSubmit={handler} className="flex gap-3">
            <input
                type="text"
                placeholder="Enter question..."
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                value={qname}
                onChange={(e)=>setQname(e.target.value)}
            />

            <button
                type="submit"
                className="h-12 shrink-0 rounded-lg bg-linear-to-r from-violet-600 to-purple-500 px-6 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
                + Add
            </button>
        </form>
    );
}

export default RevForm;