package com.dorea.petgree.ong.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class OngModel {

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private Long id;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private String name;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private Address endereco;

	private Set<Long> pets;

	private Set<String> telefones;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private String email;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private boolean verificada;

	private String descricao;

	private String logo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Address getEndereco() {
		return endereco;
	}

	public void setEndereco(Address endereco) {
		this.endereco = endereco;
	}

	public Set<Long> getPets() {
		return pets;
	}

	public void setPets(Set<Long> pets) {
		this.pets = pets;
	}

	public Set<String> getTelefones() {
		return telefones;
	}

	public void setTelefones(Set<String> telefones) {
		this.telefones = telefones;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isVerificada() {
		return verificada;
	}

	public void setVerificada(boolean verificada) {
		this.verificada = verificada;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}
}
