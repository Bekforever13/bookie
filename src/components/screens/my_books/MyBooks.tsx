import React, { useState } from 'react'
import styles from './MyBooks.module.scss'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/assets/types/Types'
import { BookCard } from 'src/components/shared/BookCard/BookCard'

async function getMyBooks() {
	const res = await $host.get('/my-books')
	return res.data.data
}

const MyBooks: React.FC = () => {
	const [active, setActive] = useState('all')
	const { data } = useQuery<IBookInfo[]>({
		queryKey: ['my_books'],
		queryFn: getMyBooks,
	})

	return (
		<div className={styles.my_books}>
			<h1>Meniń kitaplarım</h1>
			<div className={styles.btns}>
				<StyledButton
					onClick={() => setActive('all')}
					backgroundcolor='none'
					color={
						active === 'all'
							? 'var(--brand-color-1)'
							: 'var(--typography-secondary)'
					}
					border={
						active === 'all'
							? '1px solid var(--brand-color-1)'
							: '1px solid var(--typography-secondary)'
					}
				>
					Barlıq kitaplarım
				</StyledButton>
				<StyledButton
					onClick={() => setActive('listen')}
					backgroundcolor='none'
					color={
						active === 'listen'
							? 'var(--brand-color-1)'
							: 'var(--typography-secondary)'
					}
					border={
						active === 'listen'
							? '1px solid var(--brand-color-1)'
							: '1px solid var(--typography-secondary)'
					}
				>
					Esitiliwde
				</StyledButton>
			</div>
			<div className={styles.wrapper}>
				{data?.map(item => (
					<BookCard key={item.slug} {...item} />
				))}
			</div>
		</div>
	)
}

export { MyBooks }
