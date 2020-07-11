import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { slugToTitle, capitalize } from './utils';
import Navbar from './navbar';

const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

function renderUl(data, subFolder = "", marginLeft = 0) {
  return (
    <ul className={utilStyles.list} style={{marginLeft: `${marginLeft}px`}}>
      {data.map(({ id, date, title, children }) => (
        <li className={utilStyles.listItem} key={id}>
          {(children?.length || 0) === 0 ? (
            <Link href="/posts/[id]" as={`/posts/${subFolder}${id}`}>
              <a>{title || id}</a>
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

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    minWidth: 275,
    maxWidth: 400,
  },
});

function renderTreeview(data, subFolder = "", marginLeft = 0) {
  return (
    <>
      {data.map(({ id, date, title, children }) => {
        const prettyTitle = capitalize(title || slugToTitle(id))
        return (
          <React.Fragment key={id}>
            {(children?.length || 0) === 0 ? (
              <TreeItem nodeId={id} label={
                <Link href="/posts/[id]" as={`/posts/${subFolder}${id}`}>
                  <a className={utilStyles.sidebarLink}>{prettyTitle}</a>
                </Link>
              } />
            ) : (
              <TreeItem nodeId={id} label={prettyTitle}>
                {renderTreeview(children, subFolder + title + "_", marginLeft + 20)}
              </TreeItem>
            )}
          </React.Fragment>
        )
      })}
    </>
  )
}

export default function Layout({ children, home, allPostsData }) {
  const classes = useStyles();
  return (
    <>
    <Navbar />
      <div className={utilStyles.body}>
        <div className={utilStyles.content}>
          <aside className={utilStyles.sidebar}>
            <TreeView
        className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              defaultEndIcon={<span className={utilStyles.leaf} />}
            >
              {renderTreeview(allPostsData)}
            </TreeView>
          </aside>
          <div>
            {children}
            {!home && (
              <div className={styles.backToHome}>
                <Link href="/">
                  <a>← Back to home</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
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