package ChurchApp.Primesniper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SniperDto {
    private Long id;
    private Long sniperId;
    private String month;
    private Float cash;

}
