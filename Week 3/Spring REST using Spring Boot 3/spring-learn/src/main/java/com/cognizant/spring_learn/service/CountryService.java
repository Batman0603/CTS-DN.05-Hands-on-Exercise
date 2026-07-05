package com.cognizant.spring_learn.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import com.cognizant.spring_learn.Country;

@Service
public class CountryService {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(CountryService.class);

    public Country getCountry(String code) {

        LOGGER.info("START");

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        List<Country> countries =
                (List<Country>) context.getBean("countryList");

        for (Country country : countries) {

            if (country.getCode().equalsIgnoreCase(code)) {

                LOGGER.info("END");

                return country;
            }
        }

        LOGGER.info("END");

        return null;
    }
}