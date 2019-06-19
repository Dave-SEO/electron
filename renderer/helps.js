exports.$ = (id)=>{
    return document.getElementById(id)
}
exports.cordtime = (time) =>{
    /**
     * time 单位是秒
     */
    // 计算分钟
    const min = '0' + Math.floor(time / 60)
    // 计算剩余秒数
    const s = '0' + Math.floor(time - min * 60)
    return min.substr(-2) +':'+ s.substr(-2)
}