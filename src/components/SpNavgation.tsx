import React from 'react'
import Link from 'next/link'
import { siteConfig } from '../../site.config'

const SpNavgation = () => {
  return (
    <div className='hm'>
      <input type='checkbox' id='hmCheck' className='hidden' />
      <label htmlFor='hmCheck' className='open-btn'>
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className='hm-content'>
        <div className='flex justify-center flex-col items-center my-6'>
          <div className='logo text-white mt-20'>
            <Link className='hover:text-lime-200 text-4xl' href='/'>
              {siteConfig.siteTitle}
            </Link>
          </div>
          <p className='sub-title text-white text-2xl'>-こころのケアノート-</p>
        </div>

        <p className='hm-title'>コンテンツ</p>
        <nav>
          <ul>
            <li>
              <Link href='/'>ホーム</Link>
            </li>

            <li>
              <Link href={`/for-first-time-users`}>初めての方へ</Link>
            </li>
            <li>
              <Link href={`/tw`}>つぶやき</Link>
            </li>
            <li>
              <Link href={`/health`}>健康</Link>
            </li>
            <li>
              <Link href={`/mental-illness`}>精神疾患</Link>
            </li>
            <li>
              <Link href={`/medical-welfare-system`}>医療福祉制度</Link>
            </li>
          </ul>
        </nav>
        <p className='hm-title'>その他</p>
        <nav>
          <ul>
            <li>
              <Link href='/news-list'>お知らせ一覧</Link>
            </li>
            <li>
              <Link href='/contact'>お問い合わせ</Link>
            </li>
            <li>
              <Link href='/sitemap'>サイトマップ</Link>
            </li>
            <li>
              <Link href='/privacy-policy'>プライバシーポリシー</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SpNavgation
