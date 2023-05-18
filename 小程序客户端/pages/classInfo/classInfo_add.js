var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

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

  //选择成立日期
  bind_classBirthDate_change: function (e) {
    this.setData({
      classBirthDate: e.detail.value
    })
  },
  //清空成立日期
  clear_classBirthDate: function (e) {
    this.setData({
      classBirthDate: "",
    });
  },

  /*提交添加班级信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/classInfo/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        classNumber: "",
    className: "",
    classSpecialFieldNumber: "",
    classBirthDate: "",
    classTeacherCharge: "",
    classTelephone: "",
    classMemo: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync('authToken');
    if (!token) {
      wx.navigateTo({
        url: '../mobile/mobile',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})

