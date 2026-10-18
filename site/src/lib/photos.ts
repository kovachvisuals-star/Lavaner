// Имиджевые иллюстрации LAVANER (AI-изображения из фотобанка проекта).
// Не подписывать как реальные проекты, сотрудников или кейсы компании.

import hero01 from "@/assets/lavaner/01_hero/hero-01.jpg.asset.json";
import hero02 from "@/assets/lavaner/01_hero/hero-02.jpg.asset.json";
import hero03 from "@/assets/lavaner/01_hero/hero-03.jpg.asset.json";
import design01 from "@/assets/lavaner/02_design_projects/design-01.jpg.asset.json";
import design02 from "@/assets/lavaner/02_design_projects/design-02-measurements.jpg.asset.json";
import design03 from "@/assets/lavaner/02_design_projects/design-03-client-meeting.jpg.asset.json";
import design04 from "@/assets/lavaner/02_design_projects/design-04-plans-materials.jpg.asset.json";
import b2b01 from "@/assets/lavaner/03_b2b/b2b-01-office.jpg.asset.json";
import b2b02 from "@/assets/lavaner/03_b2b/b2b-02-restaurant.jpg.asset.json";
import b2b03 from "@/assets/lavaner/03_b2b/b2b-03-retail.jpg.asset.json";
import b2b04 from "@/assets/lavaner/03_b2b/b2b-04-warehouse.jpg.asset.json";
import b2b05 from "@/assets/lavaner/03_b2b/b2b-05-handover.jpg.asset.json";
import b2c01 from "@/assets/lavaner/04_b2c/b2c-01-apartment.jpg.asset.json";
import b2c02 from "@/assets/lavaner/04_b2c/b2c-02-private-house.jpg.asset.json";
import b2c03 from "@/assets/lavaner/04_b2c/b2c-03-kitchen.jpg.asset.json";
import b2c04 from "@/assets/lavaner/04_b2c/b2c-04-bathroom.jpg.asset.json";
import b2c05 from "@/assets/lavaner/04_b2c/b2c-05-handover.jpg.asset.json";
import process01 from "@/assets/lavaner/05_work_process/process-01-finishing.jpg.asset.json";
import process02 from "@/assets/lavaner/05_work_process/process-02-electrical.jpg.asset.json";
import process03 from "@/assets/lavaner/05_work_process/process-03-flooring.jpg.asset.json";
import process04 from "@/assets/lavaner/05_work_process/process-04-facade.jpg.asset.json";
import process05 from "@/assets/lavaner/05_work_process/process-05-quality-control.jpg.asset.json";
import detail01 from "@/assets/lavaner/06_quality_details/detail-01-tiling.jpg.asset.json";
import detail02 from "@/assets/lavaner/06_quality_details/detail-02-carpentry.jpg.asset.json";
import detail03 from "@/assets/lavaner/06_quality_details/detail-03-engineering.jpg.asset.json";

export const PHOTOS = {
  hero01: hero01.url,
  hero02: hero02.url,
  hero03: hero03.url,
  design01: design01.url,
  design02: design02.url,
  design03: design03.url,
  design04: design04.url,
  b2bOffice: b2b01.url,
  b2bRestaurant: b2b02.url,
  b2bRetail: b2b03.url,
  b2bWarehouse: b2b04.url,
  b2bHandover: b2b05.url,
  b2cApartment: b2c01.url,
  b2cHouse: b2c02.url,
  b2cKitchen: b2c03.url,
  b2cBathroom: b2c04.url,
  b2cHandover: b2c05.url,
  processFinishing: process01.url,
  processElectrical: process02.url,
  processFlooring: process03.url,
  processFacade: process04.url,
  processQuality: process05.url,
  detailTiling: detail01.url,
  detailCarpentry: detail02.url,
  detailEngineering: detail03.url,
};

// Иллюстрация для страницы услуги по её slug.
export const SERVICE_PHOTOS: Record<string, string> = {
  "interior-design": PHOTOS.design01,
  "design-engineering": PHOTOS.design04,
  construction: PHOTOS.processFacade,
  renovation: PHOTOS.processFinishing,
  reconstruction: PHOTOS.hero01,
  "commercial-renovation": PHOTOS.b2bRetail,
  "home-renovation": PHOTOS.b2cKitchen,
  finishing: PHOTOS.processFlooring,
  "engineering-systems": PHOTOS.processElectrical,
  maintenance: PHOTOS.detailEngineering,
};