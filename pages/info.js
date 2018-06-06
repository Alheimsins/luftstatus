import { Layout } from '../components/alheimsins'

export default () => (
  <Layout title='luftstatus.no - Se forurensning og luftkvalitet nær deg.'>
    <div style={{ textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center' }}>Luftforurensing</h1>
      <p>Et voksent menneske puster ca. 10.000 liter luft i løpet av et døgn. Luftkvalitet har derfor stor betydning for folks helse. I flere norske byer og tettsteder kan luftkvaliteten være dårligere enn det som er tillatt i henhold til forurensingsforskriften, og dårligere enn helsemyndighetenes anbefalinger.</p>
      <p>Det er flere forhold som påvirker mengden av luftforurensning, utslippsmengder fra ulike kilder, nærhet til forurensningskilder og lokale meteorologiske og klimatiske forhold. De viktigste kildene til luftforurensning er utslipp fra vegtrafikk, boligoppvarming og industri, samt utslipp fra skip i havn.</p>
      <p>Variasjoner i utslippsmengde fra de ulike forurensningskilder både over døgnet og året, samt variasjoner i lokale meteorologiske forhold, medfører at forurensningsnivået lokalt i byer og tettsteder kan variere mye.</p>
      <p>I Norge er det mest luftforurensning om vinteren. Dette skyldes blant annet at det da er høyest utslipp fra flere kilder, som vedfyring, bruk av piggdekk og eksosutslipp ved bruk av kald motor i kuldegrader. I tillegg forekommer meteorologiske inversjoner som gir dårligere spredningsforholdene om vinteren.</p>
      <p>Nedenfor gis en beskrivelse av de mest aktuelle forurensningsstoffene i Norge.</p>
      <h2>Svevestøv / partikler (PM10 og PM2,5)</h2>
      <p>Svevestøv (eller partikler) omtales gjerne som PM (particulate matter) etterfulgt av et tall som indikerer størrelse på partiklene i mikrometer. PM2,5 er alle partikler som er mindre enn 2,5 µm, og PM10 er alle partikler som er mindre enn 10 µm. Det betyr at svevestøv som inngår i PM2,5 også inngår i betegnelsen PM10.</p>
      <p>I flere norske byer og tettsteder er nivåene av svevestøv høyere enn det helsemyndighetene anbefaler i sine luftkvalitetskriterier.</p>
      <p>En rekke befolkningsundersøkelser fra hele verden viser en sammenheng mellom nivåer av svevestøv i uteluft og sykelighet og dødelighet i befolkningen. Både korttids- og langtidseksponering for PM viser sammenhenger med dødelighet. De viktigste kildene til svevestøv er:</p>
      - PM10: Asfalt-, bremse- og dekkslitasje, strøsand, vedfyring, industri, langtransportert bidrag<br />
      - PM2,5: Vedfyring, eksosutslipp, industri, langtransportert bidrag
      <h2>Nitrogendioksid (NO2)</h2>
      <p>Summen av NO2 og NO kalles for NOx og dannes ved forbrenningsprosesser med høy temperatur.</p>
      <p>NO er i seg selv ikke helseskadelig i de konsentrasjonene som forekommer i norske byer, men NO vil reagere med tilgjengelig bakkenært ozon og danne et ytterligere bidrag til NO2 som er langt mer helseskadelig.</p>
      <p>I flere norske byer er nivået av NO2 høyere enn tillatt grenseverdi. Overskridelser er mest vanlig i de største byene, mens NO2 konsentrasjoner sjeldent er et problem på mindre tettsteder.</p>

      <p>Effekter av langvarig eksponering for NO2 er undersøkt i befolkningsstudier. Flere studier viser sammenheng med astma, bronkitt, lungefunksjon og dødelighet.</p>
      <p>Viktigste kilde til utslipp av NO2 (og NO) er eksosutslipp fra veitrafikk, noen steder kan også utslipp fra industri eller skipstrafikk være en relevant kilde. Langtransportert forurensning kan også bidra. I de store byene er det dieselkjøretøy som slipper ut mest NO2.</p>

      <h2>Svoveldioksid (SO2)</h2>
      <p>Svoveldioksid (SO2) dannes ved forbrenning av stoffer som inneholder svovel – i hovedsak olje og kull, samt ved en rekke industriprosesser.</p>
      <p>Kraftverk, oljeraffineri og andre store industrianlegg er hovedkilden til SO2-utslipp i dag. Luftforurensing avSO2 er bare et problem i noen få norske byer hvor industri forårsaker lokale utslipp.</p>

      <h2>Karbonmonoksid (CO)</h2>
      <p>Karbonmonoksid (CO) dannes ved ufullstendig forbrenning av organisk materiale, som for eksempel bensin, diesel og ved.</p>
      <p>I uteluft i norske byer og tettsteder er nivåene av CO normalt så lave at det ikke skal være noen fare for helseskader.</p>

      <h2>Ozon (O3)</h2>
      <p>Ozon er en reaktiv gass som finnes både nær bakken og i stratosfæren. Det er bakkenært ozon som omtales her og som kan føre til helseskadelige effekter.</p>
      <p>Ozon i stratosfæren beskytter jorden mot skadelig UV-stråling. Ozon dannes av reaksjoner mellom NOx, flyktige organiske forbindelser (VOC) og sollys.</p>
      <p>Konsentrasjoner av ozon i Norge kommer hovedsakelig som følge av langtransportert bidrag fra kontinentet. Bakkenært ozon kan være et miljøproblem ved at det skader vegetasjon, materialer eller folks helse.</p>

      <h2>Benzen (C6H6)</h2>
      <p>Benzen er en flyktig organisk forbindelse som finnes i oljeprodukter. I norske byer og tettsteder er målte konsentrasjoner av benzen lavere enn gjeldende grenseverdi.</p>
      <p>Hovedkilden til benzen i byluft er avdampning fra uforbrent bensin. Utslippet kan også komme fra forbrenningsprosessen.</p>
    </div>
  </Layout>
)
