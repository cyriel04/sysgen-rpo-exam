import React from 'react'
import { Card, Checkbox } from 'antd'

const CImageCard = (props) => {
	return (
		<div className="card">
			{props.check && <Checkbox checked={props.check} />}
			<Card
				hoverable
				onClick={() =>
					props.handleCheck({
						documents: props.item.name,
						album: props.item.album
					})
				}
			>
				<img src={props.item.raw} alt="title"></img>
				<span className="name">{props.item.name}</span>
				<span className="album">{props.item.album}</span>
			</Card>
		</div>
	)
}

export default CImageCard
