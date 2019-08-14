package com.neuedu.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuedu.mapper.RegistMapper;
import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.DepartmentPO;
import com.neuedu.po.RegistLevelPO;
import com.neuedu.po.RegisterPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.RegistService;
import com.neuedu.vo.MakeRuleTableVO;

@Service
public class RegistServiceImpl implements RegistService{
	@Autowired
	private RegistMapper registMapper; 
	
	//获取科室分类
	@Override
	public List<ConstantitemPO> getDeptType() {
		System.out.println("....RegistServiceImpl.....getDateType()........");
		List<ConstantitemPO> list= null;
		try {
			list = registMapper.getDeptType();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(list == null) {
			System.out.println("ConstantitemPOlist为空");
		}else {
			System.out.println("ConstantitemPOlist.size():"+ list.size());
		}
		return list;
	}

	@Override
	public List<DepartmentPO> getDeptTypeClass(int deptCategoryID) {
		System.out.println("....RegistServiceImpl.....getDateTypeClass()........");
		List<DepartmentPO> list= null;
		try {
			list = registMapper.getDeptTypeClass(deptCategoryID);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(list == null) {
			System.out.println("DepartmentPOlist为空");
		}else {
			System.out.println("DepartmentPOlist.size():"+ list.size());
		}
		return list;
	}

	@Override
	public List<RegistLevelPO> getRegistType() {
		System.out.println("....RegistServiceImpl.....getRegistType()........");
		List<RegistLevelPO> list= null;
		try {
			list = registMapper.getRegistType();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(list == null) {
			System.out.println("RegistLevelPOlist为空");
		}else {
			System.out.println("RegistLevelPOlist.size():"+ list.size());
		}
		return list;
	}

	@Override
	public int getRegistFee(int registTypeID) {
		System.out.println("....RegistServiceImpl.....getRegistFee()........");
		int Fee = 0;
		try {
			Fee = registMapper.getRegistFee(registTypeID);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("Service fee :" + Fee);
		return Fee;
	}

	@Override
	public List<UserPO> selectDoc(MakeRuleTableVO vo) {
		System.out.println("....RegistServiceImpl.....getRegistFee()........");
		List<UserPO> list = null;
		try {
			list = registMapper.selectDoc(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int insertRegist(RegisterPO po) {
		System.out.println("....RegistServiceImpl.....insertRegist()........");
		int count = -1;
		try {
			count = registMapper.insertRegist(po);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

}
