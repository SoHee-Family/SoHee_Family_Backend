package com.example.sohee_family.domain.repository.memberRepository.impl;

import com.example.sohee_family.domain.dto.Member;
import com.example.sohee_family.domain.repository.memberRepository.inf.MemberRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;

    @Override
    public Member save(Member member) {
        member.setMemberManageSeq(manageSequence++);
        store.put(member.getMemberManageSeq(), member);
        return member;
    }

    @Override
    public Optional<Member> findMemberByLoginId(String loginId) {
        return findAll().stream()
                .filter(m -> m.getId().equals(loginId))
                .findFirst();
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Member updateByManageSeq(Long manageSeq, Member updatedMember) {
        Optional<Member> member = findMemberByManageSeq(manageSeq);
        if(member.isEmpty()){
            return null;
        }
        store.put(member.get().getMemberManageSeq(), updatedMember);
        return updatedMember;
    }

    @Override
    public Optional<Member> findMemberByManageSeq(Long manageSeq) {
        if(store.containsKey(manageSeq)){
            return Optional.of(store.get(manageSeq));
        }
        return Optional.empty();
    }

    @Override
    public void removeByManageSeq(Long manageSeq) {
        if(!findMemberByManageSeq(manageSeq).isEmpty()){
            store.remove(manageSeq);
        }
    }
}
