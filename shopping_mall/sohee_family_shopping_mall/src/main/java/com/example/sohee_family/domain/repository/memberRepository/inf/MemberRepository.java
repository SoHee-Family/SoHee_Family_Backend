package com.example.sohee_family.domain.repository.memberRepository.inf;

import com.example.sohee_family.domain.dto.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {

    //회원 저장 (C)
    Member save(Member member);

    // LoginId로 회원 조회 (R)
    Optional<Member> findMemberByLoginId(String loginId);

    //모든 회원 조회 (R)
    List<Member> findAll();

    // 회원 정보 업데이트 (U)
    Member updateByManageSeq(Long manageSeq, Member updatedMember);


    //manageSeq로 회원 찾기
    Optional<Member> findMemberByManageSeq(Long manageSeq);

    // 회원 탈퇴 (D)
    void removeByManageSeq(Long manageSeq);

}
