package ChurchApp.Primesniper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SniperService {

    SniperRepository sniperRepository;

    public List<Sniper> getAllSnipers() {
        return sniperRepository.findAll();

    }

    public Optional<Sniper> getBySniperId(Long id) {
        return sniperRepository.findById(id);
    }

    public String addSniper(Sniper sniper) {
        sniperRepository.save(sniper);
        return "Sniper Added";
    }

    public void deleteSniper(Long id) {
        sniperRepository.deleteById(id);
    }

    public void updateSniper(Sniper updatedSniper) {
            sniperRepository.save(updatedSniper);
        }

}