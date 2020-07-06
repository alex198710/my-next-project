import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

function renderUl(data, subFolder = "", marginLeft = 0) {
  return (
    <ul className={utilStyles.list} style={{marginLeft: `${marginLeft}px`}}>
      {data.map(({ id, date, title, children }) => (
        <li className={utilStyles.listItem} key={id}>
          {!children ? (
            <Link href="/posts/[id]" as={`/posts/${subFolder}${id}`}>
              <a>{title}</a>
            </Link>
          ) : (
            <>
              <a>+ {title}</a>
              <div style={{marginTop: "10px"}}>
                {renderUl(children, subFolder + title + "_", marginLeft + 20)}
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function Layout({ children, home, allPostsData }) {
  return (
    <div className={utilStyles.body}>
      <div className={utilStyles.content}>
        <aside className={utilStyles.sidebar}>
          {renderUl(allPostsData)}
        </aside>
        {children}
      </div>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
  /*return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )*/
}