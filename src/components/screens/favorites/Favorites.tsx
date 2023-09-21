import React from 'react'
import { BookCard } from 'src/components/shared/BookCard/BookCard'
import { userStore } from 'src/store/userStore'
import styles from './Favorites.module.scss'

const Favorites: React.FC = () => {
	const { favorites } = userStore()
	return (
		<div className={styles.favorites}>
			<h1>Saylandılar</h1>
			<div className={styles.wrapper}>
				{favorites?.map(item => (
					<BookCard key={item.slug} {...item} />
				))}
			</div>
		</div>
	)
}

export { Favorites }
