import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import { createTask } from "../../services/taskApi";

export const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim().length || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const newTask = await createTask({
        title: text.trim(),
        column,
      });

      setCards((pv) => [
        ...pv,
        {
          id: newTask._id,
          title: newTask.title,
          column: newTask.column,
        },
      ]);

      setText("");
      setAdding(false);
    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            value={text}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
            disabled={isSubmitting}
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
              disabled={isSubmitting}
            >
              Close
            </button>
            <button
              type="submit"
              className={`flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors ${
                isSubmitting ? "opacity-50" : "hover:bg-neutral-300"
              }`}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Adding..." : "Add"}</span>
              {!isSubmitting && <FiPlus />}
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};
