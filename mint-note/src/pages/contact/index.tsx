import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { siteConfig } from '../../../site.config'
import Breadcrumb from '@/components/Breadcrumb'
import Layout from '@/components/Layout'
import 'react-toastify/dist/ReactToastify.min.css'
import Seo from '@/components/Seo'

interface FetchRequest {
  url: string
  options: object
}

async function fetchAsync(request: FetchRequest) {
  return await fetch(request.url, request.options)
}

const Contact: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submitForm = async (e: any) => {
    e.preventDefault()
    const res = await fetchAsync({
      url: `./api/submit-form`,
      options: {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
      },
    })
    if (res.status === 201) {
      toast('メッセージが送信されました', { type: 'success' })
    } else {
      toast('メッセージ送信が失敗しました', { type: 'error' })
    }
  }
  return (
    <Layout>
      <>
        <Seo
          pageTitle={`お問い合わせ`}
          pagePath={`${siteConfig.siteUrl}contact`}
          pageImg={`${siteConfig.siteUrl}ogp.jpg`}
          pageImgWidth={1200}
          pageImgHeight={800}
        />
        <h1 className='font-black text-2xl mb-6'>お問い合わせ</h1>
        <Breadcrumb breadList={`contact`} breadListJs={`お問い合わせ`} />
        <div className='p-6 bg-white rounded-lg shadow-sm border-gray-200 border-[1px]'>
          <p className='font-bold py-4'>
            お問い合わせに関しては、管理者の都合により、即時対応できない場合がございます。ご了承くださいますようお願い申し上げます。
          </p>
          <p className='font-bold py-4'>
            お問い合わせにつきましては、こちらで確認はしてもご返信をお約束するものではないことをご了承くださいますようお願い申し上げます。
          </p>
          <p className='font-bold py-4'>
            管理者は、個人的な相談内容、（精神疾患やお薬の内容等）に、つきましては、お答えいたしかねます。
          </p>
          <p className='font-bold py-4'>
            サイト内の誤字脱字、リンク切れ、もしくは、記事に関するご質問、ご意見、ご感想などは、以下のフォームからお願いいたします。
          </p>
          <p className='font-bold py-4'>
            プライバシーポリシーについては
            <Link
              href='/privacy-policy'
              className='font-bold text-blue-600 underline hover:no-underline'
            >
              こちら
            </Link>
            をご覧ください。お問い合わせを利用された場合は、プライバシーポリシーに同意したものとみなします。
          </p>
        </div>

        <form
          name='contact-form'
          onSubmit={submitForm}
          className='mt-6 bg-green-600 max-w-6xl w-full mx-auto p-12 h-full'
        >
          <label htmlFor='textContent' className='text-white/90 text-base'>
            お名前
          </label>
          <input
            id='name'
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='名前をご記入ください。'
            required
            className='w-full p-2 text-base bg-white-600/90'
          />
          <label htmlFor='email' className='text-base mt-5 block text-white/90'>
            Eメール
          </label>
          <input
            id='email'
            type='email'
            name='email'
            placeholder='メールアドレスをご記入ください'
            className='w-full p-2 text-base bg-white-600/80'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor='contentText' className='mt-5 block text-white/90 text-base'>
            お問い合わせ内容
          </label>
          <textarea
            className='w-full p-2 h-40 text-base bg-white-600/80'
            name='message'
            id='contentText'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <input
            type='submit'
            value='メッセージを送信する'
            className='text-center bg-gradient-to-r from-amber-500 to-yellow-500 mt-5 mx-auto block max-w-xs font-bold p-3 text-base w-full hover:from-green-400 hover:to-lime-500'
          />
        </form>
      </>
    </Layout>
  )
}

export default Contact
