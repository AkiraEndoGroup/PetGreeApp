package com.dorea.petgree.pet.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "pet_gender_info")
public class PetGender implements Serializable {

	public enum GenderPet {
		MACHO(0), FEMEA(1), DESCONHECIDO(2);

		GenderPet(int gender) { this.gender = gender; }

		private int gender;

		public int getGender() {
			return gender;
		}

		public void setGender(int gender) {
			this.gender = gender;
		}

		public static GenderPet getGender(String acronym) {
			for (GenderPet gender : values()) {
				if (gender.toString().equalsIgnoreCase(acronym)) {
					return gender;
				}
			}
			return null;
		}
	}
	@Id
	@Column(name="id_gender")
	private Integer id;

	@Column(name = "description")
	private String description;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
