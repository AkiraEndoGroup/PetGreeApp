package com.dorea.petgree.domain;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collections;
import java.util.Map;

@Entity
@Table(name = "pets")
public class Pet implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "type",referencedColumnName = "id_type")
    private PetType type;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "gender",referencedColumnName = "id_gender")
    private PetGender gender;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "size",referencedColumnName = "id_size")
    private PetSize size;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "color",referencedColumnName = "id_color")
    private PetColor color;

    @Column(name = "spots")
    private boolean spots;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String image_url;

	// Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PetType getType() {
        return type;
    }

    public void setType(PetType type) {
        this.type = type;
    }

    public PetGender getGender() {
        return gender;
    }

    public void setGender(PetGender gender) {
        this.gender = gender;
    }

    public PetSize getSize() {
        return size;
    }

    public void setSize(PetSize size) {
        this.size = size;
    }

    public PetColor getColor() {
        return color;
    }

    public void setColor(PetColor color) {
        this.color = color;
    }

	public boolean isSpots() {
		return spots;
	}

    public void setSpots(boolean spots) {
        this.spots = spots;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

	public String getImage_url() {
		return image_url;
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}
}
