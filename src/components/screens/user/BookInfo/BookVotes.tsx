import { FC } from 'react'
import { BiSolidLike } from 'react-icons/bi'
import { FaBookOpen, FaBookReader } from 'react-icons/fa'
import { FaBookBookmark } from 'react-icons/fa6'
import { StyledButton } from 'src/components/ui'
import styles from './BookInfo.module.scss'

const BookVotes: FC = () => {
  return (
    <div className={styles.votes}>
      <h4>Dawis berin:</h4>
      <div className={styles.vote_btns}>
        <StyledButton border="1px solid #2D71AE" backgroundcolor="transparent" color="#2D71AE">
          <FaBookBookmark />
          Esittim
        </StyledButton>
        <StyledButton border="1px solid #2D71AE" backgroundcolor="transparent" color="#2D71AE">
          <FaBookReader />
          Esitip atırman
        </StyledButton>
        <StyledButton border="1px solid #2D71AE" backgroundcolor="transparent" color="#2D71AE">
          <FaBookOpen />
          Esitejaqpan
        </StyledButton>
        <StyledButton border="1px solid #2D71AE" backgroundcolor="transparent" color="#2D71AE">
          <BiSolidLike />
          Usınıs etemen
        </StyledButton>
      </div>
    </div>
  )
}

export { BookVotes }
