package ChurchApp.Primesniper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import java.time.Month;
import java.util.Optional;


@Service
@AllArgsConstructor
public class SniperCashService {

    SniperCashRepository sniperCashRepository;
    SniperRepository sniperRepository;
    public void sendCash(SniperDto sniperDto) {
        SniperCash sniperCash = new SniperCash();
        sniperCash.setCash(sniperDto.getCash());
        sniperCash.setMonth(Month.valueOf(sniperDto.getMonth().toUpperCase()));
        sniperCash.setSniperId(sniperRepository.findById(sniperDto.getSniperId()).orElse(null)); // Fetching Sniper by ID

        //Use Sniper class to set has cash to true when Sniper has cash
        Sniper sniper = sniperCash.getSniperId();
        sniper.setHasCash(true);
        sniperRepository.save(sniper);


        sniperCashRepository.save(sniperCash);
    }
    public List<SniperCash> getAllCash() {
        return sniperCashRepository.findAll();
    }


    public Optional<SniperCash> getSniperCash(Long id) {
        return sniperCashRepository.findById(id);
    }
}
