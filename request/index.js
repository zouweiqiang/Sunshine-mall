export const request = (params) => {
  //定义公共URL
  const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise(function (resolve,reject){
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result) =>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}