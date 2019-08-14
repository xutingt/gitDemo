package com.neuedu.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuedu.mapper.KeShiMapper;
import com.neuedu.po.DepartmentPO;
import com.neuedu.service.KeShiService;
import com.neuedu.vo.DepartmentVO;

@Service
public class KeShiServiceImpl implements KeShiService{
	
	@Autowired
	private KeShiMapper keShiMapper;
	@Override
	public int deleteDept(int deptid) {
		System.out.println(".....KeShiServiceImpl......deleteDept().......");
		int userCount = 0;
		int registerCount = 0;
		int deleteConunt = 0;
		try {
			userCount = keShiMapper.checkedUser(deptid);
			registerCount = keShiMapper.checkedRegister(deptid);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(userCount  > 0) {
			return -1;
		}else if(registerCount > 0){
			return -2;
		}else {
			try {
				deleteConunt = keShiMapper.deleteDept(deptid);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return deleteConunt;
		}
	}

	@Override
	public int insertDept(DepartmentVO vo) {
		System.out.println(".....KeShiServiceImpl......insertDept().......");
		int count = 0;
		try {
			count = keShiMapper.insertDept(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public int updateDept(DepartmentVO vo) {
		System.out.println(".....KeShiServiceImpl......updateDept().......");
		int count = 0;
		try {
			count = keShiMapper.updateDept(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public List<DepartmentPO> getSomeDept(DepartmentVO vo) {
		System.out.println(".....KeShiServiceImpl......getSomeDept().......");
		List<DepartmentPO> list = null;
		try {
			list = keShiMapper.getSomeDept(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(list.size() == 0) {
			System.out.println(list.size());
			
		}else {
			System.out.println("list为空");
		}
		return list;
	}

	@Override
	public int getMaxDeptID() {
		System.out.println(".....KeShiServiceImpl......getMaxDeptID().......");
		int maxID = -1;
		try {
			maxID = keShiMapper.getMaxDeptID();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return maxID;
	}

}
