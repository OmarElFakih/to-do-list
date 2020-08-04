import React, { useState } from "react";
import { TaskItem } from "./taskItem";
import { InputItem } from "./inputItem";

export function ToDoList(Props) {
	const [tasks, setTasks] = useState([]);
	const [newTaskName, setNewTaskName] = useState("");

	function AddTask() {
		setTasks([...tasks, newTaskName]);
		setNewTaskName("");
	}

	function DeleteTask(key) {
		let filteredList = tasks.filter((currentValue, index) => {
			return index != key;
		});

		setTasks(filteredList);
	}

	return (
		<div className="paper">
			<ul className="list-group list-group-flush">
				<InputItem
					onChangeMethod={e => setNewTaskName(e.target.value)}
					onEnterDownMethod={AddTask}
				/>
				{tasks.map((currentTask, index) => {
					return (
						<TaskItem
							key={index}
							myTask={currentTask}
							method={e => DeleteTask(index)}
						/>
					);
				})}
				<footer className="list-footer">{tasks.length} left</footer>
			</ul>
		</div>
	);
}
