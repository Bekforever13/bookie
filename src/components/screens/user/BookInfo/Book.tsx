import React from 'react'
import { useQuery } from 'react-query'
import { $host } from 'src/config/axios'
import { useLocation, useParams } from 'react-router-dom'
import { IBookInfo } from 'src/types/Types'
import prince from 'src/assets/images/no_photo.jpg'
import styles from './BookInfo.module.scss'
import { Spin } from 'antd'
import { formatPrice } from 'src/services/services'
import { BookActions } from './BookActions'
import { BookVotes } from './BookVotes'
import { authStore } from 'src/store/authStore'

const Book: React.FC = () => {
  const { slug } = useParams()
  const { pathname } = useLocation()
  const { role } = authStore()

  const { data, isFetching } = useQuery<IBookInfo>({
    queryKey: ['book_info', pathname],
    queryFn: getBookInfo,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  })

  async function getBookInfo() {
    const res = await $host.get(`/all-books/${slug}`)
    return res.data.data
  }

  return (
    <Spin spinning={isFetching}>
      <div className={styles.book}>
        <div className={styles.image}>
          <img src={data?.image[0] ? data?.image[0].image_url : prince} alt="book image" />
        </div>
        <div className={styles.text}>
          <h1>{data?.title}</h1>
          <h4>{data?.author?.[0].name}</h4>
          <p>{data?.description}</p>
          <div className={styles.categories}>
            {data?.category.map((item) => (
              <span key={item.slug}>{item.name}</span>
            ))}
          </div>
          <h2>{data?.price && formatPrice(data.price)} som</h2>
          <BookActions />
          {role.length > 0 && <BookVotes />}
        </div>
      </div>
    </Spin>
  )
}

export { Book }
