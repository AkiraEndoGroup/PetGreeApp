package com.dorea.petgree.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModel {

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private Long id;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private Avatar avatar;

	@JsonInclude(JsonInclude.Include.ALWAYS)
	private String email;

	private Set<String> telefones;

	private Address endereco;

	private Set<Long> owned;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Avatar getAvatar() {
		return avatar;
	}

	public void setAvatar(Avatar avatar) {
		this.avatar = avatar;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getTelefones() {
		return telefones;
	}

	public void setTelefones(Set<String> telefones) {
		this.telefones = telefones;
	}

	public Address getEndereco() {
		return endereco;
	}

	public void setEndereco(Address endereco) {
		this.endereco = endereco;
	}

	public Set<Long> getOwned() {
		return owned;
	}

	public void setOwned(Set<Long> owned) {
		this.owned = owned;
	}
}
