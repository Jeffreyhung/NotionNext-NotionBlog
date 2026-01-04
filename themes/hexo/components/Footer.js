import React from 'react'
import BLOG from '@/blog.config'
import DarkModeButton from '@/components/DarkModeButton'
import { useGlobal } from '@/lib/global'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function() {
    if (Number.isInteger(BLOG.SINCE) && BLOG.SINCE < currentYear) {
      return BLOG.SINCE + '-' + currentYear
    }
    return currentYear
  })()
  const { locale } = useGlobal()

  return (
    <footer
      className=' dark:bg-black flex-shrink-0 bg-hexo-light-gray justify-center text-center m-auto w-full leading-6  text-gray-600 dark:text-gray-100 text-sm p-6'
    >
      <div className="flex flex-col items-center space-y-2">
        <DarkModeButton/>
        
        <div className="flex flex-wrap justify-center items-center space-x-2">
          <span>© {copyrightDate}</span>
          <span className="mx-2">|</span>
          <span>{title || BLOG.TITLE}</span>
          {BLOG.AUTHOR && (
            <>
              <span className="mx-2">|</span>
              <span>{locale.COMMON.AUTHOR}: {BLOG.AUTHOR}</span>
            </>
          )}
        </div>
        
        {BLOG.BEI_AN && (
          <div className="text-xs">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              {BLOG.BEI_AN}
            </a>
          </div>
        )}
        
        {BLOG.CONTACT_GITHUB && (
          <div className="text-xs">
            <a href={BLOG.CONTACT_GITHUB} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
              <i className="fab fa-github mr-1" />
              GitHub
            </a>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer
