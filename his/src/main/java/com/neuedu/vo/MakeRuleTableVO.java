package com.neuedu.vo;

import java.sql.Date;

public class MakeRuleTableVO {
	private Date SchedDate;
	private int DeptID;
	private int UserID;
	private int RuleID;
	private int RegistLeID;
	private String Noon;
	private Date KaiShi;
	private Date JieShu;
	
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
	public int getUserID() {
		return UserID;
	}
	public void setUserID(int userID) {
		UserID = userID;
	}
	public int getRuleID() {
		return RuleID;
	}
	public void setRuleID(int ruleID) {
		RuleID = ruleID;
	}
	public String getNoon() {
		return Noon;
	}
	public void setNoon(String noon) {
		Noon = noon;
	}
	public Date getKaiShi() {
		return KaiShi;
	}
	public void setKaiShi(Date kaiShi) {
		KaiShi = kaiShi;
	}
	public Date getJieShu() {
		return JieShu;
	}
	public void setJieShu(Date jieShu) {
		JieShu = jieShu;
	}
	public int getRegistLeID() {
		return RegistLeID;
	}
	public void setRegistLeID(int registLeID) {
		RegistLeID = registLeID;
	}
	
	
	
}
