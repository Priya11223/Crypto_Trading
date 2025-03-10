package com.trading.service;

import com.trading.domain.VerificationType;
import com.trading.entity.TwoFactorAuth;
import com.trading.entity.User;
import com.trading.repository.UserRepository;
import com.trading.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveEntry(User user)
    {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User findUserByJwt(String temp) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String eml = authentication.getName();
        User user = userRepository.findByEmail(eml);

        if(user == null)
            throw new Exception("User not found");

        return user;
    }

    public User findUserByEmail(String email) throws Exception {
        User user = userRepository.findByEmail(email);

        if(user == null)
            throw new Exception("User not found");

        return user;
    }

    public User findUserBYId(Long userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);

        if(user.isEmpty())
            throw new Exception("User not found");

        return user.get();
    }

    public User enableTwoFactorAuthentication(VerificationType verificationType,
                                              String sendTo,
                                              User user)
    {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }

    public User updatePassword(User user, String newPassword)
    {
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }
}
