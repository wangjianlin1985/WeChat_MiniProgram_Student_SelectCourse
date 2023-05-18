<%@ page language="java"  contentType="text/html;charset=UTF-8"%>
<jsp:include page="../check_logstate.jsp"/> 
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/student.css" /> 

<div id="student_manage"></div>
<div id="student_manage_tool" style="padding:5px;">
	<div style="margin-bottom:5px;">
		<a href="#" class="easyui-linkbutton" iconCls="icon-edit-new" plain="true" onclick="student_manage_tool.edit();">修改</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-delete-new" plain="true" onclick="student_manage_tool.remove();">删除</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-reload" plain="true"  onclick="student_manage_tool.reload();">刷新</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-redo" plain="true" onclick="student_manage_tool.redo();">取消选择</a>
		<a href="#" class="easyui-linkbutton" iconCls="icon-export" plain="true" onclick="student_manage_tool.exportExcel();">导出到excel</a>
	</div>
	<div style="padding:0 0 0 7px;color:#333;">
		<form id="studentQueryForm" method="post">
			学号：<input type="text" class="textbox" id="studentNumber" name="studentNumber" style="width:110px" />
			姓名：<input type="text" class="textbox" id="studentName" name="studentName" style="width:110px" />
			所在班级：<input class="textbox" type="text" id="classObj_classNumber_query" name="classObj.classNumber" style="width: auto"/>
			出生日期：<input type="text" id="studentBirthday" name="studentBirthday" class="easyui-datebox" editable="false" style="width:100px">
			<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="student_manage_tool.search();">查询</a>
		</form>	
	</div>
</div>

<div id="studentEditDiv">
	<form id="studentEditForm" enctype="multipart/form-data"  method="post">
		<div>
			<span class="label">学号:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentNumber_edit" name="student.studentNumber" style="width:200px" />
			</span>
		</div>
		<div>
			<span class="label">姓名:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentName_edit" name="student.studentName" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">密码:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentPassword_edit" name="student.studentPassword" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">性别:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentSex_edit" name="student.studentSex" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">所在班级:</span>
			<span class="inputControl">
				<input class="textbox"  id="student_classObj_classNumber_edit" name="student.classObj.classNumber" style="width: auto"/>
			</span>
		</div>
		<div>
			<span class="label">出生日期:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentBirthday_edit" name="student.studentBirthday" />

			</span>

		</div>
		<div>
			<span class="label">政治面貌:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentState_edit" name="student.studentState" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">学生照片:</span>
			<span class="inputControl">
				<img id="student_studentPhotoImg" width="200px" border="0px"/><br/>
    			<input type="hidden" id="student_studentPhoto" name="student.studentPhoto"/>
				<input id="studentPhotoFile" name="studentPhotoFile" type="file" size="50" />
			</span>
		</div>
		<div>
			<span class="label">联系电话:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentTelephone_edit" name="student.studentTelephone" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">学生邮箱:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentEmail_edit" name="student.studentEmail" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">联系qq:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentQQ_edit" name="student.studentQQ" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">家庭地址:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentAddress_edit" name="student.studentAddress" style="width:200px" />

			</span>

		</div>
		<div>
			<span class="label">附加信息:</span>
			<span class="inputControl">
				<input class="textbox" type="text" id="student_studentMemo_edit" name="student.studentMemo" style="width:200px" />

			</span>

		</div>
	</form>
</div>
<script type="text/javascript" src="Student/js/student_manage.js"></script> 
