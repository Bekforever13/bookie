import { FC, useRef, useState } from 'react'
import star from 'src/assets/images/donate_star.svg'
import save from 'src/assets/images/donate_save.svg'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import styles from './Faq.module.scss'

const Faq: FC = () => {
  const [activeItem, setActiveItem] = useState<number | null>(-1)
  const faq = useRef<HTMLDivElement>(null)

  const handleClick = (key: number | null) => {
    setActiveItem((prevActiveItem: number | null) => (prevActiveItem === key ? null : key))
  }

  const items = [
    {
      label: 'Audiokitaplardı qalay tıńlasam boladı?',
      children: (
        <p>
          <a className={styles.site} href="https://bookie.uz">
            Bookie.uz
          </a>{' '}
          saytı arqalı buyırtpa beriw ańsat.
          <br />
          <br /> Tómende bunı tolıq túsindirip beremiz.
          <br />
          <br />
          Kóbirek imkaniyatlarǵa iye bolıw ushın “Jeke kabinet” bóliminde dizimnen ótiń. Dizimnen
          ótiw Buyırtpa beriw haqqında maǵlıwmat alıwdan aldın, bir neshe kerekli ámellerdi orınlap
          alayıq. Saytımızda dizimnen ótiw ushın tómendegi izbe-izlikte orınlań:
          <br />
          <br />
          <strong>• “Dizimnen ótiw”</strong> bólimine kirip, atı familyańız hám telefon nomerińizdi
          kirgiziń. Soń parol kirgiziń. Bunnan keyin "Dizimnen ótiw" túymesin basıń.
          <br />
          <br /> • Arnawlı kod siziń nomerińizge SMS-xabar arqalı baradı. Onı kirgizgennen soń
          “Kiriw" túymesin basasız.
          <br />
          <br /> • “Ózgerislerdi saqlań” túymesin basqanıńızdan soń siz saytımızda dizimnen ótesiz.
          Qutlıqlaymız, siz endi keń imkaniyatqa iye qariydarlarımız qatarına qosıldıńız.
          Maǵlıwmatlardı ózińiz qálegen waqıtta “Jeke kabinet” arqalı jańalawıńız múmkin.
        </p>
      ),
    },
    {
      label: 'Audiokitaplar janrlarǵa bólingen be?',
      children: (
        <p>
          Álbette! Audiokitaplar 5 úlken janrlarǵa bólingen. Bular tómendegishe: <br />
          <br />
          1. Jáhán ádebiyatı
          <br />
          <br />
          2. Ózbek ádebiyatı <br />
          <br />
          3. Qaraqalpaq ádebiyatı <br />
          <br />
          4. Qaraqalpaq folklorı <br />
          <br />
          5. Qısqa audiokitaplar
        </p>
      ),
    },
    {
      label: 'Kitaplardıń audio variantınan tısqarı jáne qanday túrleri jaratılǵan?',
      children: (
        <p>
          Platformada kitaplardıń elektron formatları da jaylastırılǵan. Audiolar menen tikkeley
          elektron variantların paydalansańız da boladı.
        </p>
      ),
    },
    {
      label: 'Audiolardı telefonıma saqlap alsam bola ma?',
      children: (
        <p>
          Audiokitaplardı saqlap alıwdıń imkaniyatı joq. Olardı tek platforma hám android
          variantlarında tıńlay alasız.
        </p>
      ),
    },
    {
      label: 'Audiokitaplardı qalay satıp alamız?',
      children: (
        <p>
          Saytımızda ózińizge unaǵan kitaptı tańlap, "Satıp alıw" túymesin basasız. Soń tólemdi
          Payme, Click, Bank kartaları arqalı ámelge asırasız.
        </p>
      ),
    },
  ]

  return (
    <>
      <div className={styles.faq} ref={faq}>
        <h4>Kóp beriletuǵın sorawlar</h4>
        <div className={styles.accordion}>
          {items.map((item, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                onClick={() => handleClick(index)}
                className={`${styles.accordionHeader} ${activeItem === index ? styles.active : ''}`}
              >
                {item.label}
                <span className={styles.plus}>
                  {activeItem === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
              </div>
              <div
                className={`${styles.accordionContent} ${activeItem === index ? styles.show : ''}`}
              >
                {item.children}
              </div>
            </div>
          ))}
          <span className={styles.number}>
            Qosımsha sorawlarıńız bolsa, +998 93 362 57 44 nomerine xabarlasqan halda juwap alasız.
          </span>
        </div>
      </div>
      <img className={styles.save} src={save} alt="save" />
      <img className={styles.star} src={star} alt="star" />
    </>
  )
}

export { Faq }
