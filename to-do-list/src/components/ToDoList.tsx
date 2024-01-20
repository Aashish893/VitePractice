import {useState, useEffect} from 'react';
import '../styles/ToDoList.css'
import NoteDisplay from './NoteDisplay';

import deletebuttonImg from '../images/delete-button.png'
import addButtonImg from '../images/add-button.png'
import editButtonImg from '../images/edit-button.png'
import saveButtonImg from '../images/save-button.png'
import noteButtonImg from '../images/note-button.png'

interface Tasks {
    id: number;
    text: string;
    note?: string;
    showNote?: boolean;
}

export const ToDoList = () =>{

    const [tasks, setTasks] = useState<Tasks[]>(
        JSON.parse(localStorage.getItem('tasks') || '[]') || [{ id: 1, text: 'Sample Task',note: 'Sample Note'  }]
    );
    const [newTask, setNewTask] = useState<string>('');
    const [editedTaskText, setEditedTaskText] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
    const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
    const [editedTaskNote, setEditedTaskNote] = useState<string>('');

    const [displayedNote, setDisplayedNote] = useState<string>('');
    const [displayNote, setDisplayNote] = useState<boolean>(false);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const storedCheckedTasks = JSON.parse(localStorage.getItem('checkedTasks') || '[]');
        setCheckedTasks(storedCheckedTasks);
    }, [tasks]);

    const handleAddTask = () =>{
        if(newTask.trim()!==''){
            setTasks([...tasks,{id:Date.now() , text: newTask}]);
            setNewTask('');
        }
    };

    const handleDeletTask = (taskId : number) =>{
        const updatedTasks = tasks.filter((task) => task.id!==taskId);
        setTasks(updatedTasks);
    };

    const handleEditTask = (taskId:number, taskText : string, taskNote?: string) => {
        
        setEditedTaskId(taskId);
        setEditedTaskText(taskText);
        setEditedTaskNote(taskNote || '');
    };
    const handleSaveTask = () =>{
        const updatedTasks = tasks.map((task) =>task.id === editedTaskId ? { ...task, text: editedTaskText,note: editedTaskNote } : task);
        setTasks(updatedTasks);
        setEditedTaskId(null);
        setEditedTaskText('');
        setEditedTaskNote('');
    };

    const handleCheckboxChange = (taskId: number) =>{
        const isChecked = checkedTasks.includes(taskId);
        const updatedCheckedTasks = isChecked ? checkedTasks.filter(id => id !== taskId) : [...checkedTasks, taskId];
        setCheckedTasks(updatedCheckedTasks);
        localStorage.setItem('checkedTasks', JSON.stringify(updatedCheckedTasks));
    };

    const handleAddNote = (taskId: number) => {
        setEditedTaskId(taskId);
        setEditedTaskText(tasks.find(task => task.id === taskId)?.text || '');
        setEditedTaskNote(''); // Initialize edited task note for a new note
    };


    const handleDisplayNote = (taskId: number) => {
        const task = tasks.find((task) => task.id === taskId);
        if (task) {
            setDisplayedNote(task.note || '');
            setDisplayNote(true);
        }
    };
    
    const handleCloseNote = () => {
        setDisplayNote(false);
    };

    return(
        <div className='outer-container'>
            <h1>To Do List</h1>
            <div className="todo-container">
                <input className='todo-container input' type="text" placeholder="Enter Task To Do" 
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}></input>
                <button className='todo-container button' onClick={handleAddTask}>
                    <img src={addButtonImg} ></img>
                </button>
            </div>
            {tasks.length > 0 && (
                <div className={`tasksList ${tasks.length > 0 ? 'showBorder' : ''}`}>
                {tasks.map((task) => (
                    <div className='list-row' key={task.id}>
                        {editedTaskId === task.id ? (
                                <>
                                <input
                                className='todo-container input'
                                    type='text'
                                    value={editedTaskText}
                                    onChange={(e) => setEditedTaskText(e.target.value)}
                                />
                                <textarea
                                    value={editedTaskNote}
                                    onChange={(e) => setEditedTaskNote(e.target.value)}
                                    placeholder='Enter Task Note'
                                />
                                <button  className='save-button' onClick={handleSaveTask}>
                                    <img src={saveButtonImg}/>
                                </button>
                                </>
                            ) : (
                                <>
                                <p className='task-name' data-checked={checkedTasks.includes(task.id).toString()}>{task.text}</p>
                                {task.note ? (<button className='edit-button' onClick={() => handleDisplayNote(task.id)}>
                                                <img src={noteButtonImg}/>
                                            </button>
                                    ) : (
                                    <button
                                        className='edit-button'
                                        onClick={() => handleAddNote(task.id)}
                                    >
                                        <img src={noteButtonImg}/>
                                    </button>
                                    )}
                                <button
                                    className='delete-button'
                                    onClick={() => handleDeletTask(task.id)}
                                >
                                    <img src={deletebuttonImg} alt='Delete Task' />
                                </button>
                                <button
                                    className='edit-button'
                                    onClick={() => handleEditTask(task.id, task.text)}
                                >
                                    <img src={editButtonImg} alt='Edit Task' />
                                </button>
                                </>
                            )
                        }
                        <input
                            className='completion-checkbox'
                            type='checkbox'
                            id={`customCheckbox_${task.id}`}
                            checked={checkedTasks.includes(task.id)}
                            onChange={() => handleCheckboxChange(task.id)}
                        />
                    </div>
                ))}
                </div>
            )}
            {displayNote && (
                <NoteDisplay note={displayedNote} onClose={handleCloseNote} />
            )}
        </div>
    );
} 
