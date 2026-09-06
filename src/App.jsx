import { useEffect, useState } from "react";
import RevForm from "./Components/RevForm";
import RevItem from "./Components/RevItem";
import {RevProvider,useRev,RevContext} from './Context/index'

function App() {
  const [questions,setQuestions] = useState([])

  
    const addQues = (q) => {
        if (questions.length === 15) {
            alert("Your queue is full! Revise a few questions before adding new ones.");
            return;
        }
        setQuestions((prev) => {
            const temp = [...prev];

            if (temp.length >= 15) {
                temp.pop();
            }

            return [...temp, { id: Date.now(), ...q }];
        });
    };

  const deleteQues = (id) => {
    setQuestions((prev) => prev.filter((ele) => (
        ele.id!==id
    )))
  }

    const editQues = (id, q) => {
        setQuestions((prev) =>
            prev.map((ele) =>
                ele.id === id
                    ? { ...ele, title: q }
                    : ele
            )
        )
    }

   const toggleRevision = (id) => {
        setQuestions((prev) =>
            prev.map((ele) =>
                ele.id === id
                    ? { ...ele, revised: !ele.revised }
                    : ele
            )
        )
    }

    const movePos = (pos,id) => {
        const oldPos = questions.findIndex(
            (ele) => ele.id === id
        );

        const temp = [...questions];

        const [item] = temp.splice(oldPos, 1);

        temp.splice(pos - 1, 0, item);

        setQuestions(temp);
    }

    useEffect(() => {
        const temp = JSON.parse(localStorage.getItem('x'));

        if (temp && temp.length>0) {
            setQuestions(temp);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('x', JSON.stringify(questions))
    }, [questions])

  return (
    <RevProvider value={{questions,addQues,deleteQues,editQues,toggleRevision,movePos}}>
        <div className="min-h-screen bg-slate-50 py-8">

        <div className="mx-auto w-full max-w-6xl px-6">

            {/* Header */}
            <div className="mb-7 flex items-center justify-between rounded-2xl bg-linear-to-r from-[#10152d] to-[#191d3b] px-6 py-5 text-white shadow-sm">

            {/* Icon */}
            <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
                🧠
                </div>

                <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Revise<span className="text-violet-400">Queue</span>
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Smart revision. Stronger you.
                </p>
                </div>

            </div>


            {/* Queue Status */}
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/20 text-violet-300">
                ☰
                </div>

                <div>
                <p className="text-xs text-slate-400">
                    Queue Size
                </p>

                <p className="text-lg font-semibold">
                    {questions.length} <span className="text-slate-500">/ 15</span>
                </p>
                </div>

            </div>

            </div>


            {/* Add Question */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-800">
                Add New Question
                </h2>
            </div>

            <RevForm />

            </div>


            {/* Revision Queue */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

                <div>
                <h2 className="text-lg font-bold text-slate-800">
                    Revision Queue
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                   Questions are ordered by their position in the queue.
                </p>
                </div>

                <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-50"
                onClick={(e)=>setQuestions([])}>
                🗑 Clear All

                </button>

            </div>


            {/* Queue Items */}
            <div className="flex flex-col gap-3">

                {questions.map((question) => (
                    <RevItem
                        key={question.id}
                        question={question}
                        queueSize={questions.length}
                    />
                ))}

            </div>

            </div>


            {/* Bottom Info */}
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-violet-100 bg-violet-50 px-5 py-3 text-sm text-violet-700">

            <span className="text-xl">
                ☆
            </span>

            <p>
                When the queue is full, adding a new question removes the last question from the queue.
            </p>

            </div>

        </div>

        </div>
    </RevProvider>
  );
}

export default App;