import React from 'react'
import { Modal, Button, Select } from 'antd'
import CUpload from './CUpload'
import { CloudUploadOutlined } from '@ant-design/icons'
const { Option } = Select

const albumOption = [
	{
		id: 1,
		value: 'food',
		label: 'Food'
	},
	{
		id: 2,
		value: 'nature',
		label: 'Nature'
	},
	{
		id: 3,
		value: 'other',
		label: 'Other'
	},
	{
		id: 4,
		value: 'personal',
		label: 'Personal'
	},
	{
		id: 5,
		value: 'travel',
		label: 'Travel'
	}
]
const CModal = (props) => {
	console.log(props.list.length)
	return (
		<div>
			<Modal
				title="Upload photos"
				visible={props.visible}
				footer={[
					<Select
						placeholder="Select album"
						onChange={(item) => props.handleSelectAlbum(item)}
					>
						{albumOption.map((item) => {
							return (
								<Option key={item.id} value={item.value}>
									{item.label}
								</Option>
							)
						})}
					</Select>,
					<Button
						key="upload"
						type="text"
						icon={<CloudUploadOutlined />}
						onClick={props.handleSubmit}
					>
						Upload
					</Button>
				]}
				onCancel={props.handleModalClose}
			>
				<div>
					<CUpload
						list={props.list}
						beforeUpload={props.beforeUpload}
						handleChange={props.handleChange}
						handleSubmit={props.handleSubmit}
					/>
					{props.list.length < 1 && (
						<span className="no-files-placeholder">No files selected</span>
					)}
				</div>
			</Modal>
		</div>
	)
}

export default CModal
