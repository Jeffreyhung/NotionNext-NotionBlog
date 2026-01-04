import React from 'react'

/**
 * 折叠面板组件，支持水平折叠、垂直折叠
 * @param {type:['horizontal','vertical'],isOpen} props
 * @returns
 */
const Collapse = ({ type = 'vertical', isOpen = false, className = '', children }) => {
  const collapseRef = React.useRef(null)
  const collapseSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth

    requestAnimationFrame(function () {
      switch (type) {
        case 'horizontal':
          element.style.width = sectionWidth + 'px'
          requestAnimationFrame(function () {
            element.style.width = 0 + 'px'
          })
          break
        case 'vertical':
          element.style.height = sectionHeight + 'px'
          requestAnimationFrame(function () {
            element.style.height = 0 + 'px'
          })
      }
    })
  }

  /**
   * 展开
   * @param {*} element
   */
  const expandSection = element => {
    const sectionHeight = element.scrollHeight
    const sectionWidth = element.scrollWidth
    let clearTime = 0
    switch (type) {
      case 'horizontal':
        element.style.width = sectionWidth + 'px'
        clearTime = setTimeout(() => {
          element.style.width = 'auto'
        }, 400)
        break
      case 'vertical':
        element.style.height = sectionHeight + 'px'
        clearTime = setTimeout(() => {
          element.style.height = 'auto'
        }, 400)
    }

    clearTimeout(clearTime)
  }

  React.useEffect(() => {
    const element = collapseRef.current
    if (isOpen) {
      expandSection(element)
    } else {
      collapseSection(element)
    }
  }, [isOpen, type])

  return (
    <div ref={collapseRef} style={type === 'vertical' ? { height: '0px' } : { width: '0px' }} className={'overflow-hidden duration-200 ' + className}>
      {children}
    </div>
  )
}

export default Collapse
