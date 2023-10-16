import React, { useState } from 'react'
import styles from './Orders.module.scss'
import { useQuery, useQueryClient } from 'react-query'
import { $host } from 'src/config/axios'
import { Popconfirm, Space, Table, TableColumnsType } from 'antd'
import { StyledButton } from 'src/components/ui'
import { BsTrash } from 'react-icons/bs'
import { IOrder } from 'src/types/Types'
import { formatPrice } from 'src/services/services'

const Orders: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const queryClient = useQueryClient()
	const { data, isLoading } = useQuery<IOrder[]>({
		queryKey: ['admin-orders'],
		queryFn: getOrders,
	})
	async function getOrders() {
		const res = await $host.get('/orders')
		const totalReviews = res.data.meta.total
		setTotal(totalReviews)
		return res.data.data
	}

	const handleDelete = (id: number) => {
		$host
			.delete(`/orders/${id}`)
			.then(() => queryClient.refetchQueries('admin-orders'))
	}

	const columns: TableColumnsType<IOrder> = [
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'User id',
			dataIndex: 'user',
			key: 'user',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (_, rec) => <>{formatPrice(rec.amount)}</>,
		},
		{
			title: 'Is paid',
			dataIndex: 'is_paid',
			key: 'is_paid',
			render: (_, record) => <>{record.is_paid ? 'True' : 'False'}</>,
		},
		{
			title: 'Books',
			dataIndex: 'books',
			key: 'books',
			render: (_, record) => {
				return (
					<>
						{record.books.map(item => (
							<span key={item.slug}>{item.title}</span>
						))}
					</>
				)
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
			render: (_: IOrder, rec: IOrder) => {
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
				<Table
					loading={isLoading}
					pagination={{
						total: total,
						current: currentPage,
						onChange: page => setCurrentPage(page),
					}}
					columns={columns}
					dataSource={data}
					rowKey={(record: IOrder) => record.url}
				/>
			)}
		</div>
	)
}

export { Orders }
