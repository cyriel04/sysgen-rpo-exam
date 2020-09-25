import React from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const CUpload = (props) => {
	return (
		<div className="upload">
			<Dragger
				// action="/api/photos/list"
				name="file"
				multiple={true}
				beforeUpload={props.beforeUpload}
				listType="text"
				fileList={props.list}
				onChange={props.handleChange}
			>
				<p className="ant-upload-drag-icon">
					<InboxOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
			</Dragger>
		</div>
	)
}

export default CUpload
