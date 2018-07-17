package com.dorea.petgree.pet.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "pet_size_info")
public class PetSize implements Serializable {

	public enum SizePet {
		PEQUENINO(0), PEQUENO(1), MEDIO(2), GRANDE(3), MUITOGRANDE(4), IMENSO(5);

		SizePet(int size) { this.size = size; }

		private int size;

		public int getSize() {
			return size;
		}

		public void setSize(int size) {
			this.size = size;
		}

		public static SizePet getSize(String acronym) {
			for (SizePet size : values()) {
				if (size.toString().equalsIgnoreCase(acronym)) {
					return size;
				}
			}
			return null;
		}
	}

    @Id
    @Column(name="id_size")
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
