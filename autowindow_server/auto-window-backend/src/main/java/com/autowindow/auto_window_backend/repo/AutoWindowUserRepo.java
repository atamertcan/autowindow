package com.autowindow.auto_window_backend.repo;
import com.autowindow.auto_window_backend.model.AutoWindowUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AutoWindowUserRepo extends JpaRepository<AutoWindowUser, Integer> {

    Optional<AutoWindowUser> findByUsernameAndPassword(String username, String password);
}
