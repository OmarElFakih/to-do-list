import React, { useState, useEffect } from "react";
import { TaskItem } from "./taskItem";
import { InputItem } from "./inputItem";

const baseURL =
	"https://3245-fa705d10-66d4-41fe-b11d-55b71abb8909.ws-us02.gitpod.io";

export function ToDoList(Props) {
	const [tasks, setTasks] = useState([]);
	const [newTaskName, setNewTaskName] = useState("");
	const [userIsReady, setUserIsReady] = useState(false);

	const getTodos = async () => {
		try {
			let response = await fetch(`${baseURL}/todos`, {
				method: "GET"
				// mode: "no-cors"
			});
			if (response.ok) {
				let todoList = await response.json();
				setTasks(todoList);
			} else {
				console.log("error obteniendo la lista");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addNewTask = async () => {
		try {
			let post = await fetch(`${baseURL}/todos`, {
				method: "POST",
				body: JSON.stringify({
					label: newTaskName,
					done: false
				})
			});
			if (post.ok) {
				setNewTaskName("");
				getTodos();
			} else {
				console.log("error actualizando la lista");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async index => {
		try {
			let request = await fetch(`${baseURL}/todos/${index}`, {
				method: "DELETE"
			});
			if (request.ok) {
				getTodos();
			} else {
				console.log("error eliminando de la lista");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(
		() => {
			console.log("useEffect ejecutado");
			getTodos();
		},
		[userIsReady, baseURL]
	);

	return (
		<div>
			<ul className="list-group list-group-flush paper">
				<InputItem
					onChangeMethod={setNewTaskName}
					onEnterDownMethod={addNewTask}
					value={newTaskName}
				/>
				{tasks.map((currentTask, index) => {
					return (
						<TaskItem
							key={index}
							myTask={currentTask.label}
							method={e => deleteTask(index)}
						/>
					);
				})}
				<footer className="list-footer">{tasks.length} left</footer>
			</ul>
			{/* <button
				type="button"
				className="btn btn-secondary"
				onClick={DeleteAll}>
				Delete All
			</button>
			<button
				type="button"
				className="btn btn-secondary"
				onClick={PrintAll}>
				PrintAll
			</button> */}
		</div>
	);
}
