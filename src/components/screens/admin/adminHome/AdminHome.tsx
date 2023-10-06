import React, { useState, useEffect } from 'react'
import styles from './AdminHome.module.scss'
import { Statistic } from 'antd'
import { $host } from 'src/config/axios'

const AdminHome: React.FC = () => {
	const [totalBooks, setTotalBooks] = useState()
	const [totalUsers, setTotalUsers] = useState()

	useEffect(() => {
		$host.get('/books').then(res => setTotalBooks(res.data.data.length))
		$host.get('/users').then(res => setTotalUsers(res.data.data.length))
	}, [])
	return (
		<div className={styles.home}>
			<Statistic title='Kitaplar sani' value={totalBooks} />
			<Statistic title='User sani' value={totalUsers} />
		</div>
	)
}

export { AdminHome }
