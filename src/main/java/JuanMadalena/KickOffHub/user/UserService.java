package JuanMadalena.KickOffHub.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    public List<UserDTO> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(user.getId(), user.getPhoto(), user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getPosition(), user.getSecondaryPositions()))
                .toList();
    }

    public void addNewUser(User user){
        userRepository.save(user);
    }

}
