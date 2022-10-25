package com.example.sohee_family.domain.repository.paymentRepository.inf;

import com.example.sohee_family.domain.dto.Payment;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository {

    // 결제 (C)
    Payment save(Payment payment);

    // 결제 관리 번호로 조회(R)
    Optional<Payment> findPaymentByPaymentManageSeq(Long paymentManageSeq);

    // 결제 회원 관리 번호로 조회 (R)
    List<Payment> findPaymentByMemberManageSeq(Long memberManageSeq);

    // 모든 결제 조회(R)
    List<Payment> findAllPayment();

    // 결제 취소 (D)
    void removePaymentByPaymentManageSeq(Long paymentManageSeq);

}
