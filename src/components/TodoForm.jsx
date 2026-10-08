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
        className="text-fg-secondary mb-2 block text-sm font-medium"
      >
        Nouvelle tâche
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="new-todo"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="border-border bg-bg text-fg placeholder:text-fg-tertiary focus:border-apple-blue min-w-0 flex-1 rounded-xl border px-4 py-3 transition-colors outline-none"
        />

        {/* US-03 : bouton d'ajout */}
        <button
          type="submit"
          className="bg-apple-blue hover:bg-apple-blue-hover rounded-full px-6 py-3 font-medium text-white transition-colors"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}
