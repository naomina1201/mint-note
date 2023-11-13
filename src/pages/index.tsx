import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { siteConfig } from '../../site.config'
import Layout from '@/components/Layout'
import Seo from '@/components/Seo'
import { FrontProps } from '@/types'
import { jscategory, lastUpdatedAt, postCategory, postTitle, publishedAt, slug } from '@/utils/data'
import dateToTime from '@/utils/date'
import { allFetchPages } from '@/utils/notion'

export const getStaticProps: GetStaticProps = async () => {
  // NotionAPIからデータを取得する
  const { results: pages } = await allFetchPages({ exclusion: 'news-list' })
  const { results: newsPages } = await allFetchPages({ category: 'news-list' })
  // ダミーデータを渡す。
  //const pages = dammyPages

  return {
    props: {
      pages: pages ? pages : [],
      newsPages: newsPages ? newsPages : [],
    },
    revalidate: 10,
  }
}

const Home: FC<FrontProps> = ({ pages, newsPages }) => {
  return (
    <Layout>
      <>
        <Seo
          pagePath={`${siteConfig.siteUrl}`}
          pageImg={`${siteConfig.siteUrl}ogp.jpg`}
          pageImgWidth={1200}
          pageImgHeight={800}
        />
        <div className='p-6 bg-white rounded-lg shadow-sm border-gray-200 border-[1px]'>
          <h2 className='font-black text-2xl mb-2'>お知らせ</h2>
          <p className='text-right'>
            <Link
              href='news-list'
              className='block w-[150px] text-sm ml-auto my-6 bg-lime-900 text-white rounded-sm hover:bg-lime-600 p-2'
            >
              お知らせ一覧を見る
            </Link>
          </p>
          <ul>
            {newsPages.map(
              (news, index) =>
                index < 3 && (
                  <li
                    key={index}
                    className='flex mb-2 border-dotted pb-2 border-gray-300 border-b-[1px]'
                  >
                    <time
                      itemProp='datePublished'
                      dateTime={dateToTime(publishedAt(news), 'YYYY-MM-DD')}
                      className='font-black text-lime-700 w-[90px] block mr-4'
                    >
                      {dateToTime(publishedAt(news), 'YYYY/MM/DD')}
                    </time>
                    <Link
                      href={'/news-list/' + slug(news)}
                      className='underline text-blue-600 hover:no-underline font-bold'
                    >
                      {postTitle(news)}
                    </Link>
                  </li>
                ),
            )}
          </ul>
        </div>
        <div className='my-6 flex justify-between lg:flex-col'>
          <div className='p-6 bg-white rounded-lg shadow-sm border-gray-200 border-[1px] max-w-xl top-news w-full lg-max-w-full lg:mb-6'>
            <h2 className='font-black text-2xl mb-4'>新着記事</h2>
            <ul>
              {pages.map(
                (page, index) =>
                  index < 6 && (
                    <li key={index} className='w-full overflow-hidden text-ellipsis mb-4'>
                      <p className='text-sm'>
                        <span>
                          最終更新日：
                          <time itemProp='dateModified' dateTime={dateToTime(lastUpdatedAt(page))}>
                            {dateToTime(lastUpdatedAt(page), 'YYYY/MM/DD')}
                          </time>
                        </span>
                        {/* <span className='inline-block ml-4'>カテゴリー:</span> */}
                        <span className='inline-block ml-2 category text-gray-600 font-bold'>
                          {jscategory(page)}
                        </span>
                      </p>
                      <Link
                        href={'/' + postCategory(page) + '/' + slug(page)}
                        className='mt-1 inline-block text-ellipsis underline text-lime-700 hover:no-underline font-bold truncate w-full'
                      >
                        {postTitle(page)}
                      </Link>
                    </li>
                  ),
              )}
            </ul>
          </div>
          <div className='w-[250px] lg:w-full'>
            <div className='p-6 bg-white rounded-lg shadow-sm border-gray-200 border-[1px]'>
              <Image
                src='/icon.jpg'
                alt='ナオのプロフィール画像'
                width='400'
                height='400'
                className='w-[120px] mx-auto text-center rounded-full object-cover object-center'
              />
              <h2 className='font-black text-center text-base my-2'>
                <span className='underline'>
                  <a href='https://mint-note.net/for-first-time-users/01689127440000'>
                    ナオ＠精神障害当事者
                  </a>
                </span>
              </h2>
              <p className='text-center text-sm'>
                精神障害（統合失調症）、発達障害（ADHD,ASD）の当事者です。
                <br />
                障がい者が、より生きやすい社会になるために情報発信しています。
              </p>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Home
