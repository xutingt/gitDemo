package com.neuedu.service;

import java.util.List;

import com.neuedu.po.DepartmentPO;
import com.neuedu.po.UserPO;
import com.neuedu.vo.LoginVO;

public interface SystemService {
	public UserPO doLogin(LoginVO vo);
	public List<DepartmentPO> selectDept(String constantName);
	public List<DepartmentPO> selectAllDept();
}
