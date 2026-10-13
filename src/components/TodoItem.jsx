import { useState } from "react";

export default function TodoItem({
  title,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  // US-06 : activer la modification
  const [isEditing, setIsEditing] = useState(false);

  // US-06 : nouveau titre
  const [newTitle, setNewTitle] = useState(title);

  // US-06 : commencer la modification
  const startEdit = () => {
    setNewTitle(title);
    setIsEditing(true);
  };

  // US-06 : enregistrer la modification
  const saveEdit = () => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) return;

    onEdit(trimmedTitle);
    setIsEditing(false);
  };

  // US-06 : annuler la modification
  const cancelEdit = () => {
    setNewTitle(title);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      {isEditing ? (
        // US-06 : champ de modification
        <div className="flex w-full items-center gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                saveEdit();
              }

              if (event.key === "Escape") {
                cancelEdit();
              }
            }}
            autoFocus
            aria-label="Modifier la tâche"
            className="border-border bg-bg text-fg focus:border-apple-blue min-w-0 flex-1 rounded-xl border px-4 py-2 outline-none"
          />

          {/* US-06 : bouton enregistrer */}
          <button
            type="button"
            onClick={saveEdit}
            className="bg-apple-blue hover:bg-apple-blue-hover shrink-0 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Enregistrer
          </button>

          {/* US-06 : bouton annuler */}
          <button
            type="button"
            onClick={cancelEdit}
            className="border-border text-fg hover:bg-surface shrink-0 rounded-full border px-4 py-2 text-sm transition-colors"
          >
            Annuler
          </button>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* US-04 : cocher ou décocher une tâche */}
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              aria-label={`Terminer la tâche : ${title}`}
              className="accent-apple-blue h-5 w-5 shrink-0 cursor-pointer"
            />

            {/* US-01 : afficher le titre */}
            {/* US-06 : cliquer pour modifier */}
            <button
              type="button"
              onClick={startEdit}
              title="Cliquer pour modifier"
              className={`hover:text-apple-blue min-w-0 cursor-text text-left break-words transition-colors ${
                completed ? "text-fg-tertiary line-through" : "text-fg"
              }`}
            >
              {title}
            </button>
          </div>

          {/* US-05 : supprimer une tâche */}
          <button
            type="button"
            onClick={onDelete}
            className="border-border text-fg hover:bg-surface shrink-0 rounded-full border px-4 py-2 text-sm transition-colors"
          >
            Supprimer
          </button>
        </>
      )}
    </li>
  );
}
