import styles from './Footer.module.scss'
import logo from 'src/assets/images/HeaderLogo.svg'
import playmarket from 'src/assets/images/GooglePlay.svg'
import instagram from 'src/assets/images/Instagram.svg'
import telegram from 'src/assets/images/Telegram.svg'
import youtube from 'src/assets/images/youtube.svg'
import { Link } from 'react-router-dom'
import { FaPhone } from 'react-icons/fa'
import { MdMailOutline } from 'react-icons/md'
import click from 'src/assets/images/Click.svg'
import payme from 'src/assets/images/Payme.svg'
import uzum from 'src/assets/images/Uzum.svg'

const Footer: React.FC = () => {
  const handleClickTelegram = () => {
    window.open('https://t.me/bookie_nks', '_blank')
  }
  const handleClickInstagram = () => {
    window.open('https://instagram.com/bookie_karakalpak', '_blank')
  }
  const handleClickYoutube = () => {
    window.open('https://youtube.com/channel/UCrb_94b-JGhG0X43CUx6CyA', '_blank')
  }

  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.first}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link to="/">
            <img src={playmarket} alt="google playmarket" />
          </Link>
        </div>
        <div className={styles.contacts}>
          <span>Biz benen baylanısıw</span>
          <a className={styles.tel} href="tel:+998933625744">
            <FaPhone />
            +998 93 362 57 44
          </a>
          <a className={styles.mail} href="mailto:bookie@gmail.com">
            <MdMailOutline />
            bookie@gmail.com
          </a>
        </div>
        <div className={styles.social}>
          <h2>Sociallıq tarmaqlar</h2>
          <div className={styles.logos}>
            <img onClick={handleClickInstagram} src={instagram} alt="instagram" />
            <img onClick={handleClickTelegram} src={telegram} alt="telegram" />
            <img onClick={handleClickYoutube} src={youtube} alt="youtube" />
          </div>
        </div>
        <div className={styles.support}>
          <Link to="/donate">Joybardı qollap-quwatlaw</Link>
          <Link to="/faq">Kóp beriletuǵın sorawlar</Link>
          <div>© 2023 Bookie | Karsoft</div>
        </div>
        <div className={styles.payments}>
          <span>Tólem túrleri</span>
          <img src={uzum} alt="image" />
          <img src={click} alt="image" />
          <img src={payme} alt="image" />
        </div>
      </div>
      <div className={styles.line} />
      <p style={{ textAlign: 'center', fontSize: 14 }}>
        © 2023-2024 "
        <a style={{ color: 'Yellow' }} href="https://bookie.uz">
          Bookie.uz
        </a>
        " qaraqalpaq tilindegi audiokitaplar platforması. Barlıq huqıqlar qorǵalǵan, nusqa alıp
        kóshiriw qadaǵan etiledi.
      </p>
    </div>
  )
}
export { Footer }
