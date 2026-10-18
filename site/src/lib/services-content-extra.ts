// Дополнительные страницы услуг: кровля, фасады, ванные, электрика, сантехника.
// Тексты написаны под реальные локальные запросы (Tallinn, Harjumaa) без переспама.

import type { Lang } from "./i18n";
import type { ServiceContent } from "./services-content";
import type { ServiceKey } from "./routes-map";

type ExtraKey = "roof" | "facade" | "bathroom-renovation" | "electrical" | "plumbing";

export const EXTRA_SERVICE_CONTENT: Record<ExtraKey, Record<Lang, ServiceContent>> = {
  roof: {
    et: {
      h1: "Katusetööd Tallinnas ja Harjumaal",
      title: "Katusetööd Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Katuse ehitus, vahetus ja remont Tallinnas ning Harjumaal: katusekate, aluskonstruktsioon, soojustus, vihmaveesüsteem. Küsi pakkumist LAVANER OÜ-lt.",
      lead: "Ehitame ja remondime katuseid Tallinnas, Harjumaal ja lähiümbruses. Vahetame katusekatte, parandame roovituse ja sarikad, paigaldame soojustuse ning vihmaveesüsteemi.",
      forWhom: [
        "Eramaja omanikud, kelle katus lekib või on amortiseerunud",
        "Korteriühistud, kes planeerivad katuse kapitaalremonti",
        "Ärihoonete omanikud, kes vajavad lamekatuse hooldust või vahetust",
      ],
      solves: [
        "Lekkiv katus ja niiskuskahjustused pööningul",
        "Vana katusekate, mis ei pea enam Eesti talve vastu",
        "Mädanenud sarikad, roovitus ja katuse aluskonstruktsioon",
        "Puuduv või vale soojustus ja ventilatsioon katuslaes",
      ],
      includes: [
        "Katuse ülevaatus ja seisukorra hindamine objektil",
        "Vana katusekatte demonteerimine ja utiliseerimine",
        "Sarikate, roovituse ja aluskatte taastamine või vahetus",
        "Plekk-, kivi-, bituumen- ja lamekatuse katted",
        "Katuse soojustamine ja tuulutuse korraldamine",
        "Vihmaveesüsteem, räästad, korstna- ja läbiviikude tihendus",
      ],
      faq: [
        {
          q: "Kas saate katuse üle vaadata enne pakkumist?",
          a: "Jah. Tuleme objektile Tallinnas või Harjumaal kohale, hindame katuse seisukorra ja alles seejärel koostame kirjaliku hinnapakkumise.",
        },
        {
          q: "Kas remondite ka osaliselt või ainult terve katuse?",
          a: "Teeme mõlemat. Kui konstruktsioon on korras, piisab sageli katte või sõlmede remondist; kui kandekonstruktsioon on kahjustatud, soovitame katuse täielikku uuendamist.",
        },
        {
          q: "Millal on katusetöid kõige mõistlikum teha?",
          a: "Parim aeg on kevadest sügiseni, kuid plaanime tööd ka talvel, jagades need etappideks ja kaitstes avatud konstruktsioonid ilmastiku eest.",
        },
      ],
    },
    ru: {
      h1: "Кровельные работы в Таллинне и Харьюмаа",
      title: "Кровельные работы в Таллинне и Харьюмаа | LAVANER OÜ",
      description:
        "Строительство, замена и ремонт крыши в Таллинне и Харьюмаа: покрытие, стропила, утепление, водосточная система. Запросите предложение LAVANER OÜ.",
      lead: "Строим и ремонтируем крыши в Таллинне, Харьюмаа и окрестностях: меняем покрытие, восстанавливаем обрешётку и стропила, утепляем и монтируем водосток.",
      forWhom: [
        "Владельцы частных домов с протекающей или изношенной крышей",
        "Квартирные товарищества, планирующие капитальный ремонт кровли",
        "Владельцы коммерческих зданий с плоской кровлей",
      ],
      solves: [
        "Протечки и следы влаги на чердаке",
        "Старое покрытие, не выдерживающее эстонскую зиму",
        "Повреждённые стропила, обрешётка и основание кровли",
        "Отсутствующее утепление и неправильная вентиляция",
      ],
      includes: [
        "Осмотр крыши и оценка состояния на объекте",
        "Демонтаж старого покрытия и вывоз мусора",
        "Восстановление или замена стропил, обрешётки, подкровельной плёнки",
        "Металлические, черепичные, битумные и плоские кровли",
        "Утепление кровли и организация вентиляции",
        "Водосточная система, карнизы, примыкания и узлы дымохода",
      ],
      faq: [
        {
          q: "Осматриваете ли вы крышу до расчёта?",
          a: "Да. Приезжаем на объект в Таллинне или Харьюмаа, оцениваем состояние крыши и только затем готовим письменное предложение.",
        },
        {
          q: "Делаете ли вы частичный ремонт?",
          a: "Да. Если конструкция в порядке, часто достаточно ремонта покрытия и узлов; при повреждении несущей части рекомендуем полное обновление.",
        },
        {
          q: "Когда лучше проводить кровельные работы?",
          a: "Оптимально с весны до осени, но планируем работы и зимой — этапами, с защитой открытых конструкций от осадков.",
        },
      ],
    },
    en: {
      h1: "Roofing works in Tallinn and Harjumaa",
      title: "Roofing Works in Tallinn and Harjumaa | LAVANER OÜ",
      description:
        "Roof construction, replacement and repair in Tallinn and Harjumaa: roofing, rafters, insulation, gutters. Request a quote from LAVANER OÜ.",
      lead: "We build and repair roofs in Tallinn, Harjumaa and nearby areas: roof covering, rafters and battens, insulation and rainwater systems.",
      forWhom: [
        "Private house owners with a leaking or worn roof",
        "Apartment associations planning a full roof renovation",
        "Commercial property owners with flat roofs",
      ],
      solves: [
        "Leaks and moisture damage in the attic",
        "Old covering that no longer survives Estonian winters",
        "Damaged rafters, battens and roof structure",
        "Missing insulation and poor roof ventilation",
      ],
      includes: [
        "Roof inspection and condition assessment on site",
        "Removal and disposal of the old covering",
        "Repair or replacement of rafters, battens and underlay",
        "Sheet metal, tile, bitumen and flat roof coverings",
        "Roof insulation and ventilation",
        "Gutters, eaves, chimney and penetration detailing",
      ],
      faq: [
        {
          q: "Do you inspect the roof before quoting?",
          a: "Yes. We visit the property in Tallinn or Harjumaa, assess the roof and only then prepare a written quote.",
        },
        {
          q: "Do you carry out partial repairs?",
          a: "Yes. If the structure is sound, repairing the covering and details is often enough; if the load-bearing structure is damaged we recommend full renewal.",
        },
        {
          q: "When is the best time for roofing work?",
          a: "Spring to autumn is ideal, but we also plan winter work in stages, protecting open structures from the weather.",
        },
      ],
    },
  },

  facade: {
    et: {
      h1: "Fassaaditööd Tallinnas ja Harjumaal",
      title: "Fassaaditööd Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Fassaadi soojustamine, krohvimine, voodrivahetus ja välisviimistlus Tallinnas ning Harjumaal. LAVANER OÜ teeb fassaaditööd ühe meeskonnaga.",
      lead: "Soojustame ja viimistleme fassaade: krohv, puit- ja plaatvoodrid, sokkel ning välisviimistluse remont. Töötame Tallinnas, Harjumaal ja kokkuleppel mujal Eestis.",
      forWhom: [
        "Eramajade omanikud, kes soovivad hoone soojemaks ja korrastatuks muuta",
        "Korteriühistud, kes plaanivad fassaadi renoveerimist",
        "Ettevõtted, kelle ärihoone välisilme vajab uuendamist",
      ],
      solves: [
        "Kõrged küttekulud halva soojustuse ja külmasildade tõttu",
        "Pragunenud, määrdunud või kooruv välisviimistlus",
        "Niiskuskahjustused sokli ja seinte piirkonnas",
        "Vananenud voodrilaud ja kahjustatud fassaadidetailid",
      ],
      includes: [
        "Fassaadi seisukorra hindamine ja lahenduse valik",
        "Soojustamine (vill, EPS) koos tuulutuse lahendusega",
        "Krohvifassaad, ventileeritav fassaad, puit- ja plaatvooder",
        "Sokli viimistlus ja hüdroisolatsioon",
        "Akna- ja uksepalede vormistamine",
        "Vana viimistluse eemaldamine ja prahi äravedu",
      ],
      faq: [
        {
          q: "Kui palju fassaadi soojustamine küttekulusid vähendab?",
          a: "Tulemus sõltub hoone praegusest seisukorrast ja valitud soojustuse paksusest. Hindame olukorra objektil ja selgitame, millist kokkuhoidu on teie majal realistlik oodata.",
        },
        {
          q: "Kas teete ka ainult fassaadi remonti ilma soojustamiseta?",
          a: "Jah. Teostame nii osalist remonti ja ülevärvimist kui ka täielikku soojustamist koos uue viimistlusega.",
        },
        {
          q: "Kas tegelete ka ehitusloa ja projektiga?",
          a: "Aitame vajaliku dokumentatsiooni ja projekteerimisega — see käib meie projekteerimisteenuse alla.",
        },
      ],
    },
    ru: {
      h1: "Фасадные работы в Таллинне и Харьюмаа",
      title: "Фасадные работы в Таллинне и Харьюмаа | LAVANER OÜ",
      description:
        "Утепление фасада, штукатурка, замена обшивки и наружная отделка в Таллинне и Харьюмаа. LAVANER OÜ выполняет фасадные работы одной командой.",
      lead: "Утепляем и отделываем фасады: штукатурка, деревянная и плитная обшивка, цоколь и ремонт наружной отделки. Работаем в Таллинне, Харьюмаа и по договорённости по Эстонии.",
      forWhom: [
        "Владельцы частных домов, желающие утеплить и обновить здание",
        "Квартирные товарищества, планирующие реновацию фасада",
        "Компании, чьё здание нуждается в обновлении внешнего вида",
      ],
      solves: [
        "Высокие расходы на отопление из-за плохого утепления",
        "Трещины, загрязнения и отслаивающаяся отделка",
        "Повреждения от влаги в зоне цоколя и стен",
        "Изношенная обшивка и повреждённые фасадные узлы",
      ],
      includes: [
        "Оценка состояния фасада и выбор решения",
        "Утепление (минвата, EPS) с правильной вентиляцией",
        "Штукатурный и вентилируемый фасад, дерево, плиты",
        "Отделка и гидроизоляция цоколя",
        "Оформление оконных и дверных откосов",
        "Демонтаж старой отделки и вывоз мусора",
      ],
      faq: [
        {
          q: "Насколько утепление снизит расходы на отопление?",
          a: "Результат зависит от текущего состояния здания и толщины утеплителя. Оцениваем ситуацию на объекте и объясняем, какая экономия реалистична именно для вашего дома.",
        },
        {
          q: "Делаете ли ремонт фасада без утепления?",
          a: "Да. Выполняем как частичный ремонт и покраску, так и полное утепление с новой отделкой.",
        },
        {
          q: "Помогаете ли с проектом и разрешением?",
          a: "Да, помогаем с документацией и проектированием — это входит в нашу услугу проектирования.",
        },
      ],
    },
    en: {
      h1: "Facade works in Tallinn and Harjumaa",
      title: "Facade Works in Tallinn and Harjumaa | LAVANER OÜ",
      description:
        "Facade insulation, plastering, cladding replacement and exterior finishing in Tallinn and Harjumaa by LAVANER OÜ. Request a quote.",
      lead: "We insulate and finish facades: plaster, timber and panel cladding, plinth work and exterior repairs in Tallinn, Harjumaa and across Estonia by agreement.",
      forWhom: [
        "House owners who want a warmer, renewed building",
        "Apartment associations planning facade renovation",
        "Companies whose commercial building needs a new exterior",
      ],
      solves: [
        "High heating costs caused by poor insulation and thermal bridges",
        "Cracked, dirty or peeling exterior finishes",
        "Moisture damage around the plinth and walls",
        "Worn cladding and damaged facade details",
      ],
      includes: [
        "Facade condition assessment and solution selection",
        "Insulation (mineral wool, EPS) with correct ventilation",
        "Plastered and ventilated facades, timber and panel cladding",
        "Plinth finishing and waterproofing",
        "Window and door reveal detailing",
        "Removal of old finishes and waste disposal",
      ],
      faq: [
        {
          q: "How much will facade insulation reduce heating costs?",
          a: "It depends on the current condition of the building and the insulation thickness. We assess the property and explain the saving that is realistic for your house.",
        },
        {
          q: "Do you repair facades without insulating?",
          a: "Yes. We carry out both partial repairs and repainting, and full insulation with new finishing.",
        },
        {
          q: "Do you help with the project and permit?",
          a: "Yes, documentation and design are covered by our design and planning service.",
        },
      ],
    },
  },

  "bathroom-renovation": {
    et: {
      h1: "Vannitoa remont Tallinnas",
      title: "Vannitoa remont Tallinnas | LAVANER OÜ",
      description:
        "Vannitoa täisremont Tallinnas: lammutus, hüdroisolatsioon, plaatimine, torustik ja elektritööd ühe meeskonnaga. Küsi hinnapakkumist LAVANER OÜ-lt.",
      lead: "Teeme vannitoa remondi Tallinnas ja Harjumaal algusest lõpuni: lammutus, hüdroisolatsioon, torustik, elekter, plaatimine ja sisustuse paigaldus.",
      forWhom: [
        "Korteriomanikud, kelle vannituba on vana või lekib",
        "Eramaja omanikud, kes soovivad vannituba ümber planeerida",
        "Üürileandjad, kes valmistavad korterit üürile või müügiks ette",
      ],
      solves: [
        "Vana hüdroisolatsioon ja niiskuskahjustus naabrite suunas",
        "Amortiseerunud torustik ja ummistused",
        "Ebamugav plaan: mahub vähe, ventilatsioon ei tööta",
        "Kulunud plaadid, vuugid ja sanitaartehnika",
      ],
      includes: [
        "Vana vannitoa lammutus ja praht objektilt ära",
        "Vee- ja kanalisatsioonitorustiku vahetus",
        "Elektri- ja valgustuslahendus, soojendusega põrand",
        "Hüdroisolatsioon põrandal ja märgpiirkonna seintel",
        "Plaatimine, vuukimine ja silikoonitööd",
        "Ventilatsiooni korrastamine ning sanitaartehnika ja mööbli paigaldus",
      ],
      faq: [
        {
          q: "Kui kaua vannitoa remont kestab?",
          a: "Tavalise korteri vannitoa täisremont võtab enamasti 2–4 nädalat, sõltuvalt mahust, plaatimise keerukusest ja materjalide tarnest. Täpse graafiku anname pärast ülevaatust.",
        },
        {
          q: "Kas tellite materjalid ise?",
          a: "Saame materjalid tellida ja objektile tuua või paigaldada teie valitud materjalid — lepime kokku enne tööde algust.",
        },
        {
          q: "Kas teete ka torustiku ja elektri?",
          a: "Jah, santehnilised ja elektritööd teostame oma meeskonnaga, nii et te ei pea eraldi tegijaid otsima.",
        },
      ],
    },
    ru: {
      h1: "Ремонт ванной комнаты в Таллинне",
      title: "Ремонт ванной комнаты в Таллинне | LAVANER OÜ",
      description:
        "Полный ремонт ванной в Таллинне: демонтаж, гидроизоляция, плитка, сантехника и электрика одной командой. Запросите расчёт у LAVANER OÜ.",
      lead: "Выполняем ремонт ванной в Таллинне и Харьюмаа под ключ: демонтаж, гидроизоляция, трубы, электрика, плитка и установка сантехники.",
      forWhom: [
        "Владельцы квартир со старой или протекающей ванной",
        "Владельцы домов, планирующие перепланировку санузла",
        "Арендодатели, готовящие квартиру к сдаче или продаже",
      ],
      solves: [
        "Старая гидроизоляция и риск залить соседей",
        "Изношенные трубы и засоры",
        "Неудобная планировка и неработающая вентиляция",
        "Изношенная плитка, швы и сантехника",
      ],
      includes: [
        "Демонтаж старой ванной и вывоз мусора",
        "Замена водопровода и канализации",
        "Электрика, освещение, тёплый пол",
        "Гидроизоляция пола и стен мокрой зоны",
        "Укладка плитки, затирка, силиконовые швы",
        "Вентиляция, установка сантехники и мебели",
      ],
      faq: [
        {
          q: "Сколько длится ремонт ванной?",
          a: "Полный ремонт ванной в квартире обычно занимает 2–4 недели в зависимости от объёма, сложности укладки и поставки материалов. Точный график даём после осмотра.",
        },
        {
          q: "Заказываете ли вы материалы?",
          a: "Можем закупить и привезти материалы или смонтировать выбранные вами — согласуем до начала работ.",
        },
        {
          q: "Делаете ли сантехнику и электрику?",
          a: "Да, сантехнические и электромонтажные работы выполняет наша команда, отдельных мастеров искать не нужно.",
        },
      ],
    },
    en: {
      h1: "Bathroom renovation in Tallinn",
      title: "Bathroom Renovation in Tallinn | LAVANER OÜ",
      description:
        "Full bathroom renovation in Tallinn: demolition, waterproofing, tiling, plumbing and electrical work by one team. Request a quote from LAVANER OÜ.",
      lead: "We renovate bathrooms in Tallinn and Harjumaa end to end: demolition, waterproofing, pipework, electrics, tiling and fitting.",
      forWhom: [
        "Apartment owners with an old or leaking bathroom",
        "House owners planning a new bathroom layout",
        "Landlords preparing a property for rent or sale",
      ],
      solves: [
        "Old waterproofing and the risk of damaging neighbours' property",
        "Worn pipework and blockages",
        "Impractical layout and poor ventilation",
        "Worn tiles, joints and sanitary ware",
      ],
      includes: [
        "Strip-out of the old bathroom and waste removal",
        "Replacement of water and sewage pipework",
        "Electrics, lighting and underfloor heating",
        "Waterproofing of floors and wet-area walls",
        "Tiling, grouting and silicone work",
        "Ventilation, sanitary ware and furniture installation",
      ],
      faq: [
        {
          q: "How long does a bathroom renovation take?",
          a: "A full apartment bathroom usually takes 2–4 weeks depending on scope, tiling complexity and material lead times. We confirm the schedule after the site visit.",
        },
        {
          q: "Do you order the materials?",
          a: "We can purchase and deliver materials or install the ones you choose — agreed before work starts.",
        },
        {
          q: "Do you also do plumbing and electrics?",
          a: "Yes, our own team carries out plumbing and electrical work, so you do not need separate contractors.",
        },
      ],
    },
  },

  electrical: {
    et: {
      h1: "Elektritööd Tallinnas",
      title: "Elektritööd Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Elektritööd Tallinnas ja Harjumaal: juhtmestiku vahetus, elektrikilbid, pistikud, valgustus ning elektritööd remondi käigus. Küsi hinnapakkumist.",
      lead: "Teostame elektritöid korterites, eramajades ja äripindadel: uus juhtmestik, elektrikilp, pistikud ja lülitid, valgustus ning elektritööd remondi osana.",
      forWhom: [
        "Korteri- ja majaomanikud, kelle elektrisüsteem on vana",
        "Kliendid, kes teevad täisremonti ja vajavad uut juhtmestikku",
        "Äripinnad, kus muutub ruumiplaan ja koormus",
      ],
      solves: [
        "Vana alumiiniumjuhtmestik ja sagedased kaitsmete väljalülitumised",
        "Liiga vähe pistikupesasid ja ebamugav valgustus",
        "Vananenud elektrikilp ilma rikkevoolukaitsmeta",
        "Elektritööde sidumine remondi- ja viimistlusgraafikuga",
      ],
      includes: [
        "Elektrisüsteemi ülevaatus ja lahenduse kokkuleppimine",
        "Juhtmestiku vahetus ja uued liinid",
        "Elektrikilbi komplekteerimine ja vahetus",
        "Pistikupesade, lülitite ja valgustuse paigaldus",
        "Põrandakütte ja seadmete ühendused",
        "Elektritööd remondi ja siseviimistluse osana",
      ],
      faq: [
        {
          q: "Kas teete elektritöid ka ilma suurema remondita?",
          a: "Jah. Teostame nii üksikuid töid (kilp, liinid, valgustus) kui ka kogu elektrisüsteemi uuendamise remondi käigus.",
        },
        {
          q: "Kas dokumentatsioon vormistatakse?",
          a: "Tööd teostatakse nõuetekohaselt ja vajalikud mõõtmised ning dokumendid lepime kokku enne tööde algust.",
        },
        {
          q: "Kas saate elektri- ja santehnilised tööd korraga teha?",
          a: "Jah, see ongi tavaline — üks meeskond planeerib mõlemad tööd nii, et viimistlus ei jää ootama.",
        },
      ],
    },
    ru: {
      h1: "Электромонтажные работы в Таллинне",
      title: "Электромонтажные работы в Таллинне и Харьюмаа | LAVANER OÜ",
      description:
        "Электрика в Таллинне: замена проводки, щиты, розетки, освещение и электромонтаж в рамках ремонта. Запросите расчёт у LAVANER OÜ.",
      lead: "Выполняем электромонтажные работы в квартирах, частных домах и на коммерческих объектах: проводка, щит, розетки и выключатели, освещение.",
      forWhom: [
        "Владельцы квартир и домов со старой электросистемой",
        "Клиенты, делающие капитальный ремонт",
        "Коммерческие объекты с изменением планировки и нагрузки",
      ],
      solves: [
        "Старая алюминиевая проводка и частые отключения",
        "Мало розеток и неудобное освещение",
        "Устаревший щит без УЗО",
        "Согласование электрики с графиком отделки",
      ],
      includes: [
        "Осмотр системы и согласование решения",
        "Замена проводки и новые линии",
        "Комплектация и замена электрощита",
        "Монтаж розеток, выключателей и освещения",
        "Подключение тёплого пола и техники",
        "Электрика в составе ремонта и отделки",
      ],
      faq: [
        {
          q: "Делаете ли электрику без общего ремонта?",
          a: "Да. Выполняем как отдельные работы (щит, линии, освещение), так и полное обновление электрики в рамках ремонта.",
        },
        {
          q: "Оформляется ли документация?",
          a: "Работы выполняются по требованиям, необходимые замеры и документы согласуем до начала работ.",
        },
        {
          q: "Можно ли сделать электрику и сантехнику одновременно?",
          a: "Да, так и делаем: одна команда планирует оба этапа, чтобы отделка не простаивала.",
        },
      ],
    },
    en: {
      h1: "Electrical works in Tallinn",
      title: "Electrical Works in Tallinn and Harjumaa | LAVANER OÜ",
      description:
        "Electrical work in Tallinn: rewiring, distribution boards, sockets, lighting and electrics as part of renovation. Request a quote from LAVANER OÜ.",
      lead: "We carry out electrical work in apartments, houses and commercial premises: rewiring, distribution boards, sockets and switches, lighting.",
      forWhom: [
        "Apartment and house owners with an old electrical system",
        "Clients doing a full renovation who need new wiring",
        "Commercial premises with a changing layout and load",
      ],
      solves: [
        "Old aluminium wiring and frequent tripping",
        "Too few sockets and impractical lighting",
        "Outdated distribution board without residual current protection",
        "Coordinating electrics with the renovation schedule",
      ],
      includes: [
        "System inspection and agreeing the solution",
        "Rewiring and new circuits",
        "Distribution board assembly and replacement",
        "Sockets, switches and lighting installation",
        "Underfloor heating and appliance connections",
        "Electrical work as part of renovation and finishing",
      ],
      faq: [
        {
          q: "Do you do electrical work without a full renovation?",
          a: "Yes. We handle single tasks (board, circuits, lighting) as well as complete rewiring during a renovation.",
        },
        {
          q: "Is documentation provided?",
          a: "Work is done to requirements; measurements and documents are agreed before work starts.",
        },
        {
          q: "Can electrics and plumbing be done together?",
          a: "Yes — one team plans both so that finishing work is never left waiting.",
        },
      ],
    },
  },

  plumbing: {
    et: {
      h1: "Sanitaartehnilised tööd Tallinnas",
      title: "Sanitaartehnilised tööd Tallinnas ja Harjumaal | LAVANER OÜ",
      description:
        "Santehnilised tööd Tallinnas: vee- ja kanalisatsioonitorustik, segistid, WC, dušinurgad, boilerid ja küttesüsteemi tööd. Küsi pakkumist LAVANER OÜ-lt.",
      lead: "Teostame sanitaartehnilisi töid korterites, eramajades ja äripindadel: torustiku vahetus, sanitaartehnika paigaldus ning küttesüsteemi tööd.",
      forWhom: [
        "Korteriomanikud, kes vahetavad vana torustikku",
        "Eramaja omanikud, kes ehitavad või uuendavad süsteeme",
        "Ärikliendid, kelle objektil on vaja hooldust või remonti",
      ],
      solves: [
        "Vanad ja lekkivad vee- ning kanalisatsioonitorud",
        "Nõrk veesurve ja ummistused",
        "Amortiseerunud segistid, WC-potid ja boilerid",
        "Küttesüsteemi ja radiaatorite vahetuse vajadus",
      ],
      includes: [
        "Vee- ja kanalisatsioonitorustiku vahetus ning uued liinid",
        "Segistite, WC-pottide, valamute ja dušinurkade paigaldus",
        "Boilerite ja veefiltrite paigaldus ning vahetus",
        "Radiaatorite ja põrandakütte tööd",
        "Vannitoa ja köögi torustik remondi käigus",
        "Lekete ja ummistuste kõrvaldamine",
      ],
      faq: [
        {
          q: "Kas tulete kiirelt lekke korral?",
          a: "Võtke ühendust telefoni teel — hindame olukorra ja lepime kokku lähima võimaliku aja Tallinnas või Harjumaal.",
        },
        {
          q: "Kas teete torustikuvahetust kogu korteris?",
          a: "Jah, vahetame nii üksikuid lõike kui ka kogu korteri või maja vee- ja kanalisatsioonisüsteemi.",
        },
        {
          q: "Kas taastate pärast töid seinad ja plaadid?",
          a: "Jah. Teeme ka viimistluse taastamise, sest santehnika, plaatimine ja viimistlus on meil sama meeskonna töö.",
        },
      ],
    },
    ru: {
      h1: "Сантехнические работы в Таллинне",
      title: "Сантехнические работы в Таллинне и Харьюмаа | LAVANER OÜ",
      description:
        "Сантехника в Таллинне: замена водопровода и канализации, смесители, унитазы, душевые, бойлеры и отопление. Запросите расчёт у LAVANER OÜ.",
      lead: "Выполняем сантехнические работы в квартирах, домах и на коммерческих объектах: замена труб, установка сантехники, работы по отоплению.",
      forWhom: [
        "Владельцы квартир, меняющие старые трубы",
        "Владельцы частных домов при строительстве и обновлении",
        "Коммерческие клиенты, которым нужен ремонт или обслуживание",
      ],
      solves: [
        "Старые и протекающие трубы водопровода и канализации",
        "Слабый напор и засоры",
        "Изношенные смесители, унитазы и бойлеры",
        "Необходимость замены отопления и радиаторов",
      ],
      includes: [
        "Замена водопровода и канализации, новые линии",
        "Установка смесителей, унитазов, раковин и душевых",
        "Установка и замена бойлеров и фильтров",
        "Работы по радиаторам и тёплому полу",
        "Трубы в ванной и на кухне в рамках ремонта",
        "Устранение протечек и засоров",
      ],
      faq: [
        {
          q: "Приедете ли быстро при протечке?",
          a: "Позвоните — оценим ситуацию и согласуем ближайшее возможное время в Таллинне или Харьюмаа.",
        },
        {
          q: "Меняете ли трубы во всей квартире?",
          a: "Да, меняем как отдельные участки, так и всю систему водоснабжения и канализации квартиры или дома.",
        },
        {
          q: "Восстанавливаете ли стены и плитку после работ?",
          a: "Да. Отделку восстанавливает та же команда — сантехника, плитка и отделка у нас в одних руках.",
        },
      ],
    },
    en: {
      h1: "Plumbing works in Tallinn",
      title: "Plumbing Works in Tallinn and Harjumaa | LAVANER OÜ",
      description:
        "Plumbing in Tallinn: water and sewage pipework, taps, WCs, showers, water heaters and heating work. Request a quote from LAVANER OÜ.",
      lead: "We carry out plumbing work in apartments, houses and commercial premises: pipework replacement, sanitary ware installation and heating work.",
      forWhom: [
        "Apartment owners replacing old pipework",
        "House owners building or upgrading systems",
        "Business clients needing repair or maintenance",
      ],
      solves: [
        "Old and leaking water and sewage pipes",
        "Low water pressure and blockages",
        "Worn taps, WCs and water heaters",
        "Heating system and radiator replacement",
      ],
      includes: [
        "Water and sewage pipework replacement and new lines",
        "Taps, WCs, basins and shower installation",
        "Water heater and filter installation",
        "Radiator and underfloor heating work",
        "Bathroom and kitchen pipework during renovation",
        "Leak and blockage repairs",
      ],
      faq: [
        {
          q: "Can you come quickly in case of a leak?",
          a: "Call us — we assess the situation and agree the earliest possible time in Tallinn or Harjumaa.",
        },
        {
          q: "Do you replace pipework in a whole apartment?",
          a: "Yes, from single sections to the complete water and sewage system of an apartment or house.",
        },
        {
          q: "Do you restore walls and tiling afterwards?",
          a: "Yes. The same team handles plumbing, tiling and finishing.",
        },
      ],
    },
  },
};

export const EXTRA_KEYS = Object.keys(EXTRA_SERVICE_CONTENT) as ServiceKey[];