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
        // US-06 : formulaire de modification
        <div className="flex w-full flex-wrap items-center gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") saveEdit();
              if (event.key === "Escape") cancelEdit();
            }}
            autoFocus
            aria-label="Modifier la tâche"
            className="border-border bg-bg text-fg focus:border-apple-blue min-w-0 flex-1 rounded-xl border px-4 py-2 outline-none"
          />

          <button
            type="button"
            onClick={saveEdit}
            className="bg-apple-blue rounded-full px-4 py-2 text-sm font-medium text-white"
          >
            Enregistrer
          </button>

          <button
            type="button"
            onClick={cancelEdit}
            className="border-border text-fg rounded-full border px-4 py-2 text-sm"
          >
            Annuler
          </button>
        </div>
      ) : (
        <>
          {/* US-04 : cocher ou décocher une tâche */}
          <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-4">
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              className="accent-apple-blue h-5 w-5 shrink-0 cursor-pointer"
            />

            {/* US-01 : titre de la tâche */}
            <span
              className={`break-words ${
                completed ? "text-fg-tertiary line-through" : "text-fg"
              }`}
            >
              {title}
            </span>
          </label>

          <div className="flex shrink-0 items-center gap-2">
            {/* US-06 : modifier une tâche */}
            <button
              type="button"
              onClick={() => {
                setNewTitle(title);
                setIsEditing(true);
              }}
              className="border-border text-apple-blue hover:bg-surface rounded-full border px-4 py-2 text-sm transition-colors"
            >
              Modifier
            </button>

            {/* US-05 : supprimer une tâche */}
            <button
              type="button"
              onClick={onDelete}
              className="border-border text-fg hover:bg-surface rounded-full border px-4 py-2 text-sm transition-colors"
            >
              Supprimer
            </button>
          </div>
        </>
      )}
    </li>
  );
}
