package com.neuedu.service.impl;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neuedu.mapper.UserMapper;
import com.neuedu.po.ConstantitemPO;
import com.neuedu.po.UserPO;
import com.neuedu.service.UserService;
import com.neuedu.vo.UserInfoVO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper userMapper;

	@Override
	public List<UserPO> selectAllUser() {
		System.out.println(".....UserServiceImpl......selectAllUser().....");
		List<UserPO> list = null;
		try {
			list = userMapper.selectAllUser();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("service selectAllUserlist.size:" + list.size());
		return list;
	}

	@Override
	public List<UserPO> getSomeUser(UserInfoVO vo) {
		System.out.println(".....UserServiceImpl......getSomeUser().....");
		List<UserPO> list = null;
		try {
			list = userMapper.getSomeUser(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("service getSomeUserlist.size:" + list.size());
		return list;
	}

	@Override
	public int insertUser(UserInfoVO vo) {
		System.out.println(".....UserServiceImpl......insertUser().....");
		int count = -1;
		try {
			count = userMapper.insertUser(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public int updateUser(UserInfoVO vo) {
		System.out.println(".....UserServiceImpl......updateUser().....");
		int count = -1;
		try {
			count = userMapper.updateUser(vo);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public int delectUser(int id) {
		System.out.println(".....UserServiceImpl......delectUser().....");
		int count = -1;
		try {
			count = userMapper.delectUser(id);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return count;
	}

	@Override
	public List<ConstantitemPO> getDocTitle() {
		System.out.println(".....UserServiceImpl......getDocTitle().....");
		List<ConstantitemPO> list = null;
		try {
			list = userMapper.getDocTitle();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("service getDocTitlelist.size:" + list.size());
		return list;		

	}

}
