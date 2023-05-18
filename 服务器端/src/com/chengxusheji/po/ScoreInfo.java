package com.chengxusheji.po;

import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.NotEmpty;
import org.json.JSONException;
import org.json.JSONObject;
import com.client.utils.JsonUtils;
import com.client.utils.SessionConsts;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ScoreInfo {
    /*记录编号*/
    private Integer scoreId;
    public Integer getScoreId(){
        return scoreId;
    }
    public void setScoreId(Integer scoreId){
        this.scoreId = scoreId;
    }

    /*学生*/
    private Student studentObj;
    public Student getStudentObj() {
        return studentObj;
    }
    public void setStudentObj(Student studentObj) {
        this.studentObj = studentObj;
    }

    /*课程*/
    private CourseInfo courseObj;
    public CourseInfo getCourseObj() {
        return courseObj;
    }
    public void setCourseObj(CourseInfo courseObj) {
        this.courseObj = courseObj;
    }

    /*成绩得分*/
    @NotNull(message="必须输入成绩得分")
    private Float scoreValue;
    public Float getScoreValue() {
        return scoreValue;
    }
    public void setScoreValue(Float scoreValue) {
        this.scoreValue = scoreValue;
    }

    /*学生评价*/
    private String studentEvaluate;
    public String getStudentEvaluate() {
        return studentEvaluate;
    }
    public void setStudentEvaluate(String studentEvaluate) {
        this.studentEvaluate = studentEvaluate;
    }

    @JsonIgnore
    public JSONObject getJsonObject() throws JSONException {
    	JSONObject jsonScoreInfo=new JSONObject(); 
		jsonScoreInfo.accumulate("scoreId", this.getScoreId());
		jsonScoreInfo.accumulate("studentObj", this.getStudentObj().getStudentName());
		jsonScoreInfo.accumulate("studentObjPri", this.getStudentObj().getStudentNumber());
		jsonScoreInfo.accumulate("courseObj", this.getCourseObj().getCourseName());
		jsonScoreInfo.accumulate("courseObjPri", this.getCourseObj().getCourseNumber());
		jsonScoreInfo.accumulate("scoreValue", this.getScoreValue());
		jsonScoreInfo.accumulate("studentEvaluate", this.getStudentEvaluate());
		return jsonScoreInfo;
    }

    @Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}