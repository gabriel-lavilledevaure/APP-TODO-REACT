import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  // US-03 : saisir une nouvelle tâche
  const [title, setTitle] = useState("");

  // US-03 : ajouter une tâche
  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* US-03 : champ de saisie */}
      <label
        htmlFor="new-todo"
        className="text-body-muted mb-xs block font-text text-caption font-semibold"
      >
        Nouvelle tâche
      </label>

      <div className="flex flex-col gap-sm sm:flex-row">
        <input
          id="new-todo"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border-hairline bg-canvas text-ink placeholder:text-ink-muted-48 focus:border-primary min-w-0 flex-1 rounded-xl border px-lg py-sm font-text text-body transition-colors outline-none"
        />

        {/* US-03 : bouton d'ajout */}
        <button
          type="submit"
          className="bg-primary hover:bg-primary-focus rounded-full px-lg py-sm font-text text-body font-semibold text-on-primary transition-colors"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
