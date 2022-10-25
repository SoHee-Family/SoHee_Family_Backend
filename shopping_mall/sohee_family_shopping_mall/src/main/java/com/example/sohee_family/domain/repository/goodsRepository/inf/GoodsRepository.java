package com.example.sohee_family.domain.repository.goodsRepository.inf;

import com.example.sohee_family.domain.dto.Goods;

import java.util.List;
import java.util.Optional;

public interface GoodsRepository {

    // 상품 저장 (C)
    Goods save(Goods goods);

    // GoodsManageSeq로 조회(R)
    Optional<Goods> findGoodsByManageSeq(Long goodsManageSeq);

    //모든 Goods 조회(R)
    List<Goods> findAllGoods();

    //Goods 업데이트 (U)
    Goods updateGoodsByManageSeq(Long goodsManageSeq, Goods updatedGoods);

    //Goods 삭제(D)
    void removeGoodsByManageSeq(Long goodsManageSeq);
}
