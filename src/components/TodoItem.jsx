import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.22, 1, 0.36, 1];

export default function TodoItem({
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const startEdit = () => {
    setNewTitle(title);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    onEdit(trimmedTitle);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout="position"
      className="gap-lg py-lg flex flex-col sm:flex-row sm:items-center sm:justify-between"
      transition={{ duration: 0.45, ease }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease }}
            className="gap-sm flex w-full flex-wrap items-center"
          >
            <motion.input
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease }}
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") saveEdit();
                if (event.key === "Escape") cancelEdit();
              }}
              autoFocus
              aria-label="Modifier la tâche"
              className="border-hairline bg-canvas text-ink focus:border-primary px-lg py-xs font-text text-body min-w-0 flex-1 rounded-xl border transition-colors outline-none"
            />

            <motion.button
              type="button"
              onClick={saveEdit}
              whileHover={{ y: -2, scale: 1.025 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.3, ease }}
              className="bg-primary text-on-primary hover:bg-primary-active px-md py-xs font-text text-button min-h-12 shrink-0 rounded-none uppercase transition-colors"
            >
              Enregistrer
            </motion.button>

            <motion.button
              type="button"
              onClick={cancelEdit}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease }}
              className="border-ink/50 text-ink hover:bg-primary-hover/70 hover:text-on-dark px-md py-xs font-text text-button min-h-12 shrink-0 rounded-none border uppercase transition-colors"
            >
              Annuler
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="gap-lg flex w-full min-w-0 flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="gap-lg flex min-w-0 flex-1 items-center">
              <motion.div
                className="relative flex h-6 w-6 shrink-0 items-center justify-center"
                whileTap={{ scale: 0.8 }}
              >
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={onToggle}
                  aria-label={`${
                    completed ? "Réactiver" : "Terminer"
                  } la tâche : ${title}`}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />

                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: completed
                      ? "var(--color-primary)"
                      : "transparent",
                    scale: completed ? [1, 1.18, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease,
                  }}
                  className="border-primary flex h-5 w-5 items-center justify-center rounded-md border-2"
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 12l4 4L19 6"
                      initial={false}
                      animate={{
                        pathLength: completed ? 1 : 0,
                        opacity: completed ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease,
                      }}
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>

              <motion.button
                type="button"
                onClick={startEdit}
                title="Cliquer pour modifier"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease }}
                className={`font-text text-body relative min-w-0 cursor-text text-left break-words transition-colors duration-300 ${
                  completed ? "text-ink-muted-48" : "text-ink"
                }`}
              >
                <span>{title}</span>

                <motion.span
                  initial={false}
                  animate={{
                    scaleX: completed ? 1 : 0,
                    opacity: completed ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease,
                  }}
                  style={{
                    transformOrigin: "left",
                  }}
                  className="pointer-events-none absolute top-1/2 right-0 left-0 h-px bg-current"
                />
              </motion.button>
            </div>

            <motion.button
              type="button"
              onClick={onDelete}
              whileHover={{
                x: 3,
                scale: 1.025,
              }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.3, ease }}
              className="border-ink/50 text-ink hover:bg-primary-hover/70 hover:text-on-dark px-md py-xs font-text text-button min-h-12 shrink-0 rounded-none border uppercase transition-colors"
            >
              Supprimer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
