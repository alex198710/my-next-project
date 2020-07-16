import Layout from '../../components/layout'
import { getSortedPostsData, getAllPostIds, getPostXml } from '../../lib/posts'
import Head from 'next/head'
import Router from 'next/router'
import Highlight from 'react-highlight'

export default function Xml({allPostsData, postXml}) {
  return (
    <Layout allPostsData={allPostsData}>
      <Head>
        <title>{postXml.name}</title>
      </Head>
      <h2>{postXml.name}</h2>
      <a href="/" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        Router.back()
      }}>← Back to previous page</a>
      {postXml.fileContents ? (
        <Highlight className="xml">
          {postXml.fileContents}
        </Highlight>
      ) : (
        <h1>:( File not found</h1>
      )}
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
  const postXml = await getPostXml(params.id)
  return {
    props: {
      allPostsData,
      postXml
    }
  }
}