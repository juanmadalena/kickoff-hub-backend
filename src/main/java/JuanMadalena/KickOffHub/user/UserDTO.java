package JuanMadalena.KickOffHub.user;

import java.util.UUID;

public record UserDTO(
        UUID id,
        String photo,
        String username,
        String email,
        String firstName,
        String lastName,
        String position,
        String[] secondaryPositions
    ){

}
