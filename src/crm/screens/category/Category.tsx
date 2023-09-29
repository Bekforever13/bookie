import React from 'react'
import styles from './Category.module.scss'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { CustomTable } from 'src/crm/components'

const Category: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/categories')
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
	]
	return (
		<div className={styles.category}>
			<div></div>
			{data && <CustomTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Category }
