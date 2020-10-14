import React from 'react';
import { useSelector } from 'react-redux';
import Form from './Components/InputForm';
import Lists from './Components/Lists';
const App = () => {
	const todoList = useSelector(state => state.list);
	console.log(todoList);
	return (
		<div className='d-md-flex justify-content-center  mt-5'>
			<div className='col-md-4 col-12'>
				<Form />
			</div>
			<div className='col-md-4 col-12'>
				<Lists todoList={todoList} />
			</div>
		</div>
	);
};

export default App;
