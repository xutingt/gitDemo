package com.neuedu.vo;

public class DepartmentVO {
	private int ID;				//ID主键
    private String DeptCode;	//科室编码
    private String DeptName;	//科室名称
    private String DeptCategoryID; //科室分类
    private String DeptType;		//科室类型
    private String DelMark;		//删除标记
    
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getDeptCode() {
		return DeptCode;
	}
	public void setDeptCode(String deptCode) {
		DeptCode = deptCode;
	}
	public String getDeptName() {
		return DeptName;
	}
	public void setDeptName(String deptName) {
		DeptName = deptName;
	}
	public String getDeptCategoryID() {
		return DeptCategoryID;
	}
	public void setDeptCategoryID(String deptCategoryID) {
		DeptCategoryID = deptCategoryID;
	}
	public String getDeptType() {
		return DeptType;
	}
	public void setDeptType(String deptType) {
		DeptType = deptType;
	}
	public String getDelMark() {
		return DelMark;
	}
	public void setDelMark(String delMark) {
		DelMark = delMark;
	}
	
}
