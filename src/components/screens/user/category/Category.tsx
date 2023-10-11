import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ICategoryInfo } from 'src/types/Types'
import { BookCard } from 'src/components/shared/BookCard/BookCard'
import { $host } from 'src/config/axios'
import styles from './Category.module.scss'
import { Skeleton } from 'src/components/shared/BookCard/Skeleton'

const Category: React.FC = () => {
	const { slug } = useParams()
	const { data, isLoading } = useQuery<ICategoryInfo>({
		queryKey: ['category', slug],
		queryFn: geTIdNameSlugBooks,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function geTIdNameSlugBooks() {
		const res = await $host.get(`/category/${slug}`)
		return res.data.data
	}

	return (
		<div className={styles.category}>
			<h1>{data?.name}</h1>
			<div className={styles.books}>
				{isLoading
					? [...Array(4)].map((_, i) => <Skeleton key={i} />)
					: data?.books?.map(item => <BookCard key={item.slug} {...item} />)}
			</div>
		</div>
	)
}

export { Category }
