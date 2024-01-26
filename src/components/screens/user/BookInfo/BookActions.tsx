import { FC } from 'react'
import styles from './BookInfo.module.scss'
import headset from 'src/assets/images/headset.svg'
import heart0 from 'src/assets/images/heart0.svg'
import heart1 from 'src/assets/images/heart1.svg'
import { userStore } from 'src/store/userStore'
import { authStore } from 'src/store/authStore'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { IBookInfo } from 'src/types/Types'
import { $host } from 'src/config/axios'
import { message } from 'antd'
import { StyledButton } from 'src/components/ui'
import { FaShareAlt, FaCreditCard, FaShoppingCart } from 'react-icons/fa'

const BookActions: FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { auth } = authStore()
  const { pathname } = useLocation()
  const {
    favorites,
    cart,
    addToCart,
    addToFavorite,
    removeFromFavorite,
    addBooksToBuy,
    clearBooksToBuy,
  } = userStore()
  const { data } = useQuery<IBookInfo>({
    queryKey: ['book_info', pathname],
    queryFn: getBookInfo,
    staleTime: 5 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  })

  async function getBookInfo() {
    const res = await $host.get(`/all-books/${slug}`)
    return res.data.data
  }

  const isFav = favorites.some((item) => item.slug === data?.slug)
  const isCart = cart.some((item) => item.slug === data?.slug)

  const handleClickFavorite = () => {
    data && addToFavorite(data)
    message.success('Saylandılarǵa qosıldı')
  }
  const handleRemoveFromFavorite = () => {
    data && removeFromFavorite(data.slug)
    message.error('Saylandılar bóliminen óshirildi.')
  }
  const handleClickCart = () => {
    data && addToCart(data)
    message.success('Sebetke qosıldı')
  }

  const handleClickNavigate = () => navigate('/cart', { replace: true })

  const handleClickListen = () => {
    if (auth) {
      navigate(`/audiobook/${data?.slug}`)
    } else {
      navigate('/login')
    }
  }

  const handleClickBuy = () => {
    if (!auth) {
      navigate('/register')
      message.warning('Kitap satıp alıw ushın, dáslep, akkauntıńızǵa kiriwińiz kerek boladı', 3)
    } else if (auth) {
      clearBooksToBuy()
      data && addBooksToBuy(data)
      navigate('/payment')
    }
  }

  const handleShare = () => {
    navigator.share({
      title: `${data?.title}`,
      text: `${data?.description}`,
      url: `${$host}/book/${data?.slug}`,
    })
  }
  return (
    <div className={styles.btns}>
      {auth && (
        <StyledButton
          border="none"
          backgroundcolor="var(--brand-color-3)"
          color="#2D71AE"
          onClick={handleClickListen}
          className={styles.headset}
        >
          <img src={headset} alt="headset" />
          Tıńlap kóriw
        </StyledButton>
      )}
      <StyledButton
        border="none"
        backgroundcolor="var(--brand-color-3)"
        color="#2D71AE"
        onClick={handleClickBuy}
      >
        <FaCreditCard />
        Satıp alıw
      </StyledButton>
      {auth &&
        (!isCart ? (
          <StyledButton
            onClick={handleClickCart}
            backgroundcolor="var(--additional-color-4)"
            color="var(--typography-light)"
          >
            <FaShoppingCart />
            Sebetke salıw
          </StyledButton>
        ) : (
          <StyledButton
            onClick={handleClickNavigate}
            backgroundcolor="none"
            color="var(--additional-color-4)"
            border="1px solid var(--additional-color-4)"
          >
            Sebetke ótiw
          </StyledButton>
        ))}
      {isFav ? (
        <img onClick={handleRemoveFromFavorite} src={heart1} alt="favorite" />
      ) : (
        <img onClick={handleClickFavorite} src={heart0} alt="favorite" />
      )}
      <StyledButton
        onClick={handleShare}
        border="none"
        backgroundcolor="var(--brand-color-3)"
        color="#2D71AE"
      >
        <FaShareAlt /> <span style={{ fontSize: '16px' }}>Úlesiw</span>
      </StyledButton>
    </div>
  )
}

export { BookActions }
