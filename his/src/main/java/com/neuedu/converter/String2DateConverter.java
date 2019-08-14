package com.neuedu.converter;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.core.convert.converter.Converter;

public class String2DateConverter implements Converter<String, Date>{
	
	private SimpleDateFormat  sf = new SimpleDateFormat("yyyy-MM-dd"); 
	
	@Override
	public Date convert(String source) {
		// TODO Auto-generated method stub
		if(source == null) {
			return null;
		}
		if(source.isEmpty()) {
			return null;
		}
		java.util.Date temp = null;
		try {
			temp  = sf.parse(source);
		}catch(ParseException e){
			return null;
		}
		if(temp == null) {
			return null;
		}else {
			return new Date(temp.getTime());
		}
	}
}
