import { Hero } from "@/components/home/hero";
import { Work } from "@/components/home/work";
import { BunkrDemo } from "@/components/home/bunkr-demo";
import { About, Activities, Skills } from "@/components/home/about";
import { Contact } from "@/components/home/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <BunkrDemo />
      <About />
      <Skills />
      <Activities />
      <Contact />
    </>
  );
}
