import React from "react";
import PropTypes from "prop-types";

export function TaskItem(props) {
	return (
		<li className="list-group-item" onClick={props.method}>
			{props.myTask}
		</li>
	);
}

TaskItem.propTypes = {
	method: PropTypes.func,
	myTask: PropTypes.string
};
