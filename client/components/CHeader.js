import React from 'react'
import { Button } from 'antd'
import { CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons'

const CHeader = (props) => {
	return (
		<div className="navigation">
			<div className="title">
				<h1>Photos</h1>
			</div>
			<div className="menu">
				{props.isDeleteVisible && (
					<Button
						className="left"
						type="text"
						onClick={props.handleDelete}
						icon={<DeleteOutlined />}
					>
						Delete
					</Button>
				)}

				<Button
					className="left"
					type="text"
					onClick={props.handleOpenModal}
					icon={<CloudUploadOutlined />}
				>
					Upload
				</Button>
				<span className="total">{props.data.length}</span>
			</div>
		</div>
	)
}

export default CHeader
