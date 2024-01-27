import { FC } from 'react'
import { BiSolidLike } from 'react-icons/bi'
import { FaBookOpen, FaBookReader } from 'react-icons/fa'
import { FaBookBookmark } from 'react-icons/fa6'
import { StyledButton } from 'src/components/ui'
import styles from './BookInfo.module.scss'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { $host } from 'src/config/axios'
import { useParams } from 'react-router-dom'

type TData = {
  esittim: [number, boolean]
  esitip_atirman: [number, boolean]
  esitejaqpan: [number, boolean]
  usinis_etemen: [number, boolean]
}

type TFormData = {
  vote_id: number
  slug: string
}

const BookVotes: FC = () => {
  const client = useQueryClient()
  const { slug } = useParams()

  const { mutate: vote } = useMutation(voteForBook, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['book_votes'] })
    },
  })
  const { mutate: deleteVotes } = useMutation(deleteVote, {
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['book_votes'] })
    },
  })
  const { data } = useQuery({
    queryKey: ['book_votes'],
    queryFn: getBookVotesResults,
  })

  async function getBookVotesResults(): Promise<TData> {
    const res = await $host.get(`/voting?book=${slug}`)
    return res.data
  }

  async function voteForBook(data: TFormData) {
    const res = await $host.post('/voting', data)
    return res.data
  }

  async function deleteVote(voteId: number) {
    const res = await $host.delete(`/voting`, { data: { vote_id: voteId, slug: slug } })
    return res
  }

  const handleClickVote = (voteId: number) => {
    switch (voteId) {
      case 1:
        !data?.esittim[1] ? vote({ vote_id: voteId, slug: slug! }) : deleteVotes(voteId)
        break
      case 2:
        !data?.esitip_atirman[1] ? vote({ vote_id: voteId, slug: slug! }) : deleteVotes(voteId)
        break
      case 3:
        !data?.esitejaqpan[1] ? vote({ vote_id: voteId, slug: slug! }) : deleteVotes(voteId)
        break
      case 4:
        !data?.usinis_etemen[1] ? vote({ vote_id: voteId, slug: slug! }) : deleteVotes(voteId)
        break
    }
  }

  return (
    <div className={styles.votes}>
      <h4>Dawis berin:</h4>
      <div className={styles.vote_btns}>
        <StyledButton
          onClick={() => handleClickVote(1)}
          border="1px solid #2D71AE"
          backgroundcolor="transparent"
          color="#2D71AE"
        >
          <FaBookBookmark />
          Esittim
          <span>{data?.esittim[0]}</span>
        </StyledButton>
        <StyledButton
          onClick={() => handleClickVote(2)}
          border="1px solid #2D71AE"
          backgroundcolor="transparent"
          color="#2D71AE"
        >
          <FaBookReader />
          Esitip atırman
          <span>{data?.esitip_atirman[0]}</span>
        </StyledButton>
        <StyledButton
          onClick={() => handleClickVote(3)}
          border="1px solid #2D71AE"
          backgroundcolor="transparent"
          color="#2D71AE"
        >
          <FaBookOpen />
          Esitejaqpan
          <span>{data?.esitejaqpan[0]}</span>
        </StyledButton>
        <StyledButton
          onClick={() => handleClickVote(4)}
          border="1px solid #2D71AE"
          backgroundcolor="transparent"
          color="#2D71AE"
        >
          <BiSolidLike />
          Usınıs etemen
          <span>{data?.usinis_etemen[0]}</span>
        </StyledButton>
      </div>
    </div>
  )
}

export { BookVotes }
