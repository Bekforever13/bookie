import { Table } from 'antd'
import React from 'react'

interface IProps {
	dataSource: any[]
	columns: any[]
}

const BookTable: React.FC<IProps> = ({ dataSource, columns }) => {
	return <Table dataSource={dataSource} columns={columns} />
}

export { BookTable }


            // onChange={handleChange('category_id')}
