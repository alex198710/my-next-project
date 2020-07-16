import React from "react"
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
//import remark from 'remark'
import html from 'remark-html'
//import styleGuide from  'remark-preset-lint-markdown-style-guide'
import raw from 'rehype-raw'
import unified from "unified"
// import html from "rehype-stringify"
import markdown from "remark-parse"
import format from "rehype-format"
import remark2rehype from "remark-rehype"
// import rehypePrism from "@mapbox/rehype-prism"
// import highlight from "rehype-highlight"
import highlight from "remark-highlight.js"
import rehype2react from 'rehype-react'

const postsDirectory = path.join(process.cwd(), 'posts')

function isDir(path) {
  return fs.statSync(path).isDirectory();
}

export function getSortedPostsData() {
  return getSortedPostsDataRec(postsDirectory)
}

export function getSortedPostsDataRec(rootDirectory) {
  // Get file names under /posts
  const fileNames = fs.readdirSync(rootDirectory)
  const allPostsData = fileNames
  .map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(rootDirectory, fileName)

    if (isDir(fullPath)) {
      return {
        id,
        title: fileName,
        children: getSortedPostsDataRec(fullPath)
      }
    } else if (!fullPath.endsWith(".md")) {
      return
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData
  .filter(d => d)
  .sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames
    // .filter((fileName) => fileName.endsWith(".md"))
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
}

export async function getPostData(id) {
  const nestedPath = id.split('_')
  const fileName = `${nestedPath.pop()}.md`
  const fullPath = path.join(postsDirectory, ...nestedPath, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(markdown)
    // .use(remark2rehype, {allowDangerousHtml: true})
    // .use(raw)
    .use(highlight)
    // .use(format)
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}

export async function getPostXml(id) {
  console.log(id)
  const nestedPath = id.split('_')
  const fileName = `${nestedPath.pop()}.xml`
  const fullPath = path.join(postsDirectory, ...nestedPath, fileName)
  let fileContents = ""
  try {
    fileContents = fs.readFileSync(fullPath, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }

  return {
    id,
    name: fileName,
    fileContents
  }
}