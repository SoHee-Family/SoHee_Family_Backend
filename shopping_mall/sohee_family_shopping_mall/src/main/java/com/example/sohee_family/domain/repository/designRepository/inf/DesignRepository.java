package com.example.sohee_family.domain.repository.designRepository.inf;

import com.example.sohee_family.domain.dto.Design;

import java.util.List;
import java.util.Optional;

public interface DesignRepository {

    //디자인 저장(C)
    Design save(Design design);

    //DesignManageSeq로 조회(R)
    Optional<Design> findDesignByManageSeq(Long designManageSeq);

    //모든 Design 조회(R)
    List<Design> findAllDesign();

    // 회원 정보 업데이트 (U)
    Design updateDesignByManageSeq(Long designManageSeq, Design updatedDesign);

    //디자인 삭제(D)
    void removeDesignByManageSeq(Long designManageSeq);


}
