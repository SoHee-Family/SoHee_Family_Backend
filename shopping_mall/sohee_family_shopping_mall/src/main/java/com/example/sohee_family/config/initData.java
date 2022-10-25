package com.example.sohee_family.config;

import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.dto.Goods;
import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.dto.News;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import com.example.sohee_family.domain.repository.goodsRepository.inf.GoodsRepository;
import com.example.sohee_family.domain.repository.memberRepository.impl.MemoryMemberRepository;
import com.example.sohee_family.domain.repository.newsRepository.inf.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@RequiredArgsConstructor
public class initData {
    private final MemoryMemberRepository memberRepository;
    private final GoodsRepository goodsRepository;
    private final DesignRepository designRepository;
    private final NewsRepository newsRepository;

    @PostConstruct
    public void init() {
        //member init data
        memberRepository.save(new Member("kim", "kim", "김지용", "010-6277-0650", "서울시 구로구 오류2동", "colorful8315@naver.com"));

        //goods init data
        goodsRepository.save(new Goods("텀블러", 3000, "tumbler.PNG"));
        goodsRepository.save(new Goods("티셔츠", 2000, "tshirts.PNG"));
        goodsRepository.save(new Goods("키링", 1500, "keyring.PNG"));

        //design init data
        designRepository.save(new Design("아보카도 일러스트", 20000, "abocado.jpg","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 아보카도 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",123,"3.2"));
        designRepository.save(new Design("아티스트 일러스트", 20000, "artist.png","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 아티스트 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",35,"2.4"));
        designRepository.save(new Design("뼝아리 일러스트", 20000, "chicken.jpg","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 뼝아리 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",52,"4.1"));
        designRepository.save(new Design("큐티베어 일러스트", 20000, "cutybear.jpg","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 큐티 베어 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",41,"2.2"));
        designRepository.save(new Design("북극곰 일러스트", 20000, "polarbear.jpg","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 북극곰 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",83,"3.5"));
        designRepository.save(new Design("토끼츄 일러스트", 20000, "rabitchu.jpg","독거노인과 소년소녀 가장이 프로그램을 통해 제작된 토끼츄 일러스트 입니다" +
                "많은 사랑 부탁 드립니다.",20,"2.2"));

        //news init data
        newsRepository.save(new News("donation", "사랑의 쌀 기부", "riceDonation.png", "SoHee's Family 주식회사 사랑의 쌀 나눔 봉사", "2022-10-18 사랑의 쌀 나눔 봉사에 참여해 빈곤 가정 아동 지원을 약속"));
        newsRepository.save(new News("volunteer", "사랑의 열무김치 나눔 봉사", "volunteerkimchi.png", "SoHee's Family 주식회사 사랑의 열무김치 나눔 봉사", "2022-10-20 사랑의 열무 김치 나눔 봉사에 참여 "));


    }
}
