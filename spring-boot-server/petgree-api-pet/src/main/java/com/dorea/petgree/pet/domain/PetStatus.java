package com.dorea.petgree.pet.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "pet_status_info")
public class PetStatus implements Serializable {

	public enum StatusPet {
		PERDIDO(0), ADOTADO(1), DISPONIVEL(2); // Perdido -> desassociado, Adotado -> User, Disponivel -> ONG

		StatusPet(int gender) { this.status = gender; }

		private int status;

		public int getStatus() {
			return status;
		}

		public void setStatus(int status) {
			this.status = status;
		}

		public static StatusPet getStatus(String acronym) {
			for (StatusPet status : values()) {
				if (status.toString().equalsIgnoreCase(acronym)) {
					return status;
				}
			}
			return null;
		}
	}
	@Id
	@Column(name="id_status")
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
