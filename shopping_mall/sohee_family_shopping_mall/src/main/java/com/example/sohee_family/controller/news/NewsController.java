package com.example.sohee_family.controller.news;

import com.example.sohee_family.config.sessionConst.SessionConst;
import com.example.sohee_family.config.sessionForm.SessionForm;
import com.example.sohee_family.domain.dto.News;
import com.example.sohee_family.domain.repository.newsRepository.inf.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.List;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class NewsController {
    private final NewsRepository newsRepository;

    @GetMapping("/news")
    public String news(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm,
                       Model model){
        List<News> newsList = newsRepository.findAllNews();
        model.addAttribute("newsList", newsList);
        if(sessionForm == null){
            return "news";
        }else{
            model.addAttribute("sessionForm", sessionForm);
            return "news";
        }
    }

    @GetMapping("/news/{newsManageSeq}")
    public String newsDetail(@SessionAttribute(name = SessionConst.LOGIN_SESSION_KEY, required = false) SessionForm sessionForm
            ,@PathVariable("newsManageSeq")Long newsManageSeq, Model model) {
        Optional<News> news = newsRepository.findNewsByNewsManageSeq(newsManageSeq);
        if(news.isPresent()){
            model.addAttribute("news", news.get());
        }
        if(sessionForm != null){
            model.addAttribute("sessionForm", sessionForm);
        }
        return "news-detail";
    }
}
