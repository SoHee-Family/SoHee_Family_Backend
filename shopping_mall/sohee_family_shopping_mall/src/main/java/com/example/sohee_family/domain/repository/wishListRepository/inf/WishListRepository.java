package com.example.sohee_family.domain.repository.wishListRepository.inf;

import com.example.sohee_family.domain.dto.WishDesign;

import java.util.List;

public interface WishListRepository {
    // 디자인 찜하기
    WishDesign save(WishDesign wishDesign);

    //회원 관리 번호로 찜목록 찾기
    List<WishDesign> findByMemberManageSeq(Long memberManageSeq);

    // 디자인 찜하기 취소
    void delete(Long wishListManageSeq);

}
