var utils = require("../../utils/common.js")
var config = require("../../utils/config.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scoreId: 0, //记录编号
    studentObj_Index: "0", //学生
    students: [],
    courseObj_Index: "0", //课程
    courseInfos: [],
    scoreValue: "", //成绩得分
    studentEvaluate: "", //学生评价
    loadingHide: true,
    loadingText: "网络操作中。。",
  },

  //课程修改事件
  bind_courseObj_change: function (e) {
    this.setData({
      courseObj_Index: e.detail.value
    })
  },

  //学生修改事件
  bind_studentObj_change: function (e) {
    this.setData({
      studentObj_Index: e.detail.value
    })
  },

  //提交服务器修改成绩信息信息
  formSubmit: function (e) {
    var self = this
    var formData = e.detail.value
    var url = config.basePath + "api/scoreInfo/update"
    utils.sendRequest(url, formData, function (res) {
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 500
      })

      //服务器修改成功返回列表页更新显示为最新的数据
      var pages = getCurrentPages()
      var scoreInfolist_page = pages[pages.length - 2];
      var scoreInfos = scoreInfolist_page.data.scoreInfos
      for(var i=0;i<scoreInfos.length;i++) {
        if(scoreInfos[i].scoreId == res.data.scoreId) {
          scoreInfos[i] = res.data
          break
        }
      }
      scoreInfolist_page.setData({scoreInfos:scoreInfos})
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
    var scoreId = params.scoreId
    var url = config.basePath + "api/scoreInfo/get/" + scoreId
    utils.sendRequest(url, {}, function (scoreInfoRes) {
      wx.stopPullDownRefresh()
      self.setData({
        scoreId: scoreInfoRes.data.scoreId,
        studentObj_Index: 1,
        courseObj_Index: 1,
        scoreValue: scoreInfoRes.data.scoreValue,
        studentEvaluate: scoreInfoRes.data.studentEvaluate,
      })

      var courseInfoUrl = config.basePath + "api/courseInfo/listAll" 
      utils.sendRequest(courseInfoUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          courseInfos: res.data,
        })
        for (var i = 0; i < self.data.courseInfos.length; i++) {
          if (scoreInfoRes.data.courseObj.courseNumber == self.data.courseInfos[i].courseNumber) {
            self.setData({
              courseObj_Index: i,
            });
            break;
          }
        }
      })
      var studentUrl = config.basePath + "api/student/listAll" 
      utils.sendRequest(studentUrl, null, function (res) {
        wx.stopPullDownRefresh()
        self.setData({
          students: res.data,
        })
        for (var i = 0; i < self.data.students.length; i++) {
          if (scoreInfoRes.data.studentObj.studentNumber == self.data.students[i].studentNumber) {
            self.setData({
              studentObj_Index: i,
            });
            break;
          }
        }
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

