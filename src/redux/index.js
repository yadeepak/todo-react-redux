import * as actionTypes from './actionTypes';

export const actions = {
	addTODO: payload => ({
		type: actionTypes.ADD_TODO,
		payload,
	}),
	deleteTODO: payload => ({
		type: actionTypes.DELETE_TODO,
		payload,
	}),
	updateTODO: (payload, index) => {
		return {
			type: actionTypes.UPDATE_TODO,
			payload,
			index,
		};
	},
};

const initialState = {
	list: [
		{ completed: false, createdAt: '2020-10-17', name: 'ABC xyz' },
		{ completed: true, createdAt: '2020-10-17', name: 'Deepak Yadav' },
	],
};
const list = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_TODO:
			return { list: [...state.list, action.payload] };
		case actionTypes.UPDATE_TODO: {
			const modifiedTodo = [...state.list];
			modifiedTodo[action.index] = action.payload;
			return {
				list: modifiedTodo,
			};
		}
		case actionTypes.DELETE_TODO: {
			const modifiedTodo = [...state.list].filter(
				(val, i) => i !== action.payload
			);
			return {
				list: modifiedTodo,
			};
		}
		default:
			return state;
	}
};
export default list;
