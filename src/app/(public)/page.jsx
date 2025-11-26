import ContentSection from "@/components/content-4";
import CommunitySection from "@/components/content-6";
import FAQsThree from "@/components/faqs-3";
import HeroSection from "@/components/hero-section";


export default function Home() {
  return (
    <>
      <div className="min-h-screen">
        <HeroSection></HeroSection>
        <ContentSection></ContentSection>
        <CommunitySection></CommunitySection>
        <FAQsThree></FAQsThree>
      </div>
    
    </>
  );
}
