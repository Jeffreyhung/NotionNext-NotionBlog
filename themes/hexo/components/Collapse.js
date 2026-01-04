import React, { useEffect, useRef } from 'react'

const Collapse = ({ id, className, isOpen = false, children }) => {
  const collapseRef = useRef(null)
  const collapseSection = element => {
    const sectionHeight = element.scrollHeight
    const currentHeight = element.style.height
    if (currentHeight === '0px') {
      return
    }
    requestAnimationFrame(function () {
      element.style.height = sectionHeight + 'px'
      requestAnimationFrame(function () {
        element.style.height = 0 + 'px'
      })
    })
  }
  const expandSection = element => {
    const sectionHeight = element.scrollHeight
    element.style.height = sectionHeight + 'px'
    const clearTime = setTimeout(() => {
      element.style.height = 'auto'
    }, 400)
    clearTimeout(clearTime)
  }
  useEffect(() => {
    const element = collapseRef.current
    if (isOpen) {
      expandSection(element)
    } else {
      collapseSection(element)
    }
  }, [isOpen])
  return (
    <div id={id} ref={collapseRef} style={{ height: '0px' }} className={'overflow-hidden duration-200 ' + className}>
      {children}
    </div>
  )
}

export default Collapse
