import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

export default function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
    setJustAdded(true);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.18, ease }}
    >
      <label
        htmlFor="new-todo"
        className="text-body-muted mb-xs font-text text-caption block font-semibold"
      >
        Nouvelle tâche
      </label>

      <div className="gap-sm flex flex-col sm:flex-row">
        <motion.div
          className="relative min-w-0 flex-1"
          whileFocusWithin={{ scale: 1.008 }}
          transition={{ duration: 0.35, ease }}
        >
          <input
            id="new-todo"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setJustAdded(false);
            }}
            placeholder="Que dois-je faire aujourd'hui ?"
            className="border-hairline bg-canvas text-ink placeholder:text-ink-muted-48 focus:border-primary px-lg py-sm font-text text-body min-h-12 w-full rounded-xl border transition-colors duration-300 outline-none"
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{
            scale: 1.035,
            y: -2,
          }}
          whileTap={{ scale: 0.94 }}
          transition={{
            duration: 0.3,
            ease,
          }}
          className="bg-primary text-on-primary hover:bg-primary-active px-md py-sm font-text text-button relative min-h-12 overflow-hidden rounded-none uppercase transition-colors"
        >
          <motion.span
            className="relative z-10 block"
            animate={{
              y: justAdded ? [0, -4, 0] : 0,
            }}
            transition={{ duration: 0.4, ease }}
          >
            Ajouter
          </motion.span>
        </motion.button>
      </div>

      <AnimatePresence>
        {justAdded && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.4, ease }}
            className="text-body-muted mt-2 overflow-hidden text-sm"
          >
            ✓ Tâche ajoutée avec succès
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
