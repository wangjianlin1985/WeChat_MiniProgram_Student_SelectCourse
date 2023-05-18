var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsId: 0, //记录编号
    newsTitle: "", //新闻标题
    newsContent: "", //新闻内容
    newsDate: "", //发布日期
    newsPhotoUrl: "", //新闻图片
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (params) {
    var self = this
    var newsId = params.newsId
    var url = config.basePath + "api/news/get/" + newsId
    utils.sendRequest(url, {}, function (newsRes) {
      wx.stopPullDownRefresh()
      self.setData({
        newsId: newsRes.data.newsId,
        newsTitle: newsRes.data.newsTitle,
        newsContent: newsRes.data.newsContent,
        newsDate: newsRes.data.newsDate,
        newsPhoto: newsRes.data.newsPhoto,
        newsPhotoUrl: newsRes.data.newsPhotoUrl,
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  }

})

