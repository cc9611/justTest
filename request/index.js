/* P54 */
let ajaxTime = 0;
export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        ajaxTime++;
        /* 在请求之前添加正在加载图标 */
        wx.showLoading({
            title:'不要着急嘛',
            mask:true
        });
        const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1';
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success: (result)=>{
                resolve(result.data.message);
            },
            fail: (err)=>{
                reject(err);
            },
            /* 请求完成之后隐藏加载图标 */
            complete: ()=>{
                ajaxTime--;
                if (ajaxTime===0) {
                    wx.hideLoading();
                }
            }
        });
    })
}