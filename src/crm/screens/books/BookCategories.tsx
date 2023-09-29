import React, { useEffect } from 'react'
import { QueryClient } from 'react-query'
import { StyledButton } from 'src/components/ui/button/StyledButtons'
import styles from './Books.module.scss'
import { adminStore } from 'src/store/admin/adminStore'

const BookCategories: React.FC = () => {
	const queryClient = new QueryClient()
	const { activeCategory, setActiveCategory, fetchCategories, categories } =
		adminStore()

	const handleClickCategory = (str: string) => {
		queryClient.invalidateQueries(['admin-books'])
		setActiveCategory(str)
	}

	useEffect(() => fetchCategories, [])

	return (
		<div className={styles.categories}>
			<StyledButton
				border='1px solid #2D71AE'
				backgroundcolor='transparent'
				color='#2D71AE'
				className={activeCategory === '' ? styles.active : ''}
				onClick={() => handleClickCategory('')}
			>
				All
			</StyledButton>
			{categories?.map(item => (
				<StyledButton
					key={item.slug}
					border='1px solid #2D71AE'
					backgroundcolor='transparent'
					color='#2D71AE'
					onClick={() => handleClickCategory(item.slug)}
					className={activeCategory === item.slug ? styles.active : ''}
				>
					{item.name}
				</StyledButton>
			))}
		</div>
	)
}

export { BookCategories }
