import { Table } from 'antd'
import React from 'react'
import { TIdNameSlug } from 'src/types/Types'

interface TableComponentProps {
	data: TIdNameSlug[]
	columns: any[]
	currentPage: number
	total: number
	setCurrentPage: (page: number) => void
}

const AdminCategoryTable: React.FC<TableComponentProps> = ({
	data,
	total,
	columns,
	currentPage,
	setCurrentPage,
}) => {
	return (
		<Table
			pagination={{
				total: total,
				current: currentPage,
				onChange: page => setCurrentPage(page),
			}}
			columns={columns}
			dataSource={data}
			rowKey={(record: any) => record.slug}
		/>
	)
}

export { AdminCategoryTable }
