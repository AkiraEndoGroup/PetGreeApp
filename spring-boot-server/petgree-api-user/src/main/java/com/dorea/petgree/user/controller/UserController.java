package com.dorea.petgree.user.controller;

import com.dorea.petgree.user.controller.Converter.UserConverter;
import com.dorea.petgree.user.domain.User;
import com.dorea.petgree.user.domain.UserModel;
import com.dorea.petgree.user.service.UserService;
import com.dorea.petgree.user.validate.ValidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

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
		User user = UserConverter.toUser(userModel);

		if (user.getId() != null) {
			// throw new IdForbiddenException();
		}

		if (!ValidateUser.isValid(user)) {
			// throw new InvalidInputException();
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
		return userService.getUser(userId);
	}

	@RequestMapping(value = "/email/{email:.+}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	public User getUserByEmail(@PathVariable("email") String email) {
		System.out.println("getUserByEmail invoked.");
		return userService.findByEmail(email);
	}
}
