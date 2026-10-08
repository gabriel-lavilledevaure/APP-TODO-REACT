import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

export default function App() {
  // US-01 : afficher les tâches
  const [todos, setTodos] = useState([]);

  // US-07 : filtrer les tâches
  const [filter, setFilter] = useState("all");

  // US-09 : activer ou désactiver le dark mode
  const [darkMode, setDarkMode] = useState(false);

  // US-03 : ajouter une tâche
  const addTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  // US-04 : terminer ou réactiver une tâche
  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // US-05 : supprimer une tâche
  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  // US-06 : modifier une tâche
  const editTodo = (id, newTitle) => {
    const trimmedTitle = newTitle.trim();

    if (!trimmedTitle) return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  // US-07 : filtrer les tâches
  const filters = {
    all: () => true,
    active: (todo) => !todo.completed,
    completed: (todo) => todo.completed,
  };

  const visibleTodos = todos.filter(filters[filter]);

  // US-08 : compter les tâches restantes
  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-bg text-fg min-h-screen px-6 py-24 transition-colors duration-200">
        <div className="mx-auto max-w-3xl">
          {/* US-09 : switch dark mode style Apple */}
          <div className="mb-8 flex items-center justify-end gap-3">
            <span className="text-fg text-sm">Mode sombre</span>

            <button
              type="button"
              role="switch"
              aria-checked={darkMode}
              aria-label="Mode sombre"
              onClick={() => setDarkMode(!darkMode)}
              className={`focus-visible:outline-apple-blue relative h-[31px] w-[51px] rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                darkMode ? "bg-apple-blue" : "bg-switch-off"
              }`}
            >
              <span
                className={`absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  darkMode ? "translate-x-[20px]" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* US-01 : titre */}
          <h1 className="text-fg text-4xl font-bold tracking-tight">
            Mes tâches
          </h1>

          {/* US-08 : compteur */}
          <p className="text-fg-secondary mt-2 mb-10">
            {remainingTodos} tâche{remainingTodos > 1 ? "s" : ""} restante
            {remainingTodos > 1 ? "s" : ""}
          </p>

          {/* US-03 : formulaire d'ajout */}
          <TodoForm onAddTodo={addTodo} />

          {/* US-07 : boutons de filtrage */}
          <div className="mt-8 mb-8 flex flex-wrap gap-2">
            {[
              { value: "all", label: "Toutes" },
              { value: "active", label: "À faire" },
              { value: "completed", label: "Terminées" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  filter === item.value
                    ? "border-apple-blue bg-apple-blue text-white"
                    : "border-border bg-surface text-fg hover:bg-surface-secondary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* US-02 : liste vide */}
          {/* US-07 : filtre sans résultat */}
          {todos.length === 0 ? (
            <p className="text-fg-secondary">Aucune tâche pour le moment</p>
          ) : visibleTodos.length === 0 ? (
            <p className="text-fg-secondary">
              {filter === "active"
                ? "Aucune tâche à faire"
                : "Aucune tâche terminée"}
            </p>
          ) : (
            // US-01 : afficher les tâches
            // US-04 : cocher ou décocher
            // US-05 : supprimer
            // US-06 : modifier

            <ul className="divide-border divide-y">
              {visibleTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onEdit={(newTitle) => editTodo(todo.id, newTitle)}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
