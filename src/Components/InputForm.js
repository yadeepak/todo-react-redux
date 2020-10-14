import React from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import { actions } from '../redux';
import { useDispatch } from 'react-redux';

const InoutForm = ({ isEdit, todo = {}, index }) => {
	const dispatch = useDispatch();
	const submitForm = e => {
		e.preventDefault();
		const { name, date } = e.target;
		
		if (name.value === '' || date.value === '') {
			return alert('Name and date required');
		}
		const rgx = /^[a-zA-Z]+$/;
		if (!rgx.test(name.value)) {
			return alert('Name can contain only letters');
		}
		const obj = {
			name: name.value,
			createdAt: date.value,
			completed: false,
		};
		if (isEdit) {
			obj.completed = todo.completed;
			dispatch(actions.updateTODO(obj, index));
			return;
		}
		dispatch(actions.addTODO(obj));
		e.target.reset();
	};
	return (
		<div>
			<Card className='p-2'>
				<Form onSubmit={e => submitForm(e)}>
					<h3 className='text-center'>{isEdit ? 'Update' : 'Add new'} TODO</h3>
					<Form.Group controlId='name'>
						<Form.Control
							type='text'
							placeholder='enter name'
							name='name'
							defaultValue={todo.name}
						/>
					</Form.Group>
					<Form.Group controlId='date'>
						<Form.Control
							type='date'
							name='date'
							defaultValue={todo.createdAt}
						/>
					</Form.Group>
					<Button variant='secondary' type='submit' className='btn-block'>
						Submit
					</Button>
				</Form>
			</Card>
		</div>
	);
};

export default InoutForm;
