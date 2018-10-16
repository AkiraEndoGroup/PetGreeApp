package com.dorea.petgree.ong.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "ongs")
public class Ong implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@JoinColumn(name = "endereco",referencedColumnName = "address_id")
	@OneToOne(cascade = CascadeType.ALL)
	private Address endereco;

	@ElementCollection
	@Column(name = "pets")
	private Set<Long> pets;

	@ElementCollection
	@Column(name = "telefones")
	private Set<String> telefones;

	@Column(name = "email", unique = true)
	private String email;

	@Column(name = "verificada")
	private boolean verificada;

	@Column(name = "descricao")
	private String descricao;

	@Column(name = "logo")
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
