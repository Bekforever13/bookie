import React from 'react'
import styles from './Narrator.module.scss'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { BookTable } from 'src/crm/components'

const Narrator: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/narrators')
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
		<div className={styles.narrator}>
			{data && <BookTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Narrator }
