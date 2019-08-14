package com.neuedu.po;

public class UserPO {
	private int ID;				//ID主键
    private String UserName;	//登录名
    private String Password;	//密码
    private String RealName;	//真实姓名
    private int UserType;		//用户类别
    private ConstantitemPO DocTitle;		//医生职称ID
    private String IsScheduling;//是否参与排班
    private DepartmentPO Dept;			//所在科室ID
    private RegistLevelPO RegistLevel;		//挂号级别ID
    private int DelMark;		//删除标记
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String Password) {
		this.Password = Password;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public int getUserType() {
		return UserType;
	}
	public void setUserType(int userType) {
		UserType = userType;
	}
	
	public ConstantitemPO getDocTitle() {
		return DocTitle;
	}
	public void setDocTitle(ConstantitemPO docTitle) {
		DocTitle = docTitle;
	}
	public String getIsScheduling() {
		return IsScheduling;
	}
	public void setIsScheduling(String isScheduling) {
		IsScheduling = isScheduling;
	}
	
	public DepartmentPO getDept() {
		return Dept;
	}
	public void setDept(DepartmentPO dept) {
		Dept = dept;
	}
	public RegistLevelPO getRegistLevel() {
		return RegistLevel;
	}
	public void setRegistLevel(RegistLevelPO registLevel) {
		RegistLevel = registLevel;
	}
	public int getDelMark() {
		return DelMark;
	}
	public void setDelMark(int delMark) {
		DelMark = delMark;
	}
    
    
}
