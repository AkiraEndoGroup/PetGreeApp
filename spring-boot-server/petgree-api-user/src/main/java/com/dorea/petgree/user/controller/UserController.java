package com.dorea.petgree.user.controller;

import com.dorea.petgree.user.controller.Converter.UserConverter;
import com.dorea.petgree.user.domain.User;
import com.dorea.petgree.user.domain.UserModel;
import com.dorea.petgree.user.exception.*;
import com.dorea.petgree.user.service.UserService;
import com.dorea.petgree.user.validate.ValidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController extends WebMvcConfigurerAdapter {

	@Autowired
	private UserService userService;

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedOrigins("*")
				.allowedHeaders("*");
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.CREATED)
	public User postUser(@RequestBody UserModel userModel) {
		System.out.println("postUser invoked.");
		User user = UserConverter.toUser(userModel, null);

		if (user.getId() != null) {
			throw new IdForbiddenException();
		}

		if (!ValidateUser.isValid(user)) {
			throw new InvalidInputException();
		}

		if (userService.findByEmail(user.getEmail()) != null) {
			throw new EmailAlreadyRegisteredException(user.getEmail());
		}

		return userService.postUser(user);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public List<User> getUsers() {
		System.out.println("getUsers invoked.");
		return userService.getUsers();
	}

	@RequestMapping(value = "/{userId}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public User getUser(@PathVariable("userId") Long userId) {
		System.out.println("getUser invoked.");
		User user = userService.getUser(userId);
		if (user != null) {
			return user;
		} else {
			throw new UserNotFoundException(userId);
		}
	}

	@RequestMapping(value = "/{userId}/pets", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public Set<Long> getUserPets(@PathVariable("userId") Long userId) {
		System.out.println("getUserPets invoked.");
		User user = userService.getUser(userId);
		if (user == null) {
			throw new UserNotFoundException(userId);
		}
		return user.getOwned();
	}

	@RequestMapping(value = "/{userId}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable("userId") Long userId) {
		System.out.println("deleteUser invoked.");
		if (userService.getUser(userId) != null) {
			userService.deleteUser(userId);
		} else {
			throw new UserNotFoundException(userId);
		}
	}

	@RequestMapping(value = "/{userId}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.OK)
	public User updateUser(@PathVariable("userId") Long userId,
	                    @RequestBody UserModel userModel) {
		System.out.println("updateUser invoked.");
		User user = userService.getUser(userId);
		if (user == null) {
			throw new UserNotFoundException(userId);
		}
		user = UserConverter.toUser(userModel, user);
		return userService.postUser(user);

	}

	@RequestMapping(value = "/email/{email:.+}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public User getUserByEmail(@PathVariable("email") String email) {
		System.out.println("getUserByEmail invoked.");
		User user = userService.findByEmail(email);
		if (user != null) {
			return user;
		} else {
			throw new UserNotFoundByEmailException(email);
		}
	}

	@RequestMapping(value = "/{userId}/telefones", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void postPhone(@PathVariable("userId") Long userId,
	                      @RequestBody String telefone) {
		System.out.println("postPhone invoked.");
		User user = userService.getUser(userId);

		if (user != null) {
			Set phones = user.getTelefones();

			if (telefone != null) {
				phones.add(telefone);
			}

			if (!ValidateUser.isThisAPhone(telefone)) {
				throw new InvalidPhoneException(telefone);
			}

			user.setTelefones(phones);
			userService.postUser(user);
		} else {
			throw new UserNotFoundException(userId);
		}
	}

	@RequestMapping(value = "/{userId}/owned", method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addPet(@PathVariable("userId") Long userId,
	                   @RequestBody Long petId) {
		System.out.println("postPhone invoked.");
		User user = userService.getUser(userId);

		if (!Objects.nonNull(user)) {
			throw new UserNotFoundException(userId);
		}
		Set<Long> owned = user.getOwned();
		if (!Objects.nonNull(owned)) {
			owned = new HashSet<>();
		}
		owned.add(petId);
		user.setOwned(owned);
		userService.postUser(user);
	}
}
