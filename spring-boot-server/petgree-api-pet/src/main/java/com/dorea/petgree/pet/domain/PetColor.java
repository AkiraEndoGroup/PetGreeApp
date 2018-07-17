package com.dorea.petgree.pet.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "pet_color_info")
public class PetColor implements Serializable {

	public enum ColorPet {
		BRANCO(0), PRETO(1), MARROM(2), LARANJA(3), MALHADO(4), BEGE(5), OUTRO(6);

		ColorPet(int color) { this.color = color; }

		private int color;

		public int getColor() {
			return color;
		}

		public void setColor(int color) {
			this.color = color;
		}

		public static ColorPet getColor(String acronym) {
			for (ColorPet color : values()) {
				if (color.toString().equalsIgnoreCase(acronym)) {
					return color;
				}
			}
			return null;
		}
	}

	@Id
	@Column(name="id_color")
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
