package ChurchApp.Primesniper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SniperCashRepository extends JpaRepository<SniperCash, Long> {
}
