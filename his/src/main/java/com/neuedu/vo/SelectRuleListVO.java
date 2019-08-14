package com.neuedu.vo;

import java.sql.Date;

public class SelectRuleListVO {
	private Date SchedDate; //值班日期
	private int DeptId; //部门id
	private int UserId;//用户id
	private int RuleId;//规则id
	private String Noon;//上下午

	public Date getSchedDate() {
		return SchedDate;
	}
	public void setSchedDate(Date schedDate) {
		SchedDate = schedDate;
	}
	public int getDeptId() {
		return DeptId;
	}
	public void setDeptId(int deptId) {
		DeptId = deptId;
	}
	public int getUserId() {
		return UserId;
	}
	public void setUserId(int userId) {
		UserId = userId;
	}
	public int getRuleId() {
		return RuleId;
	}
	public void setRuleId(int ruleId) {
		RuleId = ruleId;
	}
	public String getNoon() {
		return Noon;
	}
	public void setNoon(String noon) {
		Noon = noon;
	}
	
	
}
