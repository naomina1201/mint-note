import React, { FC, useState } from 'react'
import { siteConfig } from '../../../site.config'
import Breadcrumb from '@/components/Breadcrumb'
import Layout from '@/components/Layout'
import 'react-toastify/dist/ReactToastify.min.css'
import Seo from '@/components/Seo'
import Image from 'next/image'
import { twFetchPages } from '@/utils/notion'
import { CategoryProps, IndexProps, Params } from '@/types'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { tweet, tweetCreatedAt } from '@/utils/data'

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await twFetchPages()

  if (!results.length) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10,
  }
}

const TW: NextPage<IndexProps> = ({ pages }) => {
  return (
    <Layout>
      <>
        <Seo
          pageTitle={`つぶやき`}
          pagePath={`${siteConfig.siteUrl}tw`}
          pageImg={`${siteConfig.siteUrl}ogp.jpg`}
          pageImgWidth={1200}
          pageImgHeight={800}
        />
        <h1 className='font-black text-2xl mb-6'>つぶやき</h1>
        <Breadcrumb breadList={`tw`} breadListJs={`つぶやき`} />

        {pages.map((page, index) => (
          <div
            key={index}
            className='my-6 p-6 bg-white rounded-lg shadow-sm border-gray-200 border-[1px]'
          >
            <p className='text-gray-600 text-right text-xs'>{tweetCreatedAt(page)}</p>

            <div className='flex justify-between items-center'>
              <div>
                <Image
                  src='/icon.jpg'
                  alt='ナオのプロフィール画像'
                  width='200'
                  height='200'
                  className='w-[80px] mx-auto text-center object-cover object-center'
                />
              </div>
              <p className='font-bold py-4 w-full ml-6'>{tweet(page)}</p>
            </div>
          </div>
        ))}
      </>
    </Layout>
  )
}

export default TW
