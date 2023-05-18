var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classNumber: "", //班级编号
    className: "", //班级名称
    classSpecialFieldNumber: "", //所属专业
    classBirthDate: "", //成立日期
    classTeacherCharge: "", //班主任
    classTelephone: "", //联系电话
    classMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择成立日期事件
  bind_classBirthDate_change: function (e) {
    this.setData({
      classBirthDate: e.detail.value
    })
  },
  //清空成立日期事件
  clear_classBirthDate: function (e) {
    this.setData({
      classBirthDate: "",
    });
  },

  //提交服务器修改班级信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/classInfo/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var classInfolist_page = pages[pages.length - 2];
      var classInfos = classInfolist_page.data.classInfos
      for(var i=0;i<classInfos.length;i++) {
        if(classInfos[i].classNumber == res.data.classNumber) {
          classInfos[i] = res.data
          break
        }
      }
      classInfolist_page.setData({classInfos:classInfos})
      setTimeout(function () {
        wx.navigateBack({})
      }, 500) 
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var classNumber = params.classNumber
    var url = config.basePath + "api/classInfo/get/" + classNumber
    utils.sendRequest(url, {}, function (classInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        classNumber: classInfoRes.data.classNumber,
        className: classInfoRes.data.className,
        classSpecialFieldNumber: classInfoRes.data.classSpecialFieldNumber,
        classBirthDate: classInfoRes.data.classBirthDate,
        classTeacherCharge: classInfoRes.data.classTeacherCharge,
        classTelephone: classInfoRes.data.classTelephone,
        classMemo: classInfoRes.data.classMemo,
      })

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

})

