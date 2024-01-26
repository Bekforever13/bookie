import { Link } from 'react-router-dom'
import styles from './UserHeader.module.scss'
import exit from 'src/assets/images/Exit.svg'
import { authStore } from 'src/store/authStore'
import Cookies from 'js-cookie'
import { userStore } from 'src/store/userStore'
import React from 'react'
import { Badge } from 'antd'

const UserHeader: React.FC = () => {
  const { setAuth, clearRole, role } = authStore()
  const { cart } = userStore()

  const handleClickExit = () => {
    Cookies.remove('token')
    setAuth(false)
    clearRole()
  }

  return (
    <div className={styles.actions}>
      {role.includes('admin') && <Link to="/admin">Admin Panel</Link>}
      <Link to="/favorites">Saylanǵanlar</Link>
      <Badge count={cart?.length} color="#ff9e30" offset={[0, -10]}>
        <Link to="/cart">Sebet</Link>
      </Badge>
      <Link to="/my_books">Kitaplarım</Link>
      <button onClick={handleClickExit} className={styles.exit}>
        Shıǵıw <img src={exit} alt="exit" />
      </button>
    </div>
  )
}
export { UserHeader }
