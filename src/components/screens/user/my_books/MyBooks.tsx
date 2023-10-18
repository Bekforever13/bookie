import React from 'react'
import styles from './MyBooks.module.scss'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { BookCard } from 'src/components/shared'

async function getMyBooks() {
	const res = await $host.get('/my-books')
	return res.data.data
}

const MyBooks: React.FC = () => {
	const { data } = useQuery<IBookInfo[]>({ queryFn: getMyBooks })

	return (
		<div className={styles.my_books}>
			<h1>Meniń kitaplarım</h1>
			<div className={styles.wrapper}>
				{data && data.length > 0
					? data.map(item => <BookCard key={item.slug} {...item} />)
					: !data?.length && <h2>Sizde kitaplar joq</h2>}
			</div>
		</div>
	)
}

export { MyBooks }
