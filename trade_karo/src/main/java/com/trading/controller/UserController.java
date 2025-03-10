package com.trading.controller;

import com.trading.domain.VerificationType;
import com.trading.entity.ForgetPasswordToken;
import com.trading.requests.ForgetPasswordTokenRequest;
import com.trading.entity.User;
import com.trading.entity.VerificationCode;
import com.trading.requests.ResetPasswordRequest;
import com.trading.response.ApiResponse;
import com.trading.response.AuthResponse;
import com.trading.service.EmailService;
import com.trading.service.ForgetPasswordService;
import com.trading.service.UserService;
import com.trading.service.VerificationCodeService;
import com.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgetPasswordService forgetPasswordService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile() throws Exception {
        User user = userService.findUserByJwt("temp");
        String name = user.getUserName();

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @PostMapping("/api/user/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@PathVariable VerificationType verificationType) throws Exception {
        User user = userService.findUserByJwt("temp");

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUserId(user.getId());
        if(verificationCode == null){
            verificationCode = verificationCodeService.sendVerificationOtp(user, verificationType);
        }

        if(verificationType.equals(VerificationType.EMAIL))
        {
            emailService.sendVerificationOtpEmail(user.getEmail(),verificationCode.getOtp());
        }

        return new ResponseEntity<>("Verification otp sent successfully",HttpStatus.OK);
    }

    @PatchMapping("/api/user/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(@PathVariable String otp) throws Exception {
        User user = userService.findUserByJwt("temp");

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUserId(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL) ?
                verificationCode.getEmail() : verificationCode.getMobile();
        boolean isVerified = verificationCode.getOtp().equals(otp);

        if(isVerified)
        {
            User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(), sendTo, user);
            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("wrong OTP");
    }

    @PostMapping("/auth/user/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgetPasswordOtp(
            @RequestBody ForgetPasswordTokenRequest req) throws Exception {

        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgetPasswordToken token = forgetPasswordService.findByUser(user.getId());

        if(token==null)
        {
            token = forgetPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());
        }

        if(req.getVerificationType().equals(VerificationType.EMAIL))
        {
            emailService.sendVerificationOtpEmail(user.getEmail(),token.getOtp());
        }

        AuthResponse res = new AuthResponse();
        res.setSession(token.getId());
        res.setMessage("Password reset otp sent successfully");

        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(
            @RequestParam String id,
            @RequestBody ResetPasswordRequest req) throws Exception {

        ForgetPasswordToken forgetPasswordToken = forgetPasswordService.findById(id);

        boolean isVerified = forgetPasswordToken.getOtp().equals(req.getOtp());

        if(isVerified)
        {
            userService.updatePassword(forgetPasswordToken.getUser(), req.getPassword());
            ApiResponse apiResponse = new ApiResponse();
            apiResponse.setMessage("password updated successfully");
            return new ResponseEntity<>(apiResponse,HttpStatus.OK);
        }
        throw new Exception("wrong otp");
    }
}
