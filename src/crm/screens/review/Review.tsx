import React from 'react'
import styles from './Review.module.scss'
import { BookTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'

const Review: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/reviews')
		return res.data.data
	}
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Text',
			dataIndex: 'text',
			key: 'text',
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			key: 'rating',
		},
	]
	return (
		<div className={styles.review}>
			{data && <BookTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Review }
