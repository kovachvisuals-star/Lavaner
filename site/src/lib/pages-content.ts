// Контент статических страниц на трёх языках.

import type { Lang } from "./i18n";
import type { PageKey } from "./routes-map";

export type Block = { heading: string; text?: string; items?: string[] };

export type PageContent = {
  h1: string;
  title: string;
  description: string;
  lead: string;
  blocks: Block[];
};

export const HOME: Record<
  Lang,
  {
    h1: string;
    title: string;
    description: string;
    lead: string;
    servicesHeading: string;
    servicesText: string;
    audienceHeading: string;
    business: { title: string; text: string };
    private: { title: string; text: string };
    processHeading: string;
    advantagesHeading: string;
    geoHeading: string;
    ctaHeading: string;
    ctaText: string;
  }
> = {
  et: {
    h1: "Ehitusfirma Tallinnas ja Harjumaal",
    title: "Ehitusfirma Tallinnas, Maardus ja Harjumaal | LAVANER OÜ",
    description:
      "Ehitustööd Tallinnas, Maardus ja Harjumaal: siseviimistlus, maja renoveerimine, vannitoa remont, katuse- ja fassaaditööd. Küsi LAVANER OÜ-lt pakkumist.",
    lead: "LAVANER OÜ tegeleb projekteerimise, ehituse, remondi ja hooldusega. Üks meeskond viib objekti ideest valmis tulemuseni — äri- ja eraklientidele.",
    servicesHeading: "Teenused",
    servicesText:
      "Kujundusest ja projekteerimisest kuni ehituse, viimistluse ja hilisema hoolduseni.",
    audienceHeading: "Kellele me töötame",
    business: {
      title: "Äriklientidele",
      text: "Bürood, kauplused, restoranid, hotellid ja laopinnad. Etapiline teostus, mis arvestab teie töögraafikut.",
    },
    private: {
      title: "Eraklientidele",
      text: "Korterid, eramajad ja ridaelamud. Täisremont ühe vastutava meeskonnaga, ilma alltöövõtjate otsimiseta.",
    },
    processHeading: "Kuidas me töötame",
    advantagesHeading: "Miks valida meid",
    geoHeading: "Tööpiirkond",
    ctaHeading: "Räägi meile oma objektist",
    ctaText:
      "Vaatame objekti üle, lepime kokku mahu ja koostame pakkumise koos etappide, tähtaegade ja maksumusega.",
  },
  ru: {
    h1: "Строительство, ремонт и проектирование в Эстонии",
    title: "Строительство, ремонт и проектирование в Эстонии | LAVANER OÜ",
    description:
      "LAVANER OÜ — проектирование, строительство, ремонт и обслуживание коммерческих и частных объектов в Таллинне, Харьюмаа и по всей Эстонии.",
    lead: "LAVANER OÜ занимается проектированием, строительством, ремонтом и обслуживанием объектов. Одна команда ведёт объект от идеи до готового результата — для бизнеса и частных клиентов.",
    servicesHeading: "Услуги",
    servicesText:
      "От дизайна и проектирования до строительства, отделки и дальнейшего обслуживания.",
    audienceHeading: "С кем мы работаем",
    business: {
      title: "Для бизнеса",
      text: "Офисы, магазины, рестораны, гостиницы и склады. Поэтапная реализация с учётом вашего рабочего графика.",
    },
    private: {
      title: "Для частных клиентов",
      text: "Квартиры, частные дома и таунхаусы. Комплексный ремонт одной ответственной командой, без поиска отдельных бригад.",
    },
    processHeading: "Как мы работаем",
    advantagesHeading: "Почему выбирают нас",
    geoHeading: "География работ",
    ctaHeading: "Расскажите о вашем объекте",
    ctaText:
      "Осмотрим объект, согласуем объём и подготовим предложение с этапами, сроками и стоимостью.",
  },
  en: {
    h1: "Construction, renovation and design in Estonia",
    title: "Construction, Renovation and Design in Estonia | LAVANER OÜ",
    description:
      "LAVANER OÜ — design, construction, renovation and maintenance for commercial and private properties in Tallinn, Harjumaa and across Estonia.",
    lead: "LAVANER OÜ delivers design, construction, renovation and maintenance. One team takes the property from idea to finished result — for businesses and private clients.",
    servicesHeading: "Services",
    servicesText: "From design and planning to construction, finishing and ongoing maintenance.",
    audienceHeading: "Who we work with",
    business: {
      title: "For business",
      text: "Offices, shops, restaurants, hotels and warehouses. Staged delivery that respects your operating schedule.",
    },
    private: {
      title: "For private clients",
      text: "Apartments, private houses and townhouses. A full renovation with one responsible team, no chasing separate trades.",
    },
    processHeading: "How we work",
    advantagesHeading: "Why choose us",
    geoHeading: "Where we work",
    ctaHeading: "Tell us about your property",
    ctaText:
      "We review the property, agree the scope and prepare a proposal with stages, timeline and cost.",
  },
};

export const PAGES: Record<PageKey, Record<Lang, PageContent>> = {
  services: {
    et: {
      h1: "Teenused",
      title: "Ehitus- ja remonditeenused | LAVANER OÜ",
      description:
        "LAVANER OÜ teenused: projekteerimine, sisekujundus, ehitus, remont, viimistlus, tehnosüsteemid ja kinnisvara hooldus Eestis.",
      lead: "Kõik teenused ühest ettevõttest: projekteerimine ja kujundus, ehitus ja remont, tehnosüsteemid, viimistlus ning objekti hilisem hooldus.",
      blocks: [],
    },
    ru: {
      h1: "Услуги",
      title: "Строительные и ремонтные услуги | LAVANER OÜ",
      description:
        "Услуги LAVANER OÜ: проектирование, дизайн интерьера, строительство, ремонт, отделка, инженерные работы и обслуживание объектов в Эстонии.",
      lead: "Все услуги в одной компании: проектирование и дизайн, строительство и ремонт, инженерные системы, отделка и дальнейшее обслуживание объекта.",
      blocks: [],
    },
    en: {
      h1: "Services",
      title: "Construction and Renovation Services | LAVANER OÜ",
      description:
        "LAVANER OÜ services: design and planning, interior design, construction, renovation, finishing, building services and property maintenance in Estonia.",
      lead: "Everything from one company: design and planning, construction and renovation, building services, finishing and long-term maintenance.",
      blocks: [],
    },
  },

  business: {
    et: {
      h1: "Ehitus- ja remonditeenused äriklientidele",
      title: "Ehitusteenused äriklientidele Eestis | LAVANER OÜ",
      description:
        "Äripindade ehitus, remont ja hooldus Eestis: bürood, kauplused, restoranid, hotellid ja laod. Etapid, tähtajad ja vastutus kokku lepitud.",
      lead: "Töötame ettevõtetega, kellele on oluline tähtaeg, selge maht ja arusaadav suhtlus. Kohandame graafiku teie äritegevusega.",
      blocks: [
        {
          heading: "Objektid, millega töötame",
          items: [
            "Bürood ja ärikeskused",
            "Kauplused ja teeninduspinnad",
            "Restoranid, kohvikud ja hotellid",
            "Laod ja tootmispinnad",
          ],
        },
        {
          heading: "Mida ettevõte saab",
          items: [
            "Üks vastutav kontaktisik kogu projekti vältel",
            "Kirjalik pakkumine koos etappide ja tähtaegadega",
            "Võimalus teha töid etappide või tsoonide kaupa",
            "Tööde fotodokumenteerimine",
            "Objekti hooldus pärast üleandmist",
          ],
        },
      ],
    },
    ru: {
      h1: "Строительные и ремонтные услуги для бизнеса",
      title: "Строительные услуги для бизнеса в Эстонии | LAVANER OÜ",
      description:
        "Строительство, ремонт и обслуживание коммерческих объектов в Эстонии: офисы, магазины, рестораны, гостиницы, склады. Согласованные этапы и сроки.",
      lead: "Работаем с компаниями, для которых важны сроки, чёткий объём и понятная коммуникация. Подстраиваем график под работу вашего бизнеса.",
      blocks: [
        {
          heading: "Объекты, с которыми работаем",
          items: [
            "Офисы и бизнес-центры",
            "Магазины и сервисные помещения",
            "Рестораны, кафе и гостиницы",
            "Склады и производственные помещения",
          ],
        },
        {
          heading: "Что получает компания",
          items: [
            "Один ответственный контакт на весь проект",
            "Письменное предложение с этапами и сроками",
            "Возможность выполнять работы этапами или по зонам",
            "Фотофиксация выполненных работ",
            "Обслуживание объекта после сдачи",
          ],
        },
      ],
    },
    en: {
      h1: "Construction and renovation for business clients",
      title: "Construction Services for Businesses in Estonia | LAVANER OÜ",
      description:
        "Construction, renovation and maintenance of commercial property in Estonia: offices, shops, restaurants, hotels and warehouses. Agreed stages and deadlines.",
      lead: "We work with companies that need reliable timelines, a clear scope and straightforward communication. The schedule is built around your operations.",
      blocks: [
        {
          heading: "Properties we work with",
          items: [
            "Offices and business centres",
            "Shops and service premises",
            "Restaurants, cafes and hotels",
            "Warehouses and production facilities",
          ],
        },
        {
          heading: "What your company gets",
          items: [
            "One responsible contact for the whole project",
            "A written proposal with stages and deadlines",
            "The option to work in stages or by zones",
            "Photo documentation of completed work",
            "Maintenance after handover",
          ],
        },
      ],
    },
  },

  private: {
    et: {
      h1: "Remonditeenused eraklientidele",
      title: "Remont eraklientidele Tallinnas ja Eestis | LAVANER OÜ",
      description:
        "Korterite, eramajade ja ridaelamute remont Eestis. Üks meeskond, kokkulepitud etapid ja valmis objekti üleandmine.",
      lead: "Teeme korterite ja majade remonti nii, et kliendil ei oleks vaja otsida iga tööliigi jaoks eraldi tegijat.",
      blocks: [
        {
          heading: "Objektid, millega töötame",
          items: [
            "Korterid ja uusarenduse pinnad",
            "Eramajad ja ridaelamud",
            "Köögid ja vannitoad",
            "Üksikud ruumid ja osaline remont",
          ],
        },
        {
          heading: "Mida klient saab",
          items: [
            "Ülevaatus ja tööde mahu kokkuleppimine enne algust",
            "Materjalide valik koos kliendiga",
            "Üks kontaktisik kogu remondi vältel",
            "Kokkulepitud etapid ja tähtajad",
            "Korrastatud ja kasutusvalmis objekt",
          ],
        },
      ],
    },
    ru: {
      h1: "Ремонтные услуги для частных клиентов",
      title: "Ремонт для частных клиентов в Таллинне и Эстонии | LAVANER OÜ",
      description:
        "Ремонт квартир, частных домов и таунхаусов в Эстонии. Одна команда, согласованные этапы и сдача готового объекта.",
      lead: "Выполняем ремонт квартир и домов так, чтобы заказчику не пришлось искать отдельного исполнителя на каждый вид работ.",
      blocks: [
        {
          heading: "Объекты, с которыми работаем",
          items: [
            "Квартиры и помещения в новостройках",
            "Частные дома и таунхаусы",
            "Кухни и санузлы",
            "Отдельные помещения и частичный ремонт",
          ],
        },
        {
          heading: "Что получает клиент",
          items: [
            "Осмотр и согласование объёма работ до старта",
            "Подбор материалов вместе с заказчиком",
            "Один контактный человек на весь ремонт",
            "Согласованные этапы и сроки",
            "Убранный и готовый к использованию объект",
          ],
        },
      ],
    },
    en: {
      h1: "Renovation services for private clients",
      title: "Renovation for Private Clients in Tallinn and Estonia | LAVANER OÜ",
      description:
        "Renovation of apartments, private houses and townhouses in Estonia. One team, agreed stages and handover of a finished home.",
      lead: "We renovate apartments and houses so you do not have to find a separate contractor for every trade.",
      blocks: [
        {
          heading: "Properties we work with",
          items: [
            "Apartments and new-build units",
            "Private houses and townhouses",
            "Kitchens and bathrooms",
            "Single rooms and partial renovations",
          ],
        },
        {
          heading: "What you get",
          items: [
            "A site visit and agreed scope before work starts",
            "Material selection together with you",
            "One contact person for the whole renovation",
            "Agreed stages and deadlines",
            "A clean, ready-to-use home",
          ],
        },
      ],
    },
  },

  projects: {
    et: {
      h1: "Tehtud tööd",
      title: "Tehtud tööd — ehitus ja remont Tallinnas | LAVANER OÜ",
      description:
        "Ülevaade töödest, mida LAVANER OÜ Tallinnas ja Harjumaal teostab: eramute ehitus, korterite ja vannitubade remont, katused, fassaadid ja äripinnad.",
      lead: "Siin on ülevaade tööliikidest, mida igapäevaselt teeme. Konkreetsete objektide fotod ja soovitajate kontaktid jagame päringu korral — väljamõeldud objekte ega arvustusi me ei avalda.",
      blocks: [
        {
          heading: "Eramud ja ridaelamud",
          items: [
            "Eramute ehitus ja laiendused Tallinnas ja Harjumaal",
            "Vanemate majade renoveerimine ja kapitaalremont",
            "Katuse vahetus, fassaadi soojustamine ja välisviimistlus",
          ],
        },
        {
          heading: "Korterid",
          items: [
            "Korterite täisremont koos plaanimuudatustega",
            "Vannitubade ja köökide remont koos torustiku ja elektriga",
            "Siseviimistlus: seinad, laed, põrandad ja detailid",
          ],
        },
        {
          heading: "Äripinnad",
          items: [
            "Büroode, kaupluste ja restoranide remont ning ümberehitus",
            "Laopindade ja tootmispindade korrastamine",
            "Ärikinnisvara jooksev hooldus ja remonditööd",
          ],
        },
        {
          heading: "Mida päringu korral näitame",
          items: [
            "Objekti tüüp, asukoht ja tööde maht",
            "Fotod tööde käigust ja valmis tulemusest",
            "Teostatud etapid ja tegelik tähtaeg",
          ],
        },
      ],
    },
    ru: {
      h1: "Выполненные работы",
      title: "Выполненные работы — строительство и ремонт в Таллинне | LAVANER OÜ",
      description:
        "Обзор работ LAVANER OÜ в Таллинне и Харьюмаа: строительство домов, ремонт квартир и ванных, кровля, фасады и коммерческие помещения.",
      lead: "Здесь обзор видов работ, которые мы выполняем ежедневно. Фотографии конкретных объектов и контакты для рекомендаций предоставляем по запросу — вымышленные объекты и отзывы мы не публикуем.",
      blocks: [
        {
          heading: "Частные дома и таунхаусы",
          items: [
            "Строительство и расширение домов в Таллинне и Харьюмаа",
            "Реновация и капитальный ремонт старых домов",
            "Замена крыши, утепление фасада и наружная отделка",
          ],
        },
        {
          heading: "Квартиры",
          items: [
            "Комплексный ремонт квартир с перепланировкой",
            "Ремонт ванных и кухонь вместе с трубами и электрикой",
            "Отделка: стены, потолки, полы и детали",
          ],
        },
        {
          heading: "Коммерческие помещения",
          items: [
            "Ремонт и переустройство офисов, магазинов и ресторанов",
            "Приведение в порядок складских и производственных площадей",
            "Текущее обслуживание и ремонт коммерческой недвижимости",
          ],
        },
        {
          heading: "Что показываем по запросу",
          items: [
            "Тип объекта, расположение и объём работ",
            "Фотографии хода работ и готового результата",
            "Выполненные этапы и фактический срок",
          ],
        },
      ],
    },
    en: {
      h1: "Completed works",
      title: "Completed Works — Construction and Renovation in Tallinn | LAVANER OÜ",
      description:
        "An overview of the work LAVANER OÜ carries out in Tallinn and Harjumaa: house construction, apartment and bathroom renovation, roofing, facades and commercial premises.",
      lead: "This is an overview of the work we do every day. Photos of specific projects and reference contacts are shared on request — we do not publish invented projects or reviews.",
      blocks: [
        {
          heading: "Houses and terraced homes",
          items: [
            "House construction and extensions in Tallinn and Harjumaa",
            "Renovation and full refurbishment of older houses",
            "Roof replacement, facade insulation and exterior finishing",
          ],
        },
        {
          heading: "Apartments",
          items: [
            "Full apartment renovation including layout changes",
            "Bathroom and kitchen renovation with pipework and electrics",
            "Interior finishing: walls, ceilings, floors and details",
          ],
        },
        {
          heading: "Commercial premises",
          items: [
            "Renovation and conversion of offices, shops and restaurants",
            "Upgrading warehouse and production space",
            "Ongoing maintenance and repairs for commercial property",
          ],
        },
        {
          heading: "What we show on request",
          items: [
            "Property type, location and scope of work",
            "Photos of the work in progress and the finished result",
            "Stages completed and the actual delivery time",
          ],
        },
      ],
    },
  },

  about: {
    et: {
      h1: "LAVANER OÜ — ettevõttest",
      title: "Ettevõttest | LAVANER OÜ",
      description:
        "LAVANER OÜ on Eestis tegutsev ehitus- ja remondiettevõte: projekteerimine, ehitus, remont ja hooldus äri- ning eraobjektidele.",
      lead: "LAVANER OÜ pakub projekteerimist, ehitust, remonti ja hooldust ühe ettevõttena. Töötame Tallinnas, Harjumaal ja kogu Eestis ning suhtleme eesti, vene ja inglise keeles.",
      blocks: [
        {
          heading: "Kuidas me töötame",
          items: [
            "Alustame ülevaatusest, mitte telefonis pakutud hinnast",
            "Fikseerime mahu, etapid ja tähtajad kirjalikult",
            "Hoiame kliendi objekti käiguga kursis",
            "Anname objekti üle koos ühise ülevaatusega",
          ],
        },
        {
          heading: "Keeled",
          items: ["Eesti keel", "Vene keel", "Inglise keel"],
        },
      ],
    },
    ru: {
      h1: "LAVANER OÜ — о компании",
      title: "О компании | LAVANER OÜ",
      description:
        "LAVANER OÜ — строительная и ремонтная компания в Эстонии: проектирование, строительство, ремонт и обслуживание коммерческих и частных объектов.",
      lead: "LAVANER OÜ выполняет проектирование, строительство, ремонт и обслуживание как одна компания. Работаем в Таллинне, Харьюмаа и по всей Эстонии, общаемся на эстонском, русском и английском.",
      blocks: [
        {
          heading: "Как мы работаем",
          items: [
            "Начинаем с осмотра, а не с цены по телефону",
            "Фиксируем объём, этапы и сроки письменно",
            "Держим заказчика в курсе хода работ",
            "Сдаём объект с совместной приёмкой",
          ],
        },
        {
          heading: "Языки общения",
          items: ["Эстонский", "Русский", "Английский"],
        },
      ],
    },
    en: {
      h1: "About LAVANER OÜ",
      title: "About the Company | LAVANER OÜ",
      description:
        "LAVANER OÜ is a construction and renovation company in Estonia: design, construction, renovation and maintenance for commercial and private properties.",
      lead: "LAVANER OÜ delivers design, construction, renovation and maintenance as one company. We work in Tallinn, Harjumaa and across Estonia, in Estonian, Russian and English.",
      blocks: [
        {
          heading: "How we work",
          items: [
            "We start with a site visit, not a price over the phone",
            "Scope, stages and deadlines are put in writing",
            "We keep the client informed as work progresses",
            "We hand over the property with a joint inspection",
          ],
        },
        { heading: "Languages", items: ["Estonian", "Russian", "English"] },
      ],
    },
  },

  process: {
    et: {
      h1: "Tööprotsess",
      title: "Kuidas me töötame: etapid ja tähtajad | LAVANER OÜ",
      description:
        "LAVANER OÜ tööprotsess: päring, ülevaatus, hinnapakkumine, teostus, kvaliteedikontroll ja objekti üleandmine.",
      lead: "Iga objekt läbib samad etapid — nii teab klient juba enne algust, mis ja millal toimub.",
      blocks: [],
    },
    ru: {
      h1: "Процесс работы",
      title: "Как мы работаем: этапы и сроки | LAVANER OÜ",
      description:
        "Процесс работы LAVANER OÜ: заявка, осмотр, предложение, выполнение, контроль качества и сдача объекта.",
      lead: "Каждый объект проходит одни и те же этапы — заказчик заранее знает, что и когда происходит.",
      blocks: [],
    },
    en: {
      h1: "How we work",
      title: "How We Work: Stages and Timelines | LAVANER OÜ",
      description:
        "The LAVANER OÜ process: enquiry, site visit, proposal, delivery, quality control and handover.",
      lead: "Every project follows the same stages, so you know what happens and when before work begins.",
      blocks: [],
    },
  },

  blog: {
    et: {
      h1: "Blogi",
      title: "Blogi ehitusest ja remondist | LAVANER OÜ",
      description:
        "Praktilised artiklid remondist, ehitusest ja objekti ettevalmistusest Eestis. Esimesed materjalid on ettevalmistamisel.",
      lead: "Valmistame ette praktilisi artikleid, mis aitavad objekti planeerida. Avaldame ainult sisulisi materjale — tühje tekste me ei tee.",
      blocks: [
        {
          heading: "Ettevalmistamisel olevad teemad",
          items: [
            "Kui palju maksab korteri remont Tallinnas ja millest hind sõltub",
            "Kuidas valida ehitusettevõtet Eestis",
            "Äripinna remont ilma äritegevust peatamata",
            "Korteri remondi etapid: mis järjekorras tööd käivad",
            "Millised dokumendid ja andmed on hinnapakkumiseks vaja",
          ],
        },
      ],
    },
    ru: {
      h1: "Блог",
      title: "Блог о строительстве и ремонте | LAVANER OÜ",
      description:
        "Практические статьи о ремонте, строительстве и подготовке объекта в Эстонии. Первые материалы в подготовке.",
      lead: "Готовим практические материалы, которые помогают спланировать объект. Публикуем только содержательные статьи — пустых текстов не будет.",
      blocks: [
        {
          heading: "Темы в подготовке",
          items: [
            "Сколько стоит ремонт квартиры в Таллинне и от чего зависит цена",
            "Как выбрать строительную компанию в Эстонии",
            "Ремонт коммерческого помещения без остановки бизнеса",
            "Этапы ремонта квартиры: в каком порядке идут работы",
            "Какие данные нужны для расчёта стоимости",
          ],
        },
      ],
    },
    en: {
      h1: "Blog",
      title: "Blog on Construction and Renovation | LAVANER OÜ",
      description:
        "Practical articles on renovation, construction and preparing a property in Estonia. First materials in preparation.",
      lead: "We are preparing practical articles that help you plan a project. We publish only substantial material — no filler.",
      blocks: [
        {
          heading: "Topics in preparation",
          items: [
            "What an apartment renovation costs in Tallinn and what drives the price",
            "How to choose a construction company in Estonia",
            "Renovating commercial premises without closing the business",
            "Apartment renovation stages and their order",
            "What information is needed for an estimate",
          ],
        },
      ],
    },
  },

  contacts: {
    et: {
      h1: "Kontakt",
      title: "Kontakt | LAVANER OÜ Tallinn",
      description:
        "Võta LAVANER OÜ-ga ühendust: telefon, e-post ja päringuvorm. Teenindame Tallinnas, Harjumaal ja kogu Eestis.",
      lead: "Kirjuta või helista — vaatame objekti üle ja koostame pakkumise koos etappide, tähtaegade ja maksumusega.",
      blocks: [],
    },
    ru: {
      h1: "Контакты",
      title: "Контакты | LAVANER OÜ Таллинн",
      description:
        "Свяжитесь с LAVANER OÜ: телефон, e-mail и форма заявки. Работаем в Таллинне, Харьюмаа и по всей Эстонии.",
      lead: "Напишите или позвоните — осмотрим объект и подготовим предложение с этапами, сроками и стоимостью.",
      blocks: [],
    },
    en: {
      h1: "Contact",
      title: "Contact | LAVANER OÜ Tallinn",
      description:
        "Get in touch with LAVANER OÜ: phone, email and enquiry form. We work in Tallinn, Harjumaa and across Estonia.",
      lead: "Write or call — we will review the property and prepare a proposal with stages, timeline and cost.",
      blocks: [],
    },
  },

  privacy: {
    et: {
      h1: "Privaatsuspoliitika",
      title: "Privaatsuspoliitika | LAVANER OÜ",
      description: "Kuidas LAVANER OÜ töötleb päringuvormi kaudu saadetud isikuandmeid.",
      lead: "Kasutame kontaktvormi kaudu saadetud andmeid ainult päringule vastamiseks ja pakkumise koostamiseks.",
      blocks: [
        {
          heading: "Milliseid andmeid kogume",
          items: [
            "Nimi ja kontaktandmed (telefon, e-post)",
            "Objekti kirjeldus, mille te ise edastate",
            "Kirjavahetuse sisu",
          ],
        },
        {
          heading: "Kuidas andmeid kasutame",
          items: [
            "Päringule vastamiseks ja pakkumise koostamiseks",
            "Tööde kokkuleppimiseks ja teostamiseks",
            "Me ei müü ega edasta andmeid turunduseesmärkidel",
          ],
        },
        {
          heading: "Teie õigused",
          text: "Võite igal ajal küsida oma andmete kustutamist või parandamist, kirjutades aadressile info@lavaner.ee.",
        },
      ],
    },
    ru: {
      h1: "Политика конфиденциальности",
      title: "Политика конфиденциальности | LAVANER OÜ",
      description: "Как LAVANER OÜ обрабатывает персональные данные из формы заявки.",
      lead: "Данные из контактной формы используются только для ответа на обращение и подготовки предложения.",
      blocks: [
        {
          heading: "Какие данные мы собираем",
          items: [
            "Имя и контактные данные (телефон, e-mail)",
            "Описание объекта, которое вы передаёте сами",
            "Содержание переписки",
          ],
        },
        {
          heading: "Как мы используем данные",
          items: [
            "Для ответа на заявку и подготовки предложения",
            "Для согласования и выполнения работ",
            "Мы не продаём и не передаём данные в маркетинговых целях",
          ],
        },
        {
          heading: "Ваши права",
          text: "Вы можете в любой момент запросить удаление или исправление своих данных, написав на info@lavaner.ee.",
        },
      ],
    },
    en: {
      h1: "Privacy policy",
      title: "Privacy Policy | LAVANER OÜ",
      description: "How LAVANER OÜ processes personal data submitted through the enquiry form.",
      lead: "Data from the contact form is used only to answer your enquiry and prepare a proposal.",
      blocks: [
        {
          heading: "What data we collect",
          items: [
            "Name and contact details (phone, email)",
            "The property description you provide",
            "The content of our correspondence",
          ],
        },
        {
          heading: "How we use the data",
          items: [
            "To answer your enquiry and prepare a proposal",
            "To agree and carry out the works",
            "We do not sell or share data for marketing purposes",
          ],
        },
        {
          heading: "Your rights",
          text: "You can request deletion or correction of your data at any time by writing to info@lavaner.ee.",
        },
      ],
    },
  },

  cookies: {
    et: {
      h1: "Küpsiste poliitika",
      title: "Küpsiste poliitika | LAVANER OÜ",
      description: "Milliseid küpsiseid LAVANER OÜ veebileht kasutab ja milleks.",
      lead: "Veebileht kasutab ainult neid küpsiseid, mis on vajalikud lehe tööks ja statistika kogumiseks.",
      blocks: [
        {
          heading: "Küpsiste tüübid",
          items: [
            "Vajalikud küpsised — lehe põhifunktsioonide toimimiseks",
            "Statistikaküpsised — anonüümne külastuste statistika",
          ],
        },
        {
          heading: "Küpsiste haldamine",
          text: "Küpsiseid saate igal ajal kustutada või blokeerida oma veebilehitseja seadetes.",
        },
      ],
    },
    ru: {
      h1: "Политика использования cookies",
      title: "Политика cookies | LAVANER OÜ",
      description: "Какие файлы cookie использует сайт LAVANER OÜ и для чего.",
      lead: "Сайт использует только те файлы cookie, которые нужны для работы страниц и сбора статистики.",
      blocks: [
        {
          heading: "Типы cookie",
          items: [
            "Необходимые — для базовой работы сайта",
            "Статистические — анонимная статистика посещений",
          ],
        },
        {
          heading: "Управление cookie",
          text: "Вы можете удалить или заблокировать cookie в настройках вашего браузера в любое время.",
        },
      ],
    },
    en: {
      h1: "Cookie policy",
      title: "Cookie Policy | LAVANER OÜ",
      description: "Which cookies the LAVANER OÜ website uses and why.",
      lead: "The website uses only the cookies needed for the pages to work and for visit statistics.",
      blocks: [
        {
          heading: "Cookie types",
          items: [
            "Necessary — for basic website functionality",
            "Statistics — anonymous visit statistics",
          ],
        },
        {
          heading: "Managing cookies",
          text: "You can delete or block cookies at any time in your browser settings.",
        },
      ],
    },
  },
};