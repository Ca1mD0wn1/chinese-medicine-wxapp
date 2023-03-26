// pages/login/login.ts
import { userLogin } from '../../api/user'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "user1",
    password: "user1",
    level: "",
    token: "",
    checkCode: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  login() {
    userLogin({ username: this.data.username, password: this.data.password }).then(res => {
      console.log(res.data.code);

      if (res.data.code == "200") {
        wx.setStorageSync(
          "user", {
          username: this.data.username,
          token: res.data.data.token,
          nickName: res.data.data.nickname
        })
        wx.switchTab({ url: "/pages/home/home" })

      } else {
        console.log("账号或者密码错误");
      }
    })
  }
})