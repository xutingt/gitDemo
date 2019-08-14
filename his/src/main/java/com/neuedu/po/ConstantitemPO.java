package com.neuedu.po;

public class ConstantitemPO {
	private  int ID;
    private int ConstantTypeID;
    private String ConstantCode;
    private String ConstantName;
    private int DelMark;
    
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public int getConstantTypeID() {
		return ConstantTypeID;
	}
	public void setConstantTypeID(int constantTypeID) {
		ConstantTypeID = constantTypeID;
	}
	public String getConstantCode() {
		return ConstantCode;
	}
	public void setConstantCode(String constantCode) {
		ConstantCode = constantCode;
	}
	public String getConstantName() {
		return ConstantName;
	}
	public void setConstantName(String constantName) {
		ConstantName = constantName;
	}
	public int getDelMark() {
		return DelMark;
	}
	public void setDelMark(int delMark) {
		DelMark = delMark;
	}
    
}
