package com.neuedu.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuedu.mapper.SystemMapper;
import com.neuedu.po.DepartmentPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.SystemService;
import com.neuedu.vo.LoginVO;

@Service
public class SystemServiceImpl implements SystemService{
	
	@Autowired
	private SystemMapper systemMapper;
	
	@Override
	public UserPO doLogin(LoginVO vo) {
		System.out.println("....SystemServiceImpl......doLogin()........");
		UserPO po = null;
		try {
			po = systemMapper.doLogin(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return po;
	}

	@Override
	public List<DepartmentPO> selectDept(String constantName) {
		System.out.println("....SystemServiceImpl....selectDept().");
		List<DepartmentPO> list = null;
		try {
			list = systemMapper.selectDept(constantName);
			System.out.println("service list getConstantName:"+list.get(0).getConstantName());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("size" + list.size());
		return list;
	}

	@Override
	public List<DepartmentPO> selectAllDept() {
		System.out.println("....SystemServiceImpl....selectAllDept().");
		List<DepartmentPO> list = null;
		try {
			list = systemMapper.selectAllDept();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("Allsize" + list.size());
		return list;
	}
	
}
