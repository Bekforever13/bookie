import { Table, TableColumnType } from 'antd'
import React from 'react'
import { TIdNameSlug } from 'src/types/Types'

interface TableComponentProps {
	data: TIdNameSlug[]
	columns: TableColumnType<TIdNameSlug>[]
	currentPage: number
	total: number
	loading: boolean
	setCurrentPage: (page: number) => void
}

const AdminCategoryTable: React.FC<TableComponentProps> = ({
	data,
	total,
	columns,
	currentPage,
	loading,
	setCurrentPage,
}) => {
	return (
		<Table
			loading={loading}
			pagination={{
				total: total,
				current: currentPage,
				onChange: page => setCurrentPage(page),
			}}
			columns={columns}
			dataSource={data}
			rowKey={(record: TIdNameSlug) => record.slug}
		/>
	)
}

export { AdminCategoryTable }
