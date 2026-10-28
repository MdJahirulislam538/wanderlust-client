import Banner from "@/components/home/Banner";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";


export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
