package com.dorea.petgree.user.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "avatar_info")
public class Avatar implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "avatar_id")
	private Long id;

	@Column(name = "name")
	private String nome;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "bio")
	private String bio;

	@Column(name = "idade")
	private int idade;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public int getIdade() {
		return idade;
	}

	public void setIdade(int idade) {
		this.idade = idade;
	}
}
