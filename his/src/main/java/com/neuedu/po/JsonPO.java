package com.neuedu.po;

import java.util.List;

public class JsonPO {
	private int code;
	private String msg;
	private int count;
	private List<DepartmentPO> data;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<DepartmentPO> getData() {
		return data;
	}
	public void setData(List<DepartmentPO> data) {
		this.data = data;
	}
	
	
	
	
}
