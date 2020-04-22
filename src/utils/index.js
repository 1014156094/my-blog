/**
 * 获取网址参数
 * @param {String} url 网址
 * @return {Object} 参数对象，如：{ name: 'Adam', surname: 'Smith' }
 */
export const getURLParams = url => {
    const params = url.match(/([^?=&]+)(=([^&]*))/g) // 获得所有的键值对
    
    return params ? params.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}) : null // 映射和组合成一个单一的对象
}