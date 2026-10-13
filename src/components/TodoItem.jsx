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
    <li className="flex flex-col gap-lg py-lg sm:flex-row sm:items-center sm:justify-between">
      {isEditing ? (
        // US-06 : champ de modification
        <div className="flex w-full items-center gap-sm">
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
            className="border-hairline bg-canvas text-ink focus:border-primary min-w-0 flex-1 rounded-xl border px-lg py-xs font-text text-body outline-none"
          />

          {/* US-06 : bouton enregistrer */}
          <button
            type="button"
            onClick={saveEdit}
            className="bg-primary hover:bg-primary-focus shrink-0 rounded-full px-md py-xs font-text text-caption font-semibold text-on-primary transition-colors"
          >
            Enregistrer
          </button>

          {/* US-06 : bouton annuler */}
          <button
            type="button"
            onClick={cancelEdit}
            className="border-hairline text-ink hover:bg-canvas-parchment shrink-0 rounded-full border px-md py-xs font-text text-caption transition-colors"
          >
            Annuler
          </button>
        </div>
      ) : (
        <>
          <div className="flex min-w-0 flex-1 items-center gap-lg">
            {/* US-04 : cocher ou décocher une tâche */}
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggle}
              aria-label={`Terminer la tâche : ${title}`}
              className="accent-primary h-5 w-5 shrink-0 cursor-pointer"
            />

            {/* US-01 : afficher le titre */}
            {/* US-06 : cliquer pour modifier */}
            <button
              type="button"
              onClick={startEdit}
              title="Cliquer pour modifier"
              className={`hover:text-primary min-w-0 cursor-text text-left font-text text-body break-words transition-colors ${
                completed ? "text-ink-muted-48 line-through" : "text-ink"
              }`}
            >
              {title}
            </button>
          </div>

          {/* US-05 : supprimer une tâche */}
          <button
            type="button"
            onClick={onDelete}
            className="border-hairline text-ink hover:bg-canvas-parchment shrink-0 rounded-full border px-md py-xs font-text text-caption transition-colors"
          >
            Supprimer
          </button>
        </>
      )}
    </li>
  );
}
