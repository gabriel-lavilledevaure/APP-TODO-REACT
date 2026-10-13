import { useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  LayoutGroup,
} from "motion/react";

import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";

const ease = [0.22, 1, 0.36, 1];

const filters = [
  { value: "all", label: "Toutes" },
  { value: "active", label: "À faire" },
  { value: "completed", label: "Terminées" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (title) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newTitle) => {
    const trimmedTitle = newTitle.trim();
    if (!trimmedTitle) return;

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  const emptyMessage =
    todos.length === 0
      ? "Aucune tâche pour le moment"
      : filter === "active"
        ? "Aucune tâche à faire"
        : filter === "completed"
          ? "Aucune tâche terminée"
          : "Aucune tâche pour le moment";

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.45,
        ease,
      }}
    >
      <div className={darkMode ? "dark" : ""}>
        <main className="bg-canvas text-ink px-lg py-section min-h-screen transition-colors duration-500">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            {/* DARK MODE */}
            <motion.div
              variants={itemVariants}
              className="mb-lg gap-sm flex items-center justify-end"
            >
              <span className="text-ink text-caption">Mode sombre</span>

              <motion.button
                type="button"
                role="switch"
                aria-checked={darkMode}
                aria-label="Mode sombre"
                onClick={() => setDarkMode(!darkMode)}
                whileTap={{ scale: 0.9 }}
                className={`focus-visible:outline-primary-focus relative h-[31px] w-[51px] rounded-full transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  darkMode ? "bg-primary" : "bg-switch-off"
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{
                    x: darkMode ? 20 : 0,
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    ease,
                  }}
                  className="absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-sm"
                />
              </motion.button>
            </motion.div>

            {/* TITRE */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display text-ink text-display-lg font-semibold">
                Mes tâches
              </h1>
            </motion.div>

            {/* COMPTEUR */}
            <motion.div
              variants={itemVariants}
              className="text-body-muted mt-xxs mb-xxl text-body flex items-center gap-1"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={remainingTodos}
                  initial={{
                    opacity: 0,
                    y: 12,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: -12,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.35,
                    ease,
                  }}
                  className="inline-block"
                >
                  {remainingTodos}
                </motion.span>
              </AnimatePresence>

              <span>
                tâche{remainingTodos > 1 ? "s" : ""} restante
                {remainingTodos > 1 ? "s" : ""}
              </span>
            </motion.div>

            {/* FORMULAIRE */}
            <TodoForm onAddTodo={addTodo} />

            {/* FILTRES */}
            <motion.div
              variants={itemVariants}
              className="mt-xl mb-xl gap-xxs flex flex-wrap"
            >
              {filters.map((item) => {
                const isActive = filter === item.value;

                return (
                  <motion.button
                    key={item.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setFilter(item.value)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      duration: 0.3,
                      ease,
                    }}
                    className={`px-md py-xs font-text text-button relative min-h-12 overflow-hidden rounded-none border uppercase transition-colors duration-300 ${
                      isActive
                        ? "border-primary text-on-primary"
                        : "border-ink/50 text-ink hover:bg-primary-hover/70 hover:text-on-dark bg-transparent"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-filter"
                        className="bg-primary absolute inset-0"
                        transition={{
                          duration: 0.5,
                          ease,
                        }}
                      />
                    )}

                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* LISTE */}
            <LayoutGroup>
              <motion.ul
                layout
                className="divide-border relative divide-y"
                transition={{
                  layout: {
                    duration: 0.5,
                    ease,
                  },
                }}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {visibleTodos.length === 0 ? (
                    <motion.li
                      key="empty"
                      layout
                      initial={{
                        opacity: 0,
                        y: 12,
                        filter: "blur(5px)",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                        filter: "blur(5px)",
                      }}
                      transition={{
                        duration: 0.45,
                        ease,
                      }}
                      className="text-body-muted text-body py-lg"
                    >
                      {emptyMessage}
                    </motion.li>
                  ) : (
                    visibleTodos.map((todo) => (
                      <motion.li
                        key={todo.id}
                        layout="position"
                        initial={{
                          opacity: 0,
                          y: 35,
                          scale: 0.96,
                          filter: "blur(6px)",
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          x: 80,
                          scale: 0.94,
                          filter: "blur(5px)",
                          transition: {
                            duration: 0.32,
                            ease,
                          },
                        }}
                        transition={{
                          duration: 0.55,
                          ease,
                          layout: {
                            duration: 0.5,
                            ease,
                          },
                        }}
                      >
                        <TodoItem
                          title={todo.title}
                          completed={todo.completed}
                          onToggle={() => toggleTodo(todo.id)}
                          onDelete={() => deleteTodo(todo.id)}
                          onEdit={(newTitle) => editTodo(todo.id, newTitle)}
                        />
                      </motion.li>
                    ))
                  )}
                </AnimatePresence>
              </motion.ul>
            </LayoutGroup>
          </motion.div>
        </main>
      </div>
    </MotionConfig>
  );
}
