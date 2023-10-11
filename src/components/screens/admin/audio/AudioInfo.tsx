import React from 'react'
import { TAudio } from 'src/types/Types'
import { Popconfirm } from 'antd'
import { BsTrash } from 'react-icons/bs'
import { StyledButton } from 'src/components/ui'

type AudioInfoProps = {
	data: TAudio
	handleDelete: (id: number | undefined) => void
}

const AudioInfo: React.FC<AudioInfoProps> = ({ data, handleDelete }) => {
	return (
		<ul>
			<li>ID: {data.id}</li>
			<li>Title: {data.title}</li>
			<li>Slug: {data.slug}</li>
			<li>Is_free: {data.is_free}</li>
			<li>
				URL: <audio src={data.audio_url} controls />
			</li>
			<Popconfirm
				title='Вы действительно хотите удалить?'
				onConfirm={() => handleDelete(data.id)}
			>
				<StyledButton color='red' backgroundcolor='#fff' border='1px solid red'>
					<BsTrash />
				</StyledButton>
			</Popconfirm>
		</ul>
	)
}

export default AudioInfo
