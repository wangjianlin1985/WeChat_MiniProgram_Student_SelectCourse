package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class CourseSelect {
    /*记录id*/
    private Integer selectId;
    public Integer getSelectId(){
        return selectId;
    }
    public void setSelectId(Integer selectId){
        this.selectId = selectId;
    }

    /*选课学生*/
    private Student studentObj;
    public Student getStudentObj() {
        return studentObj;
    }
    public void setStudentObj(Student studentObj) {
        this.studentObj = studentObj;
    }

    /*选择课程*/
    private CourseInfo courseObj;
    public CourseInfo getCourseObj() {
        return courseObj;
    }
    public void setCourseObj(CourseInfo courseObj) {
        this.courseObj = courseObj;
    }

    /*选课时间*/
    @NotEmpty(message="选课时间不能为空")
    private String selectTime;
    public String getSelectTime() {
        return selectTime;
    }
    public void setSelectTime(String selectTime) {
        this.selectTime = selectTime;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonCourseSelect=new JSONObject(); 
		jsonCourseSelect.accumulate("selectId", this.getSelectId());
		jsonCourseSelect.accumulate("studentObj", this.getStudentObj().getStudentName());
		jsonCourseSelect.accumulate("studentObjPri", this.getStudentObj().getStudentNumber());
		jsonCourseSelect.accumulate("courseObj", this.getCourseObj().getCourseName());
		jsonCourseSelect.accumulate("courseObjPri", this.getCourseObj().getCourseNumber());
		jsonCourseSelect.accumulate("selectTime", this.getSelectTime().length()>19?this.getSelectTime().substring(0,19):this.getSelectTime());
		return jsonCourseSelect;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}