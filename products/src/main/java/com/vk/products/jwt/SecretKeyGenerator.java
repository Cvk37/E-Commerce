package com.vk.products.jwt;
import java.util.Base64;
import java.security.SecureRandom;

public class SecretKeyGenerator {
    public static void main(String[] args) {
        // Generate a secure random byte array
        byte[] randomBytes = new byte[32];
        new SecureRandom().nextBytes(randomBytes);

        // Encode the random bytes to a Base64-encoded string
        @SuppressWarnings("unused")
        String secretKey = Base64.getEncoder().encodeToString(randomBytes);

    }
}
