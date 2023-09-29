import React from 'react'
import styles from './Users.module.scss'
import { CustomTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'

const Users: React.FC = () => {
	const { data } = useQuery<any[]>({
		queryKey: ['book_info'],
		queryFn: getBooks,
	})
	async function getBooks() {
		const res = await $host.get('/authors')
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
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
		},
	]
	return (
		<div className={styles.users}>
			{data && <CustomTable columns={columns} dataSource={data} />}
		</div>
	)
}

export { Users }
