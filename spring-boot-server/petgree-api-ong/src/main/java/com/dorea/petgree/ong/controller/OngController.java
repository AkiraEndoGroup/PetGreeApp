package com.dorea.petgree.ong.controller;

import com.dorea.petgree.ong.controller.converter.OngConverter;
import com.dorea.petgree.ong.domain.Ong;
import com.dorea.petgree.ong.domain.OngModel;
import com.dorea.petgree.ong.domain.json.Email;
import com.dorea.petgree.ong.domain.json.Telefone;
import com.dorea.petgree.ong.exception.*;
import com.dorea.petgree.ong.service.EmailService;
import com.dorea.petgree.ong.service.OngService;
import com.dorea.petgree.ong.validate.ValidateOng;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/ongs")
public class OngController extends WebMvcConfigurerAdapter {

	@Autowired
	private OngService ongService;

	@Autowired
	private EmailService emailService;

	private final String adminEmail = "yago.dorea@gmail.com";

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedOrigins("*")
				.allowedHeaders("*");
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	public Ong postOng(@RequestBody OngModel ongModel) {
		System.out.println("postOng invoked.");
		ongModel.setVerificada(false);
		Ong ong = OngConverter.toOng(ongModel, null);

		if (ong.getId() != null) {
			throw new IdForbiddenException();
		}

		if (!ValidateOng.validateOng(ong)) {
			throw new InvalidInputException();
		}

		if (ongService.getOngByEmail(ong.getEmail()) != null) {
			throw new EmailAlreadyRegisteredException(ong.getEmail());
		}

		return ongService.postOng(ong);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<Ong> getOngs() {
		System.out.println("getOngs invoked.");
		return ongService.getOngs();
	}

	@RequestMapping(value = "/{ongId}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Ong getOng(@PathVariable("ongId") Long ongId) {
		System.out.println("getOng invoked.");
		Ong ong = ongService.getOng(ongId);
		if (ong == null) {
			throw new OngNotFoundException(ongId);
		}
		return ong;
	}

	@RequestMapping(value = "/{ongId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public Ong putOng(@PathVariable("ongId") Long ongId,
	                  @RequestBody OngModel ongModel) {
		System.out.println("putOng invoked.");
		Ong ong = ongService.getOng(ongId);
		if (ong == null) {
			throw new OngNotFoundException(ongId);
		}
		ong = OngConverter.toOng(ongModel, ong);
		return ongService.postOng(ong);
	}

	@RequestMapping(value = "/{ongId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteOng(@PathVariable("ongId") Long ongId) {
		System.out.println("deleteOng invoked.");
		if (ongService.getOng(ongId) == null) {
			throw new OngNotFoundException(ongId);
		}
		ongService.deleteOng(ongId);
	}

	@RequestMapping(value = "/{ongId}/pets", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Set<Long> getOngPets(@PathVariable("ongId") Long ongId) {
		System.out.println("getOngPets invoked.");
		Ong ong = getOng(ongId);
		if (ong == null) {
			throw new OngNotFoundException(ongId);
		}
		return ong.getPets();
	}

	@RequestMapping(value = "/email/{email:.+}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Ong getOngByEmail(@PathVariable("email") String email) {
		System.out.println("getOngByEmail invoked.");
		Ong ong = ongService.getOngByEmail(email);
		if (ong == null) {
			throw new OngNotFoundByEmailException(email);
		}
		return ong;
	}

	@RequestMapping(value = "/email/{email:.+}/isVerified", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public boolean isOngVerified(@PathVariable("email") String email) {
		System.out.println("isOngVerified invoked.");
		Ong ong = ongService.getOngByEmail(email);

		if (ong == null) {
			throw new OngNotFoundByEmailException(email);
		}
		return ong.isVerificada();
	}

	@RequestMapping(value = "/email-admin", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void sendEmailToAdmin(@RequestBody Email email) {
		System.out.println("sendEmailToAdmin invoked.");

		emailService.sendEmail(
				adminEmail,
				adminEmail,
				"Cadastro de ONG",
				"Um representante de uma ONG entrou em contato e deseja cadastrá-la no aplicativo! O email é " + email.getEmail());

		System.out.println("email sent.");
	}

	@RequestMapping(value = "/email/{email:.+}/telefones", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public Ong addPhone(@PathVariable("email") String email,
						 @RequestBody Telefone telefone) {
		System.out.println("addPhone invoked.");

		if (!ValidateOng.isThisAPhone(telefone.getTelefone())) {
			throw new InvalidPhoneException(telefone.getTelefone());
		}

		Ong ong = ongService.getOngByEmail(email);

		if (ong == null) {
			throw new OngNotFoundByEmailException(email);
		}
		Set<String> telefones = ong.getTelefones();
		if (telefones == null) {
			telefones = new HashSet<>();
		}
		telefones.add(telefone.getTelefone());
		ong.setTelefones(telefones);
		return ongService.postOng(ong);
	}
}
