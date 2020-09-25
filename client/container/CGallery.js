import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { Spin } from 'antd'
import CImageCard from '../components/CImageCard'
import CHeader from '../components/CHeader'
import CModal from '../components/CModal'

const url = 'http://localhost:8888'
const CGallery = () => {
	const [api, setApi] = useState([])
	const [list, setList] = useState([])
	const [file, setFile] = useState([])
	const [isUploadModalVisible, setIsUploadModalVisible] = useState(false)
	const [checkList, setCheckList] = useState([])
	const [paginationLoading, setPaginationLoading] = useState(false)
	const [params, setParams] = useState({ limit: 25, skip: 0 })
	const [album, setAlbum] = useState('')

	useEffect(() => {
		fetchMyAPI()
	}, [])

	useEffect(() => {
		fetchMyAPI()
	}, [params])

	const fetchMyAPI = async () => {
		let response = await axios.post(`${url}/photos/list`, params)
		let { documents } = response.data
		setApi(documents)
	}

	const beforeUpload = (file) => {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!')
		}
		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!')
		}
		return isJpgOrPng && isLt2M
	}

	const handleChange = ({ fileList, file }) => {
		if (file.status !== 'uploading') {
			const item = {
				album: 'Food',
				uid: file.uid,
				name: file.name
			}
			console.log(file)
			setFile((w) => [...w, file.originFileObj])
			setList((list) => [...list, item])
		}
	}

	const handleSubmit = async () => {
		var bodyFormData = new FormData()
		for (var x = 0; x < file.length; x++) {
			bodyFormData.append('documents', file[x])
		}
		bodyFormData.append('album', album)

		try {
			let data = await axios({
				method: 'put',
				url: `${url}/photos`,
				data: bodyFormData,
				headers: { 'content-type': 'multipart/form-data' }
			})
			setApi((apis) => [...apis, ...data.data.data])
			setIsUploadModalVisible(false)
			setFile([])
			setList([])
		} catch (error) {
			console.log(error)
		}
	}

	const handleSelectAlbum = (item) => {
		setAlbum(item)
	}

	const handleOpenModal = () => {
		setIsUploadModalVisible(true)
	}
	const handleModalClose = () => {
		setIsUploadModalVisible(false)
	}

	const handleCheck = (itemCheck) => {
		if (checkList.some((it) => it['documents'] === itemCheck.documents)) {
			const updateCheckList = checkList.filter((item) => {
				return item.documents !== itemCheck.name && item.album !== itemCheck.album
			})
			return setCheckList(updateCheckList)
		}
		setCheckList((checkL) => [...checkL, itemCheck])
	}
	const handleDelete = async () => {
		let response = await axios({
			method: 'delete',
			url: `${url}/photos`,
			data: checkList,
			headers: { 'content-type': 'application/json' }
		})

		const myArray = await api.filter(
			(ar) => !checkList.find((rm) => rm.documents === ar.name && ar.album === rm.album)
		)
		setApi(myArray)
	}

	return (
		<div className="gallery">
			<CHeader
				data={api}
				handleOpenModal={handleOpenModal}
				handleDelete={handleDelete}
				isDeleteVisible={checkList.length > 0}
			/>
			<div className="container">
				{api.map((item, key) => {
					return (
						<CImageCard
							key={key}
							item={item}
							handleCheck={handleCheck}
							check={checkList.some((it) => it['documents'] === item.name)}
						/>
					)
				})}
			</div>
			<div className="load-more">
				{params.limit === 100 ? (
					<span>No more results</span>
				) : (
					<span
						onClick={() =>
							setParams((prevParams) => {
								return {
									...prevParams,
									limit: prevParams.limit * 2
								}
							})
						}
					>
						Load more
					</span>
				)}
			</div>
			<CModal
				list={list}
				visible={isUploadModalVisible}
				handleModalClose={handleModalClose}
				beforeUpload={beforeUpload}
				handleSelectAlbum={handleSelectAlbum}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</div>
	)
}

export default CGallery
