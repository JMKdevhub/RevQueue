import { useState } from "react";
import { useRev } from "../Context/index";

function RevItem({ question, queueSize }) {
    const [isMoving, setIsMoving] = useState(false);
    const [position, setPosition] = useState("");

    const [isEditable, setIsEditable] = useState(false);
    const [editText, setEditText] = useState(question.title);

    const {
        movePos,
        editQues,
        deleteQues,
        toggleRevision
    } = useRev();

    // Move question
    const moveHandler = () => {
        if (!position || position < 1 || position > queueSize) return;

        movePos(position, question.id);

        setPosition("");
        setIsMoving(false);
    };

    // Edit question
    const editHandler = () => {
        if (isEditable) {
            if (!editText.trim()) return;

            editQues(question.id, editText.trim());
        }

        setIsEditable((prev) => !prev);
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditText(question.title);
        setIsEditable(false);
    };

    return (
        <div
            className={`rounded-xl border p-4 shadow-sm transition-all duration-300 ${
                question.revised
                    ? "border-green-200 bg-green-50"
                    : "border-slate-200 bg-[#ccbed7]"
            }`}
        >
            <div className="flex items-center gap-3">

                {/* Revised Checkbox */}
                <input
                    type="checkbox"
                    checked={question.revised}
                    onChange={() => toggleRevision(question.id)}
                    className="h-5 w-5 cursor-pointer accent-green-600"
                />

                {/* Question */}
                <div className="min-w-0 flex-1">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        readOnly={!isEditable}
                        className={`w-full rounded-lg bg-transparent px-2 py-2 text-sm font-medium outline-none transition ${
                            question.revised
                                ? "text-slate-400 line-through"
                                : "text-slate-800"
                        } ${
                            isEditable
                                ? "border border-violet-300 bg-white focus:ring-4 focus:ring-violet-100"
                                : "border border-transparent"
                        }`}
                    />
                </div>

                {/* Move */}
                <button
                    onClick={() => setIsMoving((prev) => !prev)}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-100"
                >
                    ↕ Move
                </button>

                {/* Edit */}
                <button
                    onClick={editHandler}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm transition hover:bg-slate-100"
                >
                    {isEditable ? "💾" : "✏️"}
                </button>

                {/* Delete */}
                <button
                    onClick={() => deleteQues(question.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm transition hover:border-red-200 hover:bg-red-50"
                >
                    ❌
                </button>
            </div>

            {/* Edit Cancel */}
            {isEditable && (
                <div className="mt-2 flex justify-end">
                    <button
                        onClick={cancelEdit}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                    >
                        Cancel edit
                    </button>
                </div>
            )}

            {/* Move Section */}
            {isMoving && (
                <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3">

                    <label className="text-sm font-medium text-slate-600">
                        Move to position
                    </label>

                    <input
                        type="number"
                        min="1"
                        max={queueSize}
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder={`1 - ${queueSize}`}
                        className="h-10 w-32 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />

                    <button
                        onClick={moveHandler}
                        className="h-10 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                        Move
                    </button>

                    <button
                        onClick={() => {
                            setPosition("");
                            setIsMoving(false);
                        }}
                        className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default RevItem;

