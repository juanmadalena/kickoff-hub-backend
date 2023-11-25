package JuanMadalena.KickOffHub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("")
    public List<UserDTO> getUsers(){
        return userService.getUsers();
    }

    @PostMapping("")
    public void registerNewUser(@RequestBody User user){
        userService.addNewUser(user);
    }
}
