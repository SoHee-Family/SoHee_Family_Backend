package com.example.sohee_family.config;

import com.example.sohee_family.config.interceptor.LoginCheckInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class webConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/",
                        "/signUp",
                        "/login",
                        "/logout",
                        "/about",
                        "/news",
                        "/menu",
                        "/support",
                        "/css/**",
                        "/images/**",
                        "/js/**",
                        "/fonts/**",
                        "/*.ico",
                        "/error",
                        "/saveData",
                        "/webfonts/**"
                );
    }
}
