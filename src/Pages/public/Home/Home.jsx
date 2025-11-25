import FeaturedListingsSection from './components/FeaturedListingsSection';
import FinalCTASection from './components/FinalCTASection';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import TrustSafetySection from './components/TrustSafetySection';

const Home = () => {

    return (
        <>
            <HeroSection></HeroSection>
            <HowItWorksSection></HowItWorksSection>
            <FeaturedListingsSection></FeaturedListingsSection>
            
            <TrustSafetySection></TrustSafetySection>
            <TestimonialsSection></TestimonialsSection>
            <FinalCTASection></FinalCTASection>
        </>
    );
};

export default Home;