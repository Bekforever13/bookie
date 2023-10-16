import React, { useState } from 'react'
import styles from './Users.module.scss'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { TUserData } from 'src/types/Types'
import { Popconfirm, Select, Space, Table } from 'antd'
import { StyledButton } from 'src/components/ui'
import { BsTrash } from 'react-icons/bs'

const Users: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const queryClient = useQueryClient()
	const { data, isLoading } = useQuery<TUserData[]>({
		queryKey: ['admin-users', currentPage],
		queryFn: getUsers,
	})
	async function getUsers() {
		const res = await $host.get(`/users?page=${currentPage}`)
		const totalUsers = res.data.meta.total
		setTotal(totalUsers)
		return res.data.data
	}

	const roleOptions = [
		{ value: 'admin', label: 'admin' },
		{ value: 'user', label: 'user' },
	]

	const handleDelete = (id: number) => {
		$host
			.delete(`/users/${id}`)
			.then(() => queryClient.refetchQueries('admin-users'))
	}

	const handleChangeRole = (value: string, rec: TUserData) => {
		const findRoleId = value === 'admin' ? 2 : 3
		$host
			.post('/role', { user_id: rec.id, role_id: findRoleId })
			.then(() => queryClient.refetchQueries('admin-users'))
	}

	const columns = [
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
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
			render: (_: TUserData, rec: TUserData) => {
				return (
					<Select
						style={{ width: '100%' }}
						placeholder='Select author'
						onChange={value => handleChangeRole(value, rec)}
						options={roleOptions}
						value={rec.role}
					/>
				)
			},
		},
		{
			title: 'Action',
			key: 'action',
			render: (_: TUserData, rec: TUserData) => {
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
		<div className={styles.users}>
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
					rowKey={(record: TUserData) => record.id}
				/>
			)}
		</div>
	)
}

export { Users }
