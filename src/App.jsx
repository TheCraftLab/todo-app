import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function App() {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const taskToArchive = tasks[index];
        const updatedTasks = tasks.filter((_, i) => i !== index);

        // Si la tâche est terminée, on l'archive
        if (!taskToArchive.completed) {
            setTasks(updatedTasks);
            setArchivedTasks([...archivedTasks, taskToArchive]);
        } else {
            // Si déjà cochée, on la supprime définitivement
            setTasks(updatedTasks);
        }
    };

    const restoreArchivedTask = (index) => {
        const taskToRestore = archivedTasks[index];
        const updatedArchivedTasks = archivedTasks.filter((_, i) => i !== index);
        setTasks([...tasks, taskToRestore]);
        setArchivedTasks(updatedArchivedTasks);
    };

    return (
        <Router>
            <main className="container">
                <h1>To-Do List</h1>

                <nav>
                    <Link to="/">Tâches</Link>  <Link to="/archived">Archivées</Link>
                </nav>

                <Routes>
                    {/* Page principale avec les tâches */}
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input
                                        type="text"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        placeholder="Ajouter une tâche"
                                    />
                                    <button type="button" onClick={addTask}>
                                        Ajouter
                                    </button>
                                </form>

                                <h2>Tâches en cours</h2>
                                <ul>
                                    {tasks.length === 0 ? (
                                        <p>Aucune tâche en cours</p>
                                    ) : (
                                        tasks.map((task, index) => (
                                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => toggleTaskCompletion(index)}
                                                    />
                                                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                          </span>
                                                </label>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </>
                        }
                    />

                    {/* Page des tâches archivées */}
                    <Route
                        path="/archived"
                        element={
                            <>
                                <h2>Tâches Archivées</h2>
                                <ul>
                                    {archivedTasks.length === 0 ? (
                                        <p>Aucune tâche archivée</p>
                                    ) : (
                                        archivedTasks.map((task, index) => (
                                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{task.text}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => restoreArchivedTask(index)}
                                                    style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}
                                                >
                                                    Restaurer
                                                </button>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </>
                        }
                    />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
