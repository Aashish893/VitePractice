import React,{useState} from 'react';
import '../styles/ToDoList.css'
import deletebuttonImg from '../images/delete-button.png'
import addButtonImg from '../images/add-button.png'
import editButtonImg from '../images/edit-button.png'
import saveButtonImg from '../images/save-button.png'

interface Tasks {
    id: number;
    text: string;
}


export const ToDoList = () =>{

    const [tasks, setTasks] = useState<Tasks[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [editedTaskText, setEditedTaskText] = useState<string>('');
    const [editedTaskId, setEditedTaskId] = useState<number | null>(null);

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

    const handleEditTask = (taskId:number, taskText : string) => {
        setEditedTaskId(taskId);
        setEditedTaskText(taskText);
    };
    const handleSaveTask = () =>{
        const updatedTasks = tasks.map((task) =>task.id === editedTaskId ? { ...task, text: editedTaskText } : task);
        setTasks(updatedTasks);
        setEditedTaskId(null);
        setEditedTaskText('');
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
                                <button  className='save-button' onClick={handleSaveTask}>
                                    <img src={saveButtonImg}/>
                                </button>
                                </>
                            ) : (
                                <>
                                <p className='task-name'>{task.text}</p>
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
                        />
                    </div>
                ))}
                </div>
            )}
        </div>
    );
} 
