package com.dorea.petgree.ong.service.impl;

import com.dorea.petgree.ong.domain.Ong;
import com.dorea.petgree.ong.repository.OngRepository;
import com.dorea.petgree.ong.service.OngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OngServiceImpl implements OngService {

	@Autowired
	private OngRepository ongRepository;

	@Override
	public List<Ong> getOngs() { return ongRepository.findAll(); }

	@Override
	public Ong getOng(Long ongId) { return ongRepository.findOne(ongId); }

	@Override
	public Ong getOngByEmail(String email) { return ongRepository.findByEmail(email); }

	@Override
	public Ong postOng(Ong ong) { return ongRepository.save(ong); }

	@Override
	public void deleteOng(Long ongId) { ongRepository.delete(ongId); }

}
