package com.dorea.petgree.controller;

import com.dorea.petgree.controller.converter.PetConverter;
import com.dorea.petgree.domain.Pet;
import com.dorea.petgree.domain.PetModel;
import com.dorea.petgree.exception.IdForbiddenException;
import com.dorea.petgree.exception.InvalidInputException;
import com.dorea.petgree.exception.PetNotFoundException;
import com.dorea.petgree.service.PetService;
import com.dorea.petgree.validate.ValidatePet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController extends WebMvcConfigurerAdapter {

    @Autowired
    private PetService petService;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedOrigins("*")
                .allowedHeaders("*");
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void postPet(@RequestBody PetModel petModel) {
        Pet pet = PetConverter.toPet(petModel);

    	if (pet.getId() != null) {
            throw new IdForbiddenException();
        }
        if (!ValidatePet.isValid(pet)) {
            throw new InvalidInputException();
        }
        petService.postPet(pet);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Pet> getPets() {
        System.out.println("getPets invoked.");
        return petService.getPets();
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Pet updatePet(@RequestBody PetModel petModel) {
	    Pet pet = PetConverter.toPet(petModel);

        if (ValidatePet.isValid(pet)) {
            if (petService.getPetById(pet.getId()) != null) {
                return pet;
            } else {
                throw new PetNotFoundException(pet.getId());
            }
        } else {
            throw new InvalidInputException();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePet(@PathVariable Long id) {
        if (petService.getPetById(id) != null)
            petService.deletePet(id);
        else
            throw new PetNotFoundException(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Pet getPet(@PathVariable("id") Long id) {
        Pet pet = petService.getPetById(id);
        if (pet == null) {
            throw new PetNotFoundException(id);
        }
        return pet;
    }
}
