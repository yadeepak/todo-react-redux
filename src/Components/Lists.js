import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import InputForm from './InputForm';
import { useDispatch } from 'react-redux';
import { actions } from '../redux';
const Lists = ({ todoList }) => {
	const dispatch = useDispatch();
	const [editId, setEditId] = useState(false);
	const [allList, setList] = useState([]);
	const removeTodo = index => {
		const check = window.confirm('Are you sure you want remove this todo');
		if (check) {
			dispatch(actions.deleteTODO(index));
		}
	};
	//setting global state in local state for filteration purpose
	useEffect(() => {
		(function () {
			console.log('j');
			setList(todoList);
		})();
	}, [todoList]);

	//change status of todo
	const changeStatus = (todo, index) => {
		todo.completed = !todo.completed;
		dispatch(actions.updateTODO(todo, index));
    };
    
	//apply filter
	const changeFilter = e => {
		const selectedValue = e.target.value;
		console.log(selectedValue);
		if (selectedValue === 'all') {
			setList(todoList);
			return;
		}
		const newList = todoList.filter(todo => {
			if (selectedValue === 'active') {
				return !todo.completed;
			}
			if (selectedValue === 'completed') {
				return todo.completed;
			}
			return todo;
		});
		setList(newList);
	};
	return (
		<div>
			<Form.Group>
				<Form.Label>Filter By status</Form.Label>
				<Form.Control
					as='select'
					className='w-50'
					onChange={e => changeFilter(e)}
				>
					<option value='all'>All</option>
					<option value='completed'>Completed</option>
					<option value='active'>Active</option>
				</Form.Control>
			</Form.Group>
			{allList.map((todo, index) => (
				<div
					className={`row p-1 border align-items-center ${
						todo.completed ? 'completed' : ''
					}`}
					key={Math.random().toString()}
				>
					<div className='col-1'>
						<Form.Check
							type='checkbox'
							onChange={() => changeStatus(todo, index)}
							defaultChecked={todo.completed}
						/>
					</div>
					<div className='col-md-6 col-11'>
						<p className='mb-0'>{todo.name}</p>
						<small>{new Date(todo.createdAt).toDateString()}</small>
					</div>
					<div className='col-lg-5 col-md-6 col-sm-12 col-12'>
						<Button size='sm' variant='info' onClick={() => setEditId(index)}>
							Edit
						</Button>
						<Button
							size='sm'
							variant='danger'
							onClick={() => removeTodo(index)}
							className='ml-2'
						>
							Delete
						</Button>
					</div>
					<div className='col-12'>
						{index === editId && (
							<>
								<InputForm isEdit={true} todo={todo} index={index} />
								<Button
									variant='link'
									onClick={() => setEditId(false)}
									className='btn-block'
								>
									Close
								</Button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default Lists;
