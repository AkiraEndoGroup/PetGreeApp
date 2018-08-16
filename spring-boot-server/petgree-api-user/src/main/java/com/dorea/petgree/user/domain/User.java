package com.dorea.petgree.user.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Long id;

	@JoinColumn(name = "avatar",referencedColumnName = "avatar_id")
	@OneToOne(cascade = CascadeType.ALL)
	private Avatar avatar;

	@Column(name = "email",unique = true)
	private String email;

	@ElementCollection
	@CollectionTable(name = "telefones")
	private Set<String> telefones;

	@JoinColumn(name = "endereco",referencedColumnName = "address_id")
	@OneToOne(cascade = CascadeType.ALL)
	private Address endereco;

	@ElementCollection
	@CollectionTable(name = "owned")
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
