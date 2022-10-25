package com.example.sohee_family.domain.repository.designRepository.impl;

import com.example.sohee_family.domain.dto.Design;
import com.example.sohee_family.domain.repository.designRepository.inf.DesignRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class MemoryDesignRepository implements DesignRepository {
    private static Map<Long, Design> store = new ConcurrentHashMap<>();
    private static long manageSequence = 0L;
    @Override
    public Design save(Design design) {
        design.setDesignManageSeq(manageSequence++);
        store.put(design.getDesignManageSeq(), design);
        return design;
    }

    @Override
    public Optional<Design> findDesignByManageSeq(Long designManageSeq) {
        return findAllDesign().stream()
                .filter(d -> d.getDesignManageSeq().equals(designManageSeq))
                .findFirst();
    }

    @Override
    public List<Design> findAllDesign() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Design updateDesignByManageSeq(Long designManageSeq, Design updatedDesign) {
        Optional<Design> design = findDesignByManageSeq(designManageSeq);
        if (design.isEmpty()) {
            return null;
        }
        store.put(design.get().getDesignManageSeq(), updatedDesign);
        return updatedDesign;
    }

    @Override
    public void removeDesignByManageSeq(Long designManageSeq) {
        if (findDesignByManageSeq(designManageSeq).isPresent()) {
            store.remove(designManageSeq);
        }
    }
}
