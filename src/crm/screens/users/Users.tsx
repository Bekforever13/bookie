import React, { useState } from 'react'
import styles from './Users.module.scss'
import { CustomTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { TUserData } from 'src/types/Types'
import { Popconfirm, Select, Space } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BsTrash } from 'react-icons/bs'

const Users: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const queryClient = useQueryClient()
	const { data } = useQuery<any[]>({
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

	const handleDelete = async (id: number) => {
		await $host.delete(`/users/${id}`)
		queryClient.refetchQueries('admin-users')
	}

	const handleChangeRole = async (value: string, rec: TUserData) => {
		const findRoleId = value === 'admin' ? 2 : 3
		await $host.post('/role', { user_id: rec.id, role_id: findRoleId })
		queryClient.refetchQueries('admin-users')
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
			render: (_: any, rec: TUserData) => {
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
			render: (_: any, rec: TUserData) => {
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

export { Users }
