package com.autowindow.auto_window_backend.service;

import com.autowindow.auto_window_backend.model.AutoWindowUser;
import com.autowindow.auto_window_backend.repo.AutoWindowUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
@Service
public class AutoWindowUserService {

    @Autowired
    private AutoWindowUserRepo repo;

    public List<AutoWindowUser> getAllAccounts() {
        return repo.findAll();
    }

    public AutoWindowUser saveAccount(AutoWindowUser user) {
        return repo.save(user);
    }

    public AutoWindowUser getAccountInfo(AutoWindowUser user) {
        if (user.getUsername() == null || user.getUsername().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty()) {
            return null;
        }
        return repo.findByUsernameAndPassword(user.getUsername(), user.getPassword()).orElse(null);
    }


    public void addAddresses(int id, List<String> addresses) {
        AutoWindowUser user = repo.findById(id).orElse(null);
        List<String> userAdresses = user.getAddresses();
        if(userAdresses == null){
            userAdresses = new ArrayList<>();
        }
        userAdresses.addAll(addresses);

        user.setAddresses(userAdresses);
        repo.save(user);

    }

    public List<String> getAdresses(int id) {
        AutoWindowUser user = repo.findById(id).orElse(null);
        if (user == null || user.getAddresses() == null) {
            return new ArrayList<>();
        }
        return user.getAddresses();
    }

    public void deleteAddresses(int id, List<String> addresses) {
        AutoWindowUser user = repo.findById(id).orElse(null);
        if (user != null && user.getAddresses() != null) {
            user.getAddresses().removeAll(addresses);
            repo.save(user);
        }
    }
}
