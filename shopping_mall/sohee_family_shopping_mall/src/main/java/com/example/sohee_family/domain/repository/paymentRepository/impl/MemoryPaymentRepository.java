package com.example.sohee_family.domain.repository.paymentRepository.impl;

import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.dto.Payment;
import com.example.sohee_family.domain.repository.paymentRepository.inf.PaymentRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class MemoryPaymentRepository implements PaymentRepository {
    private static Map<Long, Payment> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;

    @Override
    public Payment save(Payment payment) {
        payment.setPaymentManageSeq(manageSequence++);
        store.put(payment.getPaymentManageSeq(), payment);
        return payment;
    }

    @Override
    public Optional<Payment> findPaymentByPaymentManageSeq(Long paymentManageSeq) {
        return findAllPayment().stream()
                .filter(p -> p.getPaymentManageSeq().equals(paymentManageSeq))
                .findFirst();
    }

    @Override
    public List<Payment> findPaymentByMemberManageSeq(Long memberManageSeq) {
        return findAllPayment().stream()
                .filter(p -> p.getPayMemberManageSeq().equals(memberManageSeq))
                .collect(Collectors.toList());
    }

    @Override
    public List<Payment> findAllPayment() {
        return new ArrayList<>(store.values());
    }

    @Override
    public void removePaymentByPaymentManageSeq(Long paymentManageSeq) {
        if (findPaymentByPaymentManageSeq(paymentManageSeq).isPresent()) {
            store.remove(paymentManageSeq);
        }
    }
}
