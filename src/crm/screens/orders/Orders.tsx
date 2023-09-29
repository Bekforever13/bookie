import React from 'react'
import styles from './Orders.module.scss'
import { CustomTable } from 'src/crm/components'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'

const Orders: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/orders')
		return res.data.data
	}
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Status id',
			dataIndex: 'status_id',
			key: 'status_id',
		},
		{
			title: 'User id',
			dataIndex: 'user_id',
			key: 'user_id',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
		},
		{
			title: 'Is paid',
			dataIndex: 'is_paid',
			key: 'is_paid',
		},
		{
			title: 'Books',
			dataIndex: 'books',
			key: 'books',
			render: (_: any, record: any) => {
				return { record }
			},
		},
		{
			title: 'url',
			dataIndex: 'url',
			key: 'url',
		},
	]
	return (
		<div className={styles.orders}>
			{data && <CustomTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Orders }
