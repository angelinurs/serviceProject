package com.carutil.rest.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
// classpath -> src/main/resource/
@PropertySource("classpath:file.properties")
public class FileUploadPathConfig {
    private final Environment environment;

    public String getProperty(String key) {
        return environment.getProperty(key);
    }
}
