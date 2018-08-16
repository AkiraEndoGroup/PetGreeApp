package com.dorea.petgree.ong.service;

import com.dorea.petgree.ong.domain.Ong;

import java.util.List;

public interface OngService {

	List<Ong> getOngs();

	Ong getOng(Long ongId);

	Ong getOngByEmail(String email);

	Ong postOng(Ong ong);

	void deleteOng(Long ongId);
}
