package com.neuedu.po;

public class RulePO {

	private int ID;
	private String RuleName;
	private String Week;
	private int DelMark;
	private int DeptID;
	private int UserID;
	private String DeptName;
	private String RealName;

	public int getDeptID() {
		return DeptID;
	}

	public void setDeptID(int deptID) {
		DeptID = deptID;
	}

	public int getUserID() {
		return UserID;
	}

	public void setUserID(int userID) {
		UserID = userID;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public String getRuleName() {
		return RuleName;
	}

	public void setRuleName(String ruleName) {
		RuleName = ruleName;
	}

	

	public String getDeptName() {
		return DeptName;
	}

	public void setDeptName(String deptName) {
		DeptName = deptName;
	}

	public String getRealName() {
		return RealName;
	}

	public void setRealName(String realName) {
		RealName = realName;
	}

	public String getWeek() {
		return Week;
	}

	public void setWeek(String week) {
		Week = week;
	}

	public int getDelMark() {
		return DelMark;
	}

	public void setDelMark(int delMark) {
		DelMark = delMark;
	}
}
