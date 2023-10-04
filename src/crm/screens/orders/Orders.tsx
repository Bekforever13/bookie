import React, { useState } from 'react'
import styles from './Orders.module.scss'
import { CustomTable } from 'src/crm/components'
import { useQuery, useQueryClient } from 'react-query'
import { $host } from 'src/config/axios'
import { Popconfirm, Space } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BsTrash } from 'react-icons/bs'
import { IOrder } from 'src/crm/types/types'

const Orders: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const queryClient = useQueryClient()
	const { data } = useQuery<any[]>({
		queryKey: ['admin-orders'],
		queryFn: getOrders,
	})
	async function getOrders() {
		const res = await $host.get('/orders')
		const totalReviews = res.data.meta.total
		setTotal(totalReviews)
		return res.data.data
	}

	const handleDelete = async (id: number) => {
		await $host.delete(`/orders/${id}`)
		queryClient.refetchQueries('admin-orders')
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
		{
			title: 'Action',
			key: 'action',
			render: (_: any, rec: IOrder) => {
				return (
					<Space className={styles.btns} size='middle'>
						<Popconfirm
							title='Вы действительно хотите удалить?'
							onConfirm={() => handleDelete(rec.id)}
						>
							<StyledButton
								color='red'
								backgroundcolor='#fff'
								border='1px solid red'
							>
								<BsTrash />
							</StyledButton>
						</Popconfirm>
					</Space>
				)
			},
		},
	]
	return (
		<div className={styles.orders}>
			{data && (
				<CustomTable
					total={total}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					columns={columns}
					dataSource={data}
				/>
			)}
		</div>
	)
}

export { Orders }
