import React, { useState, useEffect } from "react";
import { TaskItem } from "./taskItem";
import { InputItem } from "./inputItem";

const baseURL = "https://assets.breatheco.de/apis/fake/todos/";

export function ToDoList(Props) {
	const [tasks, setTasks] = useState([]);
	const [newTaskName, setNewTaskName] = useState("");
	const [userIsReady, setUserIsReady] = useState(false);

	function AddTask() {
		if (newTaskName != "") {
			setTasks([...tasks, { label: newTaskName, done: false }]);
			setNewTaskName("");
		}
	}

	function AddTasksByList(list) {
		setTasks(list);
	}

	async function DeleteTask(key) {
		let filteredList = tasks.filter((currentValue, index) => {
			return index != key;
		});
		let response = await fetch(`${baseURL}user/OmarElFakih`, {
			method: "PUT",
			body: JSON.stringify(filteredList),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			// hago fetch y actualizo el estado tasks
			let responseII = await fetch(`${baseURL}user/OmarElFakih`);
			// verificamos la respuesta del get
			if (responseII.ok) {
				// desjsonificamos el body de la respuesta
				let updatedTasks = await responseII.json();
				// actualizamos el estado tasks
				setTasks(updatedTasks);
			} else {
				alert("Coye, algo pasó con el get!");
			}
		} else {
			// alert que hay un error
			alert("Coye, algo pasó con el put!");
		}
	}

	// async function UserExists(dataDeleted = false) {
	// 	try {
	// 		let response = await fetch(`${baseURL}user/OmarElFakih`, {
	// 			method: "GET"
	// 		});
	// 		if (response.ok && !dataDeleted) {
	// 			let data = await response.json();
	// 			AddTasksByList(data);
	// 			console.log(`data del api: ${data} data local ${tasks}`);
	// 		}
	// 		return response.ok;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return false;
	// 	}
	// }

	// async function AddToApi(dataDeleted = false) {
	// 	if (await UserExists(dataDeleted)) {
	// 		try {
	// 			//AddTask();
	// 			console.log(`data antes de actualizar la api: ${tasks}`);
	// 			let response = await fetch(`${baseURL}user/OmarElFakih`, {
	// 				method: "PUT",
	// 				body: JSON.stringify(tasks),
	// 				headers: {
	// 					"Content-Type": "application/json"
	// 				}
	// 			});

	// 			let responseII = await fetch(`${baseURL}user/OmarElFakih`, {
	// 				method: "GET"
	// 			});
	// 			let data = await responseII.json();
	// 			AddTasksByList(data);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	} else {
	// 		try {
	// 			AddTask();
	// 			console.log(`data antes de crear usuario: ${tasks}`);
	// 			let response = await fetch(`${baseURL}user/OmarElFakih`, {
	// 				method: "POST",
	// 				body: JSON.stringify([]),
	// 				headers: {
	// 					"Content-Type": "application/json"
	// 				}
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// }

	const addNewTask = async () => {
		// fetch PUT con la lista + tarea nueva
		try {
			console.log(`data antes de actualizar la api: ${tasks}`);
			let response = await fetch(`${baseURL}user/OmarElFakih`, {
				method: "PUT",
				body: JSON.stringify([
					...tasks,
					{ label: newTaskName, done: false }
				]),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				// hago fetch y actualizo el estado tasks
				let responseII = await fetch(`${baseURL}user/OmarElFakih`);
				// verificamos la respuesta del get
				if (responseII.ok) {
					// desjsonificamos el body de la respuesta
					let updatedTasks = await responseII.json();
					// actualizamos el estado tasks
					setTasks(updatedTasks);
					setNewTaskName("");
				} else {
					alert("Coye, algo pasó con el get!");
				}
			} else {
				// alert que hay un error
				alert("Coye, algo pasó con el put!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	async function DeleteAll() {
		try {
			let response = await fetch(`${baseURL}user/OmarElFakih`, {
				method: "DELETE"
			});
			setTasks([]);
			setUserIsReady(false);
		} catch (error) {
			console.log(error);
		}
	}

	async function PrintAll() {
		try {
			let response = await fetch(`${baseURL}user/OmarElFakih`, {
				method: "GET"
			});
			if (response.ok) {
				let data = await response.json();
				console.log("data en api:");
				for (let dato of data) {
					for (let key in dato) {
						console.log(dato[key]);
					}
				}
				console.log("data local:");
				for (let task of tasks) {
					for (let key in task) {
						console.log(task[key]);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(
		() => {
			console.log("HOLA, SOY EL USEEFFECT DE TODOLIST");
			// verificar si existe el usuario.
			const getTasksForUser = async () => {
				// actualizar la lista de tareas de ese usuario.
				let getResponse = await fetch(`${baseURL}user/OmarElFakih`);
				// verificamos la respuesta del get
				if (getResponse.ok) {
					// desjsonificamos el body de la respuesta
					let updatedTasks = await getResponse.json();
					// actualizamos el estado tasks
					setTasks(updatedTasks);
				} else {
					alert("Coye, algo pasó con el get del use effect!");
				}
			};
			const verifyUser = async () => {
				try {
					let response = await fetch(`${baseURL}user/OmarElFakih`);
					if (response.status == 404) {
						// crear el usuario
						console.log("el usuario no existe, a crearlo");
						let createUserResponse = await fetch(
							`${baseURL}user/OmarElFakih`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json"
								},
								body: JSON.stringify([])
							}
						);
						if (!createUserResponse.ok) {
							alert("algo salió mal creando al usuario.");
						}
					}
					setUserIsReady(true);
					getTasksForUser();
				} catch (error) {
					console.log(error);
					return false;
				}
			};
			if (!userIsReady) {
				verifyUser();
			} else {
				getTasksForUser();
			}
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
							method={e => DeleteTask(index)}
						/>
					);
				})}
				<footer className="list-footer">{tasks.length} left</footer>
			</ul>
			<button
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
			</button>
		</div>
	);
}
