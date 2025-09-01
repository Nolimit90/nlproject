import AtelierAsterHero from '@/components/atelier-aster/AtelierAsterHero';
import AtelierAsterDuoImages from '@/components/atelier-aster/AtelierAsterDuoImages';
import AtelierAsterEditorial from '@/components/atelier-aster/AtelierAsterEditorial';
import AtelierAsterTextures from '@/components/atelier-aster/AtelierAsterTextures';
import AtelierAsterDesign from '@/components/atelier-aster/AtelierAsterDesign';
import AtelierAsterTechnical from '@/components/atelier-aster/AtelierAsterTechnical';
import AtelierAsterShopCTA from '@/components/atelier-aster/AtelierAsterShopCTA';

export default function AtelierAsterHomePage() {
  return (
    <>
      <AtelierAsterHero />
      <AtelierAsterDuoImages />
      <AtelierAsterEditorial />
      <AtelierAsterTextures />
      <AtelierAsterDesign />
      <AtelierAsterTechnical />
      <AtelierAsterShopCTA />
    </>
  );
}
