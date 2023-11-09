import Link from 'next/link'
import React from 'react'
import { siteConfig } from '../../site.config'
import { useRouter } from 'next/router'

const Sidebar = () => {
  // 現在のルートを取得
  const router = useRouter()
  // 現在のルートがあるカテゴリーのページかどうかを判定
  const current = (category: string) => {
    return router.asPath === category ? `current ` : ''
  }

  return (
    <aside>
      <h1 className='logo'>
        <Link className='hover:text-lime-200' href='/'>
          {siteConfig.siteTitle}
        </Link>
      </h1>
      <p className='sub-title'>-こころのケアノート-</p>
      <nav className='mt-6'>
        <ul>
          <li>
            <Link href={`/for-first-time-users`} className={current('/for-first-time-users')}>
              初めての方へ
            </Link>
          </li>
          <li>
            <Link href={`/tw`} className={current('/tw')}>
              つぶやき
            </Link>
          </li>
          <li>
            <Link href={`/health`} className={current('/health')}>
              健康
            </Link>
          </li>
          <li>
            <Link href={`/mental-illness`} className={current('/mental-illness')}>
              精神疾患
            </Link>
          </li>
          <li>
            <Link href={`/medical-welfare-system`} className={current('/medical-welfare-system')}>
              医療福祉制度
            </Link>
          </li>
          <li>
            <Link
              href={`/brain-science-psychology`}
              className={current('/brain-science-psychology')}
            >
              脳科学・心理学
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
