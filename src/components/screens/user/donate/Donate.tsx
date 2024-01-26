import React from 'react'
import styles from './Donate.module.scss'
import donate from 'src/assets/images/donate.png'

const Donate: React.FC = () => (
  <div className={styles.donate}>
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <h3>Jańa shoqqılardı birgelikte iyeleyik!</h3>
        <p>
          Biz, jańadan ashılǵan «Bookie» qaraqalpaq tilindegi audiokitarlar platforması, siz sıyaqlı
          keńpeyil hám qayır saqawatlı insanlardıń járdemine súyenemiz. Eger usı sózlerdi oqıp
          atırǵanlar keminde 20 mıń somnan qayır-saqawat qılsa, joybar jumısları 2 jıl ishinde óz
          juwmaǵına jetedi. Sizden joybardı qollap-quwatlawıńızdı soraymız hám bunıń menen siz
          Qaraqalpaq tiliniń rawajlanıwına úlken úles qosqan bolasız.
        </p>
      </div>
      <img src={donate} alt="donate" />
    </div>
  </div>
)

export { Donate }
