package com.example.sohee_family.domain.repository.newsRepository.inf;

import com.example.sohee_family.domain.dto.News;

import java.util.List;
import java.util.Optional;

public interface NewsRepository {
    //뉴스 저장 (C)
    News save(News news);

    //newsManageSeq로 조회(R)
    Optional<News> findNewsByNewsManageSeq(Long newsManageSeq);

    //모든 news 조회(R)
    List<News> findAllNews();

    //news 삭제(D)
    void removeNewsByManageSeq(Long newsManageSeq);
}
