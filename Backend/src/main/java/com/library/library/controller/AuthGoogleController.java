package com.library.library.controller;

import com.library.library.model.User;
import com.library.library.service.UserService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthGoogleController {

    @Autowired
    private UserService userService;

    private static final String CLIENT_ID = "290181437692-sbvs25klnskordo26alc69igj5gg4uc4.apps.googleusercontent.com";

    @PostMapping("/google")
    public ResponseEntity<User> googleSignIn(@RequestBody Map<String, String> userInfo) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    GsonFactory.getDefaultInstance() // Utiliza GsonFactory en lugar de JacksonFactory
            ).setAudience(Collections.singletonList(CLIENT_ID)).build();
            String token = userInfo.get("token");
            GoogleIdToken idToken = verifier.verify(token);

            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String googleId = payload.getSubject();
                String email = payload.getEmail();
                String firstName = (String) payload.get("given_name");
                String lastName = (String) payload.get("family_name");

                // Buscar o registrar al usuario
                User user = userService.findOrRegisterGoogleUser(googleId, email, firstName, lastName);
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
}
