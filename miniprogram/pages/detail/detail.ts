// pages/detail/detail.ts
import { getMedicineInfoById, selectOperateById } from "../../api/medicine"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    medicine_data: "",
    operate_id: [],
    operate_mouth: [],
    operate_detail: [],
    data: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opition: any) {
    getMedicineInfoById({ id: opition.id }).then(res => {
      this.setData({
        medicine_data: res.data.data[0],
        operate_id: JSON.parse(res.data.data[0].operate_id),
        operate_mouth: JSON.parse(res.data.data[0].operate_mouth)
      })
    }).then(() => {
      function getOperateData(operate_ids: any[]) {
        let data: any[] = [];
        operate_ids.forEach((item: any) => {
          data.push(selectOperateById({ operate_id: item }));
        });
        return data;
      }
      Promise.all(getOperateData(this.data.operate_id)).then((values: any) => {
        this.setData({ operate_detail: values});
      });
    })
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
    // console.log(this.data.operate_id);

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
})