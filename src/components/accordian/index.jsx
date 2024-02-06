//Single select accordian
//multiple select accordian

import { useState } from 'react';
import data from './data';
import './styles.css';

export default function Accordian() {
	const [selected, setSelected] = useState(null);
	const [enableMultiSelect, setEnableMultiSelect] = useState(false);
	const [multiple, setMultiple] = useState([]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10

	function handleSingleSelection(getCurrentId) {
		setSelected(getCurrentId === selected ? null : getCurrentId);
	}

	function handleMultiSelection(getCurrentId) {
		let cpyMultiple = [...multiple];
		const findIndex = cpyMultiple.indexOf(getCurrentId);

		if (findIndex === -1) cpyMultiple.push(getCurrentId);
		else cpyMultiple.splice(findIndex, 1);
		setMultiple(cpyMultiple);
	}

	return (
		<div className='wrapper'>
			<button onClick={() => setEnableMultiSelect(!enableMultiSelect)}>
				Enable Multi Selection
			</button>
			<div className='accordian'>
				{data && data.length > 0 ? (
					data.map((dataItem) => (
						<div key={dataItem.id} className='item'>
							<div
								onClick={
									enableMultiSelect
										? () => handleMultiSelection(dataItem.id)
										: () => handleSingleSelection(dataItem.id)
								}
								className='title'
							>
								<h3>{dataItem.questions}</h3>
								<span className='icon'>+</span>
							</div>
							{selected === dataItem.id ||
							multiple.indexOf(dataItem.id) !== -1 ? (
								<div className='content'>{dataItem.answers}</div>
							) : null}
						</div>
					))
				) : (
					<div>No data found</div>
				)}
			</div>
		</div>
	);
}
