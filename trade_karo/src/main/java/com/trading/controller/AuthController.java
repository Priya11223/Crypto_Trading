package com.trading.controller;

import com.trading.entity.TwoFactorOTP;
import com.trading.entity.User;
import com.trading.repository.UserRepository;
import com.trading.response.AuthResponse;
import com.trading.service.*;
import com.trading.utils.JwtUtils;
import com.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailServiceImpl userDetailService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private TwoFactorOtpService twoFactorOtpService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception
    {
        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if(isEmailExist!=null)
            throw new Exception("Email Already Exist");

        User newUser = new User();
        newUser.setUserName(user.getUserName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        User savedUser = userRepository.save(newUser);

        watchlistService.createWatchlist(savedUser);

        String jwt = jwtUtils.generateToken(user.getEmail());
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Registered Sucess");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> login(@RequestBody User user)
    {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
            String jwt = jwtUtils.generateToken(user.getEmail());

            User authUser = userRepository.findByEmail(user.getEmail());

            if(user.getTwoFactorAuth().isEnabled())
            {
                AuthResponse res = new AuthResponse();
                res.setMessage("Two factor auth is Enabled");
                res.setTwoFactorAuthEnabled(true);
                String otp = OtpUtils.generateOtp();

                TwoFactorOTP oldTwoFactorOTP = twoFactorOtpService.findByUser(authUser.getId());
                if(oldTwoFactorOTP!=null)
                {
                    twoFactorOtpService.deleteTwoFactorOtp(oldTwoFactorOTP);
                }
                TwoFactorOTP newTwoFactorOtp = twoFactorOtpService.createTwoFactorOtp(authUser, otp, jwt);

                emailService.sendVerificationOtpEmail(user.getEmail(),otp);

                res.setSession(newTwoFactorOtp.getId());
                return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
            }

            AuthResponse res = new AuthResponse();
            res.setJwt(jwt);
            res.setStatus(true);
            res.setMessage("Log In success");
            return new ResponseEntity<>(res, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Invalid Credentials",HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigninOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
        TwoFactorOTP twoFactorOTP = twoFactorOtpService.findById(id);
        if(twoFactorOtpService.verifyTwoFactorOtp(twoFactorOTP,otp)){
            AuthResponse res = new AuthResponse();
            res.setMessage("Two Factor Authentication Verified");
            res.setTwoFactorAuthEnabled(true);
            res.setJwt(twoFactorOTP.getJwt());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        throw new Exception("Invalid otp");
    }
}
