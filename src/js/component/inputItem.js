import React from "react";
import PropTypes from "prop-types";

export function InputItem(props) {
	const onEnter = e => {
		if (e.keyCode == 13) {
			props.onEnterDownMethod(e.target.value);
			e.target.value = "";
		}
	};

	return (
		<input
			type="text"
			className="list-group-item"
			onChange={e => props.onChangeMethod(e.target.value)}
			value={props.value}
			onKeyDown={onEnter}
		/>
	);
}

InputItem.propTypes = {
	onChangeMethod: PropTypes.func,
	onEnterDownMethod: PropTypes.func,
	value: PropTypes.string
};
