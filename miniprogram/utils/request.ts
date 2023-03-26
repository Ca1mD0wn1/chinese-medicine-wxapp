interface AnyResult extends WechatMiniprogram.RequestSuccessCallbackResult {
  data: any
}
// 从中间类型继承一个泛型接口，data声明为泛型
export interface SpecResult<T> extends AnyResult {
  data: T
}
// 声明业务数据类型
export interface IMyData {
  code: string
  msg: string
  data?: any
}

export default function request(config: WechatMiniprogram.RequestOption) {
  // 显示loading动画
  wx.showLoading({
    title: '加载中'
  })
  // let token = wx.getStorage({ key: "user" })
  
  let header = {
    authorization: wx.getStorageSync("user")["token"]
  }
  const { url, data, method, } = config
  // Promise<SpecResult<IMyData>> 声明resolve参数的数据类型
  return new Promise<SpecResult<IMyData>>((resolve, reject) => {
    wx.request({
      url: 'http://192.168.1.108:3000/' + url,
      method,
      data,
      header,
      success: (res: SpecResult<IMyData>) => {

        if (res.data.code == "401") {
          wx.navigateTo({
            url: "/pages/login/login"
          })
        }
        resolve(res)
      },
      fail: () => {
        reject()
      },
      complete: () => {
        // 取消loading动画
        wx.hideLoading()
      }
    })
  })
}