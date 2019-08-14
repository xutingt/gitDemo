package com.neuedu.po;

import java.sql.Date;

public class SchedulingPO {
	private int ID;
	private Date SchedDate;
	private int DeptID;
	private String DeptName;
	private int UserID;
	private String RealName;
	private String RegistName;
	private int RegistQuota;
	private String Noon;
	private RulePO Rule;
	private int DelMark;
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public Date getSchedDate() {
		return SchedDate;
	}
	public void setSchedDate(Date schedDate) {
		SchedDate = schedDate;
	}
	public int getDeptID() {
		return DeptID;
	}
	public void setDeptID(int deptID) {
		DeptID = deptID;
	}
	public String getDeptName() {
		return DeptName;
	}
	public void setDeptName(String deptName) {
		DeptName = deptName;
	}
	public int getUserID() {
		return UserID;
	}
	public void setUserID(int userID) {
		UserID = userID;
	}
	public String getRealName() {
		return RealName;
	}
	public void setRealName(String realName) {
		RealName = realName;
	}
	public String getRegistName() {
		return RegistName;
	}
	public void setRegistName(String registName) {
		RegistName = registName;
	}
	public int getRegistQuota() {
		return RegistQuota;
	}
	public void setRegistQuota(int registQuota) {
		RegistQuota = registQuota;
	}
	public String getNoon() {
		return Noon;
	}
	public void setNoon(String noon) {
		Noon = noon;
	}
	public RulePO getRule() {
		return Rule;
	}
	public void setRule(RulePO rule) {
		Rule = rule;
	}
	public int getDelMark() {
		return DelMark;
	}
	public void setDelMark(int delMark) {
		DelMark = delMark;
	}
	
	
}
