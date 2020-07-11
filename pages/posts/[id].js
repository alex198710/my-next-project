import Layout from '../../components/layout'
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { capitalize, slugToTitle } from '../../components/utils'


export default function Post({postData, allPostsData}) {
  const title = capitalize(postData.title || slugToTitle(postData.id))
  return (
    <Layout allPostsData={allPostsData}>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        {postData.title && (
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        )}
        {postData.date && (
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
        )}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const allPostsData = getSortedPostsData()
  const postData = await getPostData(params.id)
  return {
    props: {
      allPostsData,
      postData
    }
  }
}