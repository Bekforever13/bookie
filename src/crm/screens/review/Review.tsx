import React, { useState } from 'react'
import styles from './Review.module.scss'
import { CustomTable } from 'src/crm/components'
import { $host } from 'src/config/axios'
import { useQuery, useQueryClient } from 'react-query'
import { Popconfirm, Space } from 'antd'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { BsTrash } from 'react-icons/bs'
import { PiPencilSimpleDuotone } from 'react-icons/pi'
import { TReview } from 'src/types/Types'
import { sharedStore } from 'src/store/admin/sharedStore'
import { ReviewModal } from 'src/crm/components'

const Review: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1)
	const [total, setTotal] = useState(1)
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { setIsEdit, setReviewToEdit } = sharedStore()
	const { data } = useQuery<any[]>({
		queryKey: ['admin-reviews', currentPage],
		queryFn: getReviews,
	})
	async function getReviews() {
		const res = await $host.get(`/reviews?page=${currentPage}`)
		const totalReviews = res.data.meta.total
		setTotal(totalReviews)
		return res.data.data
	}

	const handleDelete = async (id: number) => {
		await $host.delete(`/reviews/${id}`)
		queryClient.refetchQueries('admin-reviews')
	}

	const handleBtnEdit = (record: TReview) => {
		setReviewToEdit(record)
		setIsModalOpen(true)
		setIsEdit(true)
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
		{
			title: 'Action',
			key: 'action',
			render: (_: any, rec: TReview) => {
				return (
					<Space className={styles.btns} size='middle'>
						<StyledButton
							color='var(--brand-color-1)'
							backgroundcolor='#fff'
							border='1px solid var(--brand-color-1)'
							onClick={() => handleBtnEdit(rec)}
						>
							<PiPencilSimpleDuotone />
						</StyledButton>

						<Popconfirm
							title='Вы действительно хотите удалить?'
							onConfirm={() => handleDelete(Number(rec.id))}
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
		<div className={styles.review}>
			{data && (
				<>
					<CustomTable
						total={total}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						columns={columns}
						dataSource={data}
					/>
					<ReviewModal
						title='Review edit'
						open={isModalOpen}
						setIsModalOpen={setIsModalOpen}
					/>
				</>
			)}
		</div>
	)
}

export { Review }
