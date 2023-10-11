import React, { useState } from 'react'
import styles from './Categories.module.scss'
import { Input } from 'antd'
import search from 'src/assets/images/search.svg'
import { useDebounce } from 'src/hooks/useDebounce'
import { $host } from 'src/config/axios'
import { useQuery } from 'react-query'
import { IBookItem } from 'src/types/Types'
import { useNavigate } from 'react-router-dom'

const CategoriesSearch: React.FC = () => {
	const [searchValue, setSearchValue] = useState('')
	const navigate = useNavigate()
	const debouncedSearchValue = useDebounce(searchValue, 500)
	const { data } = useQuery<IBookItem[]>({
		queryKey: [debouncedSearchValue],
		queryFn: getBooks,
		staleTime: 5 * 60 * 1000,
		cacheTime: 60 * 60 * 1000,
	})
	async function getBooks() {
		const res = await $host.get(`/all-books?search=${debouncedSearchValue}`)
		return res.data.data
	}

	const handleClickItem = (slug: string) => {
		setSearchValue('')
		navigate(`/book/${slug}`, { replace: true })
	}
	return (
		<div className={styles.search_wrapper}>
			<Input
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				className={styles.search}
				prefix={<img src={search} alt='search' />}
				placeholder='Kitaptı izleń'
			/>
			{debouncedSearchValue !== '' && (
				<ul>
					{data?.map(item => (
						<li onClick={() => handleClickItem(item.slug)} key={item.slug}>
							{item.title}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export { CategoriesSearch }
