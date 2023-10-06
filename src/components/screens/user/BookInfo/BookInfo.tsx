import React from 'react'

import styles from './BookInfo.module.scss'
import { Report } from './Report'
import { Testimonials } from './Testimonials'
import { Book } from './Book'

const BookInfo: React.FC = () => {
	return (
		<div className={styles.book_info}>
			<Book />
			<Testimonials />
			<Report />
		</div>
	)
}

export { BookInfo }
