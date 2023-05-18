var utils = require("../../utils/common.js");
var config = require("../../utils/config.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryViewHidden: true, //是否隐藏查询条件界面
    classNumber: "", //班级编号查询关键字
    className: "", //班级名称查询关键字
    classSpecialFieldNumber: "", //所属专业查询关键字
    classBirthDate: "", //成立日期查询关键字
    classInfos: [], //界面显示的班级信息列表数据
    page_size: 8, //每页显示几条数据
    page: 1,  //当前要显示第几页
    totalPage: null, //总的页码数
    loading_hide: true, //是否隐藏加载动画
    nodata_hide: true, //是否隐藏没有数据记录提示
  },

  // 加载班级信息列表
  listClassInfo: function () {
    var self = this
    var url = config.basePath + "api/classInfo/list"
    //如果要显示的页码超过总页码不操作
    if(self.data.totalPage != null && self.data.page > self.data.totalPage) return
    self.setData({
      loading_hide: false,  //显示加载动画
    })
    //提交查询参数到服务器查询数据列表
    utils.sendRequest(url, {
      "classNumber": self.data.classNumber,
      "className": self.data.className,
      "classSpecialFieldNumber": self.data.classSpecialFieldNumber,
      "classBirthDate": self.data.classBirthDate,
      "page": self.data.page,
      "rows": self.data.page_size,
    }, function (res) { 
      wx.stopPullDownRefresh()
      setTimeout(function () {  
        self.setData({
          classInfos: self.data.classInfos.concat(res.data.list),
          totalPage: res.data.totalPage,
          loading_hide: true
        })
      }, 500)
      //如果当前显示的是最后一页，则显示没数据提示
      if(self.data.page == self.data.totalPage) {
        self.setData({
          nodata_hide: false,
        })
      }
    })
  },

  //显示或隐藏查询视图切换
  toggleQueryViewHide: function () {
    this.setData({
      queryViewHidden: !this.data.queryViewHidden,
    })
  },

  //点击查询按钮的事件
  queryClassInfo: function(e) {
    var self = this
    self.setData({
      page: 1,
      totalPage: null,
      classInfos: [],
      loading_hide: true, //隐藏加载动画
      nodata_hide: true, //隐藏没有数据记录提示 
      queryViewHidden: true, //隐藏查询视图
    })
    self.listClassInfo()
  },

  //查询参数成立日期选择事件
  bind_classBirthDate_change: function (e) {
    this.setData({
      classBirthDate: e.detail.value
    })
  },
  //清空查询参数成立日期
  clear_classBirthDate: function (e) {
    this.setData({
      classBirthDate: "",
    })
  },

  //绑定查询参数输入事件
  searchValueInput: function (e) {
    var id = e.target.dataset.id
    if (id == "classNumber") {
      this.setData({
        "classNumber": e.detail.value,
      })
    }

    if (id == "className") {
      this.setData({
        "className": e.detail.value,
      })
    }

    if (id == "classSpecialFieldNumber") {
      this.setData({
        "classSpecialFieldNumber": e.detail.value,
      })
    }

  },

  init_query_params: function() { 
    var self = this
    var url = null
  },

  //删除班级信息记录
  removeClassInfo: function (e) {
    var self = this
    var classNumber = e.currentTarget.dataset.classnumber
    wx.showModal({
      title: '提示',
      content: '确定要删除classNumber=' + classNumber + '的记录吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var url = config.basePath + "api/classInfo/delete/" + classNumber
          utils.sendRequest(url, null, function (res) {
            wx.stopPullDownRefresh();
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 500
            })
            //删除班级信息后客户端同步删除数据
            var classInfos = self.data.classInfos;
            for (var i = 0; i < classInfos.length; i++) {
              if (classInfos[i].classNumber == classNumber) {
                classInfos.splice(i, 1)
                break
              }
            }
            self.setData({ classInfos: classInfos })
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listClassInfo()
    this.init_query_params()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var self = this
    self.setData({
      page: 1,  //显示最新的第1页结果
      classInfos: [], //清空班级信息数据
      nodata_hide: true, //隐藏没数据提示
    })
    self.listClassInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    if (self.data.page < self.data.totalPage) {
      self.setData({
        page: self.data.page + 1, 
      })
      self.listClassInfo()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})

