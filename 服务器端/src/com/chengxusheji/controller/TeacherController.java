package com.chengxusheji.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.chengxusheji.utils.ExportExcelUtil;
import com.chengxusheji.utils.UserException;
import com.chengxusheji.service.TeacherService;
import com.chengxusheji.po.Teacher;

//Teacher管理控制层
@Controller
@RequestMapping("/Teacher")
public class TeacherController extends BaseController {

    /*业务层对象*/
    @Resource TeacherService teacherService;

	@InitBinder("teacher")
	public void initBinderTeacher(WebDataBinder binder) {
		binder.setFieldDefaultPrefix("teacher.");
	}
	/*跳转到添加Teacher视图*/
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Model model,HttpServletRequest request) throws Exception {
		model.addAttribute(new Teacher());
		return "Teacher_add";
	}

	/*客户端ajax方式提交添加教师信息信息*/
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public void add(@Validated Teacher teacher, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
		boolean success = false;
		if (br.hasErrors()) {
			message = "输入信息不符合要求！";
			writeJsonResponse(response, success, message);
			return ;
		}
		if(teacherService.getTeacher(teacher.getTeacherNumber()) != null) {
			message = "教师编号已经存在！";
			writeJsonResponse(response, success, message);
			return ;
		}
		try {
			teacher.setTeacherPhoto(this.handlePhotoUpload(request, "teacherPhotoFile"));
		} catch(UserException ex) {
			message = "图片格式不正确！";
			writeJsonResponse(response, success, message);
			return ;
		}
        teacherService.addTeacher(teacher);
        message = "教师信息添加成功!";
        success = true;
        writeJsonResponse(response, success, message);
	}
	/*ajax方式按照查询条件分页查询教师信息信息*/
	@RequestMapping(value = { "/list" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void list(String teacherNumber,String teacherName,String teacherBirthday,String teacherArriveDate,Integer page,Integer rows, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		if (page==null || page == 0) page = 1;
		if (teacherNumber == null) teacherNumber = "";
		if (teacherName == null) teacherName = "";
		if (teacherBirthday == null) teacherBirthday = "";
		if (teacherArriveDate == null) teacherArriveDate = "";
		if(rows != 0)teacherService.setRows(rows);
		List<Teacher> teacherList = teacherService.queryTeacher(teacherNumber, teacherName, teacherBirthday, teacherArriveDate, page);
	    /*计算总的页数和总的记录数*/
	    teacherService.queryTotalPageAndRecordNumber(teacherNumber, teacherName, teacherBirthday, teacherArriveDate);
	    /*获取到总的页码数目*/
	    int totalPage = teacherService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = teacherService.getRecordNumber();
        response.setContentType("text/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象
		JSONObject jsonObj=new JSONObject();
		jsonObj.accumulate("total", recordNumber);
		JSONArray jsonArray = new JSONArray();
		for(Teacher teacher:teacherList) {
			JSONObject jsonTeacher = teacher.getJsonObject();
			jsonArray.put(jsonTeacher);
		}
		jsonObj.accumulate("rows", jsonArray);
		out.println(jsonObj.toString());
		out.flush();
		out.close();
	}

	/*ajax方式按照查询条件分页查询教师信息信息*/
	@RequestMapping(value = { "/listAll" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void listAll(HttpServletResponse response) throws Exception {
		List<Teacher> teacherList = teacherService.queryAllTeacher();
        response.setContentType("text/json;charset=UTF-8"); 
		PrintWriter out = response.getWriter();
		JSONArray jsonArray = new JSONArray();
		for(Teacher teacher:teacherList) {
			JSONObject jsonTeacher = new JSONObject();
			jsonTeacher.accumulate("teacherNumber", teacher.getTeacherNumber());
			jsonTeacher.accumulate("teacherName", teacher.getTeacherName());
			jsonArray.put(jsonTeacher);
		}
		out.println(jsonArray.toString());
		out.flush();
		out.close();
	}

	/*前台按照查询条件分页查询教师信息信息*/
	@RequestMapping(value = { "/frontlist" }, method = {RequestMethod.GET,RequestMethod.POST})
	public String frontlist(String teacherNumber,String teacherName,String teacherBirthday,String teacherArriveDate,Integer currentPage, Model model, HttpServletRequest request) throws Exception  {
		if (currentPage==null || currentPage == 0) currentPage = 1;
		if (teacherNumber == null) teacherNumber = "";
		if (teacherName == null) teacherName = "";
		if (teacherBirthday == null) teacherBirthday = "";
		if (teacherArriveDate == null) teacherArriveDate = "";
		List<Teacher> teacherList = teacherService.queryTeacher(teacherNumber, teacherName, teacherBirthday, teacherArriveDate, currentPage);
	    /*计算总的页数和总的记录数*/
	    teacherService.queryTotalPageAndRecordNumber(teacherNumber, teacherName, teacherBirthday, teacherArriveDate);
	    /*获取到总的页码数目*/
	    int totalPage = teacherService.getTotalPage();
	    /*当前查询条件下总记录数*/
	    int recordNumber = teacherService.getRecordNumber();
	    request.setAttribute("teacherList",  teacherList);
	    request.setAttribute("totalPage", totalPage);
	    request.setAttribute("recordNumber", recordNumber);
	    request.setAttribute("currentPage", currentPage);
	    request.setAttribute("teacherNumber", teacherNumber);
	    request.setAttribute("teacherName", teacherName);
	    request.setAttribute("teacherBirthday", teacherBirthday);
	    request.setAttribute("teacherArriveDate", teacherArriveDate);
		return "Teacher/teacher_frontquery_result"; 
	}

     /*前台查询Teacher信息*/
	@RequestMapping(value="/{teacherNumber}/frontshow",method=RequestMethod.GET)
	public String frontshow(@PathVariable String teacherNumber,Model model,HttpServletRequest request) throws Exception {
		/*根据主键teacherNumber获取Teacher对象*/
        Teacher teacher = teacherService.getTeacher(teacherNumber);

        request.setAttribute("teacher",  teacher);
        return "Teacher/teacher_frontshow";
	}

	/*ajax方式显示教师信息修改jsp视图页*/
	@RequestMapping(value="/{teacherNumber}/update",method=RequestMethod.GET)
	public void update(@PathVariable String teacherNumber,Model model,HttpServletRequest request,HttpServletResponse response) throws Exception {
        /*根据主键teacherNumber获取Teacher对象*/
        Teacher teacher = teacherService.getTeacher(teacherNumber);

        response.setContentType("text/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
		//将要被返回到客户端的对象 
		JSONObject jsonTeacher = teacher.getJsonObject();
		out.println(jsonTeacher.toString());
		out.flush();
		out.close();
	}

	/*ajax方式更新教师信息信息*/
	@RequestMapping(value = "/{teacherNumber}/update", method = RequestMethod.POST)
	public void update(@Validated Teacher teacher, BindingResult br,
			Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
		String message = "";
    	boolean success = false;
		if (br.hasErrors()) { 
			message = "输入的信息有错误！";
			writeJsonResponse(response, success, message);
			return;
		}
		String teacherPhotoFileName = this.handlePhotoUpload(request, "teacherPhotoFile");
		if(!teacherPhotoFileName.equals("upload/NoImage.jpg"))teacher.setTeacherPhoto(teacherPhotoFileName); 


		try {
			teacherService.updateTeacher(teacher);
			message = "教师信息更新成功!";
			success = true;
			writeJsonResponse(response, success, message);
		} catch (Exception e) {
			e.printStackTrace();
			message = "教师信息更新失败!";
			writeJsonResponse(response, success, message); 
		}
	}
    /*删除教师信息信息*/
	@RequestMapping(value="/{teacherNumber}/delete",method=RequestMethod.GET)
	public String delete(@PathVariable String teacherNumber,HttpServletRequest request) throws UnsupportedEncodingException {
		  try {
			  teacherService.deleteTeacher(teacherNumber);
	            request.setAttribute("message", "教师信息删除成功!");
	            return "message";
	        } catch (Exception e) { 
	            e.printStackTrace();
	            request.setAttribute("error", "教师信息删除失败!");
				return "error";

	        }

	}

	/*ajax方式删除多条教师信息记录*/
	@RequestMapping(value="/deletes",method=RequestMethod.POST)
	public void delete(String teacherNumbers,HttpServletRequest request,HttpServletResponse response) throws IOException, JSONException {
		String message = "";
    	boolean success = false;
        try { 
        	int count = teacherService.deleteTeachers(teacherNumbers);
        	success = true;
        	message = count + "条记录删除成功";
        	writeJsonResponse(response, success, message);
        } catch (Exception e) { 
            //e.printStackTrace();
            message = "有记录存在外键约束,删除失败";
            writeJsonResponse(response, success, message);
        }
	}

	/*按照查询条件导出教师信息信息到Excel*/
	@RequestMapping(value = { "/OutToExcel" }, method = {RequestMethod.GET,RequestMethod.POST})
	public void OutToExcel(String teacherNumber,String teacherName,String teacherBirthday,String teacherArriveDate, Model model, HttpServletRequest request,HttpServletResponse response) throws Exception {
        if(teacherNumber == null) teacherNumber = "";
        if(teacherName == null) teacherName = "";
        if(teacherBirthday == null) teacherBirthday = "";
        if(teacherArriveDate == null) teacherArriveDate = "";
        List<Teacher> teacherList = teacherService.queryTeacher(teacherNumber,teacherName,teacherBirthday,teacherArriveDate);
        ExportExcelUtil ex = new ExportExcelUtil();
        String _title = "Teacher信息记录"; 
        String[] headers = { "教师编号","教师姓名","性别","出生日期","入职日期","联系电话","教师照片"};
        List<String[]> dataset = new ArrayList<String[]>(); 
        for(int i=0;i<teacherList.size();i++) {
        	Teacher teacher = teacherList.get(i); 
        	dataset.add(new String[]{teacher.getTeacherNumber(),teacher.getTeacherName(),teacher.getTeacherSex(),teacher.getTeacherBirthday(),teacher.getTeacherArriveDate(),teacher.getTeacherPhone(),teacher.getTeacherPhoto()});
        }
        /*
        OutputStream out = null;
		try {
			out = new FileOutputStream("C://output.xls");
			ex.exportExcel(title,headers, dataset, out);
		    out.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		*/
		OutputStream out = null;//创建一个输出流对象 
		try { 
			out = response.getOutputStream();//
			response.setHeader("Content-disposition","attachment; filename="+"Teacher.xls");//filename是下载的xls的名，建议最好用英文 
			response.setContentType("application/msexcel;charset=UTF-8");//设置类型 
			response.setHeader("Pragma","No-cache");//设置头 
			response.setHeader("Cache-Control","no-cache");//设置头 
			response.setDateHeader("Expires", 0);//设置日期头  
			String rootPath = request.getSession().getServletContext().getRealPath("/");
			ex.exportExcel(rootPath,_title,headers, dataset, out);
			out.flush();
		} catch (IOException e) { 
			e.printStackTrace(); 
		}finally{
			try{
				if(out!=null){ 
					out.close(); 
				}
			}catch(IOException e){ 
				e.printStackTrace(); 
			} 
		}
    }
}
