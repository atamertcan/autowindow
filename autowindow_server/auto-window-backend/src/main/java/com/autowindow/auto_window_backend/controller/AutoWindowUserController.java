package com.autowindow.auto_window_backend.controller;

import com.autowindow.auto_window_backend.model.AutoWindowUser;
import com.autowindow.auto_window_backend.service.AutoWindowUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AutoWindowUserController {

    @Autowired
    private AutoWindowUserService service;

    @GetMapping("/signup")
    public List<AutoWindowUser> getAccounts(){
        return service.getAllAccounts();
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AutoWindowUser user) {
        AutoWindowUser foundUser = service.getAccountInfo(user);
        Map<String, Object> response = new HashMap<>();

        if (foundUser != null) {
            response.put("success", true);
            response.put("user", foundUser);
        } else {
            response.put("success", false);
            response.put("message", "Kullanıcı adı veya şifre hatalı");
        }
        return response;
    }

    @PostMapping("/signup")
    public AutoWindowUser createAccount(@RequestBody AutoWindowUser user){
        return service.saveAccount(user);
    }

    @PutMapping("/dashboard/{id}")
    public void addAddresses(@RequestBody List<String> addresses, @PathVariable int id){
        service.addAddresses(id, addresses);
    }

    @GetMapping("/dashboard/{id}")
    public List<String> showAdresses(@PathVariable int id){
        return service.getAdresses(id);
    }

    @DeleteMapping("/dashboard/{id}")
    public void deleteAddresses(@RequestBody List<String> addresses, @PathVariable int id){
        service.deleteAddresses(id, addresses);
    }

}
