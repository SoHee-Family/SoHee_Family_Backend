package com.example.sohee_family.domain.repository.wishListRepository.impl;

import com.example.sohee_family.domain.dto.WishDesign;
import com.example.sohee_family.domain.repository.wishListRepository.inf.WishListRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class MemoryWishListRepository implements WishListRepository {
    private static Map<Long, WishDesign> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;

    @Override
    public WishDesign save(WishDesign wishDesign) {
        wishDesign.setWishListManageSeq(manageSequence++);
        store.put(wishDesign.getWishListManageSeq(), wishDesign);
        return null;
    }

    @Override
    public List<WishDesign> findByMemberManageSeq(Long memberManageSeq) {
        return store.values().stream()
                .filter(w -> w.getMemberManageSeq().equals(memberManageSeq))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long wishListManageSeq) {
        store.remove(wishListManageSeq);
    }
}
