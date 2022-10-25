package com.example.sohee_family.controller.home;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.dto.News;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import com.example.sohee_family.domain.repository.newsRepository.inf.NewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    private final DesignRepository designRepository;
    private final NewsRepository newsRepository;
    @Value("${USpageURL}")
    private String USpageURL;

    @GetMapping("/")
    public String home(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model){
        List<Design> designList = designRepository.findAllDesign();
        List<News> newsList = newsRepository.findAllNews();
        model.addAttribute("designList",designList);
        model.addAttribute("newsList", newsList);

        if(sessionForm == null){
            return "mainPage";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "mainPage";
        }
    }

    @GetMapping("/about")
    public String about(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                        Model model){
        if(sessionForm == null){
            return "about";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "about";
        }
    }

    @GetMapping("/support")
    public String support(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                          Model model){
        if(sessionForm == null){
            return "support";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "support";
        }
    }

    @GetMapping("/USpage")
    public String USpage(){
        return "redirect:" + USpageURL;
    }




}
