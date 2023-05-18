var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    teacherNumber: "", //教师编号
    teacherName: "", //教师姓名
    teacherSex: "", //性别
    teacherBirthday: "", //出生日期
    teacherArriveDate: "", //入职日期
    teacherCardNumber: "", //身份证号
    teacherPhone: "", //联系电话
    teacherPhoto: "upload/NoImage.jpg", //教师照片
    teacherPhotoList: [],
    teacherAddress: "", //家庭地址
    teacherMemo: "", //附加信息
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //选择出生日期
  bind_teacherBirthday_change: function (e) {
    this.setData({
      teacherBirthday: e.detail.value
    })
  },
  //清空出生日期
  clear_teacherBirthday: function (e) {
    this.setData({
      teacherBirthday: "",
    });
  },

  //选择入职日期
  bind_teacherArriveDate_change: function (e) {
    this.setData({
      teacherArriveDate: e.detail.value
    })
  },
  //清空入职日期
  clear_teacherArriveDate: function (e) {
    this.setData({
      teacherArriveDate: "",
    });
  },

  /*提交添加教师信息到服务器 */
  formSubmit: function (e) {
    var self = this;
    var formData = e.detail.value;
    var url = config.basePath + "api/teacher/add";
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 500
      })

      //提交成功后重置表单数据
      self.setData({
        teacherNumber: "",
    teacherName: "",
    teacherSex: "",
    teacherBirthday: "",
    teacherArriveDate: "",
    teacherCardNumber: "",
    teacherPhone: "",
        teacherPhoto: "upload/NoImage.jpg",
        teacherPhotoList: [],
    teacherAddress: "",
    teacherMemo: "",
        loadingHide: true,
        loadingText: "网络操作中。。",
      })
    });
  },

  //选择教师照片上传
  select_teacherPhoto: function (e) {
    var self = this
    wx.chooseImage({
      count: 1,   //可以上传一张图片
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        self.setData({
          teacherPhotoList: tempFilePaths,
          loadingHide: false
        });
        utils.sendUploadImage(config.basePath + "upload/image", tempFilePaths[0], function (res) {
          wx.stopPullDownRefresh()
          setTimeout(function () {
            self.setData({
              teacherPhoto: res.data,
              loadingHide: true
            });
          }, 200);
        });
      }
    })
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

