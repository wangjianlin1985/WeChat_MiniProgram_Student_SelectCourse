package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class CourseInfo {
    /*课程编号*/
    @NotEmpty(message="课程编号不能为空")
    private String courseNumber;
    public String getCourseNumber(){
        return courseNumber;
    }
    public void setCourseNumber(String courseNumber){
        this.courseNumber = courseNumber;
    }

    /*课程名称*/
    @NotEmpty(message="课程名称不能为空")
    private String courseName;
    public String getCourseName() {
        return courseName;
    }
    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    /*上课老师*/
    private Teacher teacherObj;
    public Teacher getTeacherObj() {
        return teacherObj;
    }
    public void setTeacherObj(Teacher teacherObj) {
        this.teacherObj = teacherObj;
    }

    /*上课时间*/
    private String courseTime;
    public String getCourseTime() {
        return courseTime;
    }
    public void setCourseTime(String courseTime) {
        this.courseTime = courseTime;
    }

    /*上课地点*/
    private String coursePlace;
    public String getCoursePlace() {
        return coursePlace;
    }
    public void setCoursePlace(String coursePlace) {
        this.coursePlace = coursePlace;
    }

    /*课程学分*/
    @NotNull(message="必须输入课程学分")
    private Float courseScore;
    public Float getCourseScore() {
        return courseScore;
    }
    public void setCourseScore(Float courseScore) {
        this.courseScore = courseScore;
    }

    /*附加信息*/
    private String courseMemo;
    public String getCourseMemo() {
        return courseMemo;
    }
    public void setCourseMemo(String courseMemo) {
        this.courseMemo = courseMemo;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonCourseInfo=new JSONObject(); 
		jsonCourseInfo.accumulate("courseNumber", this.getCourseNumber());
		jsonCourseInfo.accumulate("courseName", this.getCourseName());
		jsonCourseInfo.accumulate("teacherObj", this.getTeacherObj().getTeacherName());
		jsonCourseInfo.accumulate("teacherObjPri", this.getTeacherObj().getTeacherNumber());
		jsonCourseInfo.accumulate("courseTime", this.getCourseTime());
		jsonCourseInfo.accumulate("coursePlace", this.getCoursePlace());
		jsonCourseInfo.accumulate("courseScore", this.getCourseScore());
		jsonCourseInfo.accumulate("courseMemo", this.getCourseMemo());
		return jsonCourseInfo;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}