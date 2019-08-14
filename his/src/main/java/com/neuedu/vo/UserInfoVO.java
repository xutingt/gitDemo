package com.neuedu.vo;

public class UserInfoVO {
	private Integer ID;
	private String UserName;
	private String Password;
	private String RealName;
	private Integer UserType;
	private Integer DocTitleID;
	private Integer IsScheduling;
	private Integer DeptID;
	private Integer RegistLeID;
	private Integer DelMark;
	
	
	public String getUserName() {
		return UserName;
	}
	public void setUserName(String userName) {
		UserName = userName;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public Integer getUserType() {
		return UserType;
	}
	public void setUserType(Integer userType) {
		UserType = userType;
	}
	public Integer getDocTitleID() {
		return DocTitleID;
	}
	public void setDocTitleID(Integer docTitleID) {
		DocTitleID = docTitleID;
	}
	public Integer getDeptID() {
		return DeptID;
	}
	public void setDeptID(Integer deptID) {
		DeptID = deptID;
	}
	public Integer getID() {
		return ID;
	}
	public void setID(Integer iD) {
		ID = iD;
	}
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public Integer getIsScheduling() {
		return IsScheduling;
	}
	public void setIsScheduling(Integer isScheduling) {
		IsScheduling = isScheduling;
	}
	public Integer getRegistLeID() {
		return RegistLeID;
	}
	public void setRegistLeID(Integer registLeID) {
		RegistLeID = registLeID;
	}
	public Integer getDelMark() {
		return DelMark;
	}
	public void setDelMark(Integer delMark) {
		DelMark = delMark;
	}
	
	
}
