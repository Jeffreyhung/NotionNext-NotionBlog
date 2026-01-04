import fs from 'fs/promises'
import path from 'path'

// 文件缓存持续10秒
const cacheInvalidSeconds = 1000000000 * 1000
// 文件名
const jsonFile = path.resolve('./data.json')

export async function getCache (key) {
  try {
    await fs.access(jsonFile)
  } catch (error) {
    return null
  }
  
  let data
  try {
    data = await fs.readFile(jsonFile, 'utf8')
  } catch (error) {
    console.error('读取JSON缓存文件失败', error)
    return null
  }
  
  if (!data) return null
  
  let json = null
  try {
    json = JSON.parse(data)
  } catch (error) {
    console.error('解析JSON缓存文件失败', error)
    return null
  }
  
  // 缓存超过有效期就作废
  const cacheValidTime = new Date(parseInt(json[key + '_expire_time']) + cacheInvalidSeconds)
  const currentTime = new Date()
  if (!cacheValidTime || cacheValidTime < currentTime) {
    return null
  }
  return json[key]
}

/**
 * 并发请求写文件异常； Vercel生产环境不支持写文件。
 * @param key
 * @param data
 * @returns {Promise<null>}
 */
export async function setCache (key, data) {
  let json = {}
  try {
    await fs.access(jsonFile)
    const fileData = await fs.readFile(jsonFile, 'utf8')
    json = JSON.parse(fileData)
  } catch (error) {
    // File doesn't exist or can't be read, start with empty object
    json = {}
  }
  
  json[key] = data
  json[key + '_expire_time'] = new Date().getTime()
  
  try {
    await fs.writeFile(jsonFile, JSON.stringify(json), 'utf8')
  } catch (error) {
    console.error('写入JSON缓存文件失败', error)
  }
}

export async function delCache (key, data) {
  let json = {}
  try {
    await fs.access(jsonFile)
    const fileData = await fs.readFile(jsonFile, 'utf8')
    json = JSON.parse(fileData)
  } catch (error) {
    // File doesn't exist or can't be read, nothing to delete
    return
  }
  
  delete json[key]
  json[key + '_expire_time'] = new Date().getTime()
  
  try {
    await fs.writeFile(jsonFile, JSON.stringify(json), 'utf8')
  } catch (error) {
    console.error('写入JSON缓存文件失败', error)
  }
}

export default { getCache, setCache, delCache }
