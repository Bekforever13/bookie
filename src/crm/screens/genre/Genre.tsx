import React from 'react'
import styles from './Genre.module.scss'
import { CustomTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { Space } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BsPencil, BsTrash } from 'react-icons/bs'

const Genre: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/genres')
		return res.data.data
	}
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Slug',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Action',
			key: 'action',
			render: () => (
				<Space size='middle'>
					<StyledButton
						color='var(--brand-color-1)'
						backgroundcolor='#fff'
						border='1px solid var(--brand-color-1)'
					>
						<BsPencil />
					</StyledButton>
					<StyledButton
						color='red'
						backgroundcolor='#fff'
						border='1px solid red'
					>
						<BsTrash />
					</StyledButton>
				</Space>
			),
		},
	]
	return (
		<div className={styles.genre}>
			{data && <CustomTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Genre }
