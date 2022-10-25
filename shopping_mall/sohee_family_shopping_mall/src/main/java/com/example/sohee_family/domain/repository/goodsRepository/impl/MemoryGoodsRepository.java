package com.example.sohee_family.domain.repository.goodsRepository.impl;

import com.example.sohee_family.domain.dto.Goods;
import com.example.sohee_family.domain.repository.goodsRepository.inf.GoodsRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryGoodsRepository implements GoodsRepository {
    private static Map<Long, Goods> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;
    @Override
    public Goods save(Goods goods) {
        goods.setGoodsManageSeq(manageSequence++);
        store.put(goods.getGoodsManageSeq(), goods);
        return goods;
    }

    @Override
    public Optional<Goods> findGoodsByManageSeq(Long goodsManageSeq) {
        return findAllGoods().stream()
                .filter(g -> g.getGoodsManageSeq().equals(goodsManageSeq))
                .findFirst();
    }

    @Override
    public List<Goods> findAllGoods() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Goods updateGoodsByManageSeq(Long goodsManageSeq, Goods updatedGoods) {
        Optional<Goods> goods = findGoodsByManageSeq(goodsManageSeq);
        if(goods.isEmpty()){
            return null;
        }
        store.put(goods.get().getGoodsManageSeq(), updatedGoods);
        return updatedGoods;
    }

    @Override
    public void removeGoodsByManageSeq(Long goodsManageSeq) {
        if(findGoodsByManageSeq(manageSequence).isPresent()){
            store.remove(goodsManageSeq);
        }

    }
}
