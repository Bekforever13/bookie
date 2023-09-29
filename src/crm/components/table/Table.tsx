import { Table } from 'antd'
import React from 'react'

interface IProps {
	dataSource: any[]
	columns: any[]
	total: number
	currentPage: number
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const CustomTable: React.FC<IProps> = ({
	dataSource,
	columns,
	total,
	currentPage,
	setCurrentPage,
}) => {
	return (
		<>
			<Table
				pagination={{
					total: total,
					current: currentPage,
					onChange: page => setCurrentPage(page),
				}}
				dataSource={dataSource}
				columns={columns}
			/>
		</>
	)
}

export { CustomTable }
