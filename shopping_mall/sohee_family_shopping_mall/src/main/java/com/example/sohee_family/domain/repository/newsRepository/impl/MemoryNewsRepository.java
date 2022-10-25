package com.example.sohee_family.domain.repository.newsRepository.impl;

import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.dto.News;
import com.example.sohee_family.domain.repository.newsRepository.inf.NewsRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryNewsRepository implements NewsRepository {

    private static Map<Long, News> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;

    @Override
    public News save(News news) {
        news.setNewsManageSeq(manageSequence++);
        store.put(news.getNewsManageSeq(), news);
        return news;
    }

    @Override
    public Optional<News> findNewsByNewsManageSeq(Long newsManageSeq) {
        return Optional.of(store.get(newsManageSeq));
    }

    @Override
    public List<News> findAllNews() {
        return new ArrayList<>(store.values());
    }

    @Override
    public void removeNewsByManageSeq(Long newsManageSeq) {
        store.remove(newsManageSeq);
    }
}
