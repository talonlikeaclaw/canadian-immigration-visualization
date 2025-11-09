import { useInView } from 'react-intersection-observer';
import '../assets/styles/App.css';
import HeroSection from './HeroSection';
import DataExplorer from './DataExplorer';
import Map from './Map';
import Footer from './Footer';

function App() {
  // A google search on how I can track the position of React elements
  // lead me to the react intersction observer (plus I think this was
  // in one of class lectures, with lazy loading)
  // https://www.npmjs.com/package/react-intersection-observer
  const options = { threshold: 0.5 };

  const { ref: halifaxRef, inView: halifaxInView } = useInView(options);
  const { ref: montrealRef, inView: montrealInView } = useInView(options);
  const { ref: torontoRef, inView: torontoInView } = useInView(options);
  const { ref: calgaryRef, inView: calgaryInView } = useInView(options);
  const { ref: vancouverRef, inView: vancouverInView } =
    useInView(options);

  // Determine the currently zoomed city based on scroll position
  const currentZoomedCity = vancouverInView
    ? 'vancouver'
    : calgaryInView
      ? 'calgary'
      : torontoInView
        ? 'toronto'
        : montrealInView
          ? 'montreal'
          : halifaxInView
            ? 'halifax'
            : '';

  return (
    <>
      <HeroSection />
      <Map zoomedInCity={currentZoomedCity} />
      <p>
        While English and French are Canada’s official languages, a closer
        look reveals over 200 non-official languages thriving in our
        biggest cities. We will however focus on the 6 city from east to
        west.
      </p>

      <p>
        Canada’s three largest provinces by population (Ontario, Quebec and
        British Columbia) are home to over the majority of the country’s
        immigrant population. Each having it’s own distinct lingustic
        profile shaped on geography and history.
      </p>

      <p>Our journey starts in Halifax, the capital of Nova Scotia.</p>

      <section className="halifax-section" ref={halifaxRef}>
        <p>
          For centuries, Halifax&apos;s story was all about the British
          Empire and the sea. As a major port and military hub, its
          earliest and largest immigrant groups were British and Irish.
        </p>
        <p>
          These settlers came as early as the 1700s, often as fishermen,
          sailors, and labourers. The Irish, for example, had a strong
          community here long before the devastating Potato Famine pushed
          masses to North America.
        </p>

        <p>
          This deep British heritage laid the linguistic foundation. Today,
          while English is overwhelmingly the dominant language spoken by
          420,230 people, Halifax is entering a new era, welcoming a fresh
          wave of global immigrants.
        </p>

        <p>
          Among the non-official languages, Arabic is the most widely
          spoken, with 4,475 speakers, significantly outpacing the next
          largest groups, Punjabi (2,470 speakers) and Korean (1,600
          speakers).
        </p>

        <p>
          The fact that Arabic, along with Tagalog (1,315 speakers) and
          Hindi (1,040 speakers) combined are more prevalent than French
          (3,470 speakers) highlights the recent diversification of
          immigration in this East Coast, drawing communities primarily
          from the Middle East, South Asia, and East Asia.
        </p>

        {/* <Chart city="halifax"></Chart> */}
      </section>

      <div className="city-divider"></div>

      <p>
        Next, we head to Montreal, the vibrant cultural heart of French
        North America. This city&apos;s identity is defined by its powerful
        Francophone ties. Montreal’s exposure to the world got a huge boost
        from Expo 67, the spectacularly successful World’s Fair. It put
        Montréal on the global stage.
      </p>

      <section className="montreal-section" ref={montrealRef}>
        <p>
          To protect its unique French identity, Quebec took control of
          immigration. A key moment was Bill 101 (the Charter of the French
          Language) in 1977, which made French the official language and
          the required language for immigrant childrens schooling.
        </p>
        <p>
          This control was cemented with the 1991 Canada-Quebec Accord.
          This agreement gave the province almost total power to select its
          own economic immigrants and manage their French integration (
          francization ). The clear goal: to attract Francophones from
          across the globe.
        </p>

        <p>
          This strategy worked and created an incredibly diverse mix.
          Between 2016 and 2021, over 161,700 new immigrants arrived.
        </p>

        <p>
          The top countries of origin show a clear global Francophone
          attraction: France (15,295), Algeria (12,840), and Syria (11,595)
          led the way.
        </p>

        <p>
          This blend makes Montréal the only major Canadian city where
          French is the majority language, spoken by over 2.7 million
          people, while English also maintains a major presence with
          693,340 speakers. The city&apos;s truly cosmopolitan nature is
          further reflected in its leading non-official languages, where
          Spanish (90,235 speakers) and Arabic (89,800 speakers) indicate
          strong links to Latin America, the Middle East, and North Africa.
        </p>

        <p>
          However, European languages also have a deep historical
          footprint, with large communities of Italian (25,805 speakers),
          Russian (21,015 speakers), and Romanian (20,590 speakers)
          speakers.
        </p>

        {/* <Chart city="montréal"></Chart> */}
      </section>

      <div className="city-divider"></div>

      <p>
        We move west to Toronto, the massive, English-speaking metropolis
        that truly took off after World War II.
      </p>

      <section className="toronto-section" ref={torontoRef}>
        <p>
          During Word War II, Toronto was transformed into a vital
          industrial city. After the war, Canada needed workers, and the
          federal government opened the immigration doors wide to fuel the
          country&apos;s industrial and economic growth.
        </p>
        <p>
          Toronto then became the ultimate destination! Early waves brought
          not only European communities like Italians, British and
          Portuguese, but communities from all over the world from India,
          Guyana, the Philippines and so much more.
        </p>

        <p>
          The most spoken non-official language is Punjabi (Panjabi) with
          161,965 speakers. This is followed by Urdu (89,120 speakers) and
          Tamil (83,225 speakers), clearly showing Toronto&apos;s powerful
          ties to India, Pakistan, and Sri Lanka. Other huge communities
          include speakers of Spanish (78,275), Tagalog (77,925), and
          Iranian Persian (57,085).
        </p>

        <p>
          The city quickly transformed from a relatively Anglo-centric
          place to the dynamic, multicultural mosaic it is today. That
          postwar need for labor is why Toronto is now one of the most
          linguistically diverse places on the planet.
        </p>

        {/* <Chart city="toronto"></Chart> */}
      </section>

      <div className="city-divider"></div>

      <p>
        Now we explore the Prairies with Calgary and Edmonton, two cities
        whose fortunes are tied directly to the earth. Their histories are
        defined by natural resources.
      </p>

      <section className="calgary-section" ref={calgaryRef}>
        <p>
          While the region started with agriculture, the real game-changer
          was oil and gas. The discovery of major fields in the mid-20th
          century turned the region into an energy powerhouse.
        </p>
        <p>
          In 1976, The Federal Skilled Worker (FSW) Program was launched.
          It was the world&apos;s first point-based immigration program,
          designed to objectively select skilled immigrants based on
          criteria like education, age, and language proficiency, rather
          than being chosen subjectively by immigration officers.
        </p>

        <p>
          It took a few years for the program to show effective changes,
          but by the 1990s a shift in immigration patterns could be
          observed.
        </p>

        <p>
          The immigration statistics for Calgary and Edmonton confirm this
          policy-driven change, with the Philippines, India, and China now
          ranking as the top three source countries for new immigrants in
          both cities, clearly supplanting the United Kingdom and other
          European nations.
        </p>

        <p>
          Looking at the two cities head-to-head, you can also see a shared
          linguistic DNA driven by the same economic engine. In Calgary,
          the most spoken non-official language is Punjabi (40,490
          speakers), followed closely by Tagalog (28,505 speakers), the
          primary language of the Philippines. Edmonton shows a very
          similar pattern, with Punjabi (32,345 speakers) and Tagalog
          (26,000 speakers) leading the pack as well. Both cities also host
          significant communities speaking Arabic (around 12,700 speakers
          in each) and Spanish (with over 19,300 in Calgary and 11,570 in
          Edmonton). This shows that the pursuit of careers in the energy
          sector has created two modern, vibrant, and incredibly diverse
          linguistic hubs right in the heart of the Prairies.
        </p>

        {/* <Chart city="calgary"></Chart> */}
        {/* <Chart city="edmonton"></Chart> */}
      </section>

      <div className="city-divider"></div>

      <p>
        Finally, we land in Vancouver, a stunning city whose identity has
        been completely remade by its role as Canada&apos;s bridge to the
        Pacific.
      </p>

      <section className="vancouver-section" ref={vancouverRef}>
        <p>
          Vancouver had long-standing ties to Asia, but its modern era
          began in the 1980s. Key events included the international
          spotlight of Expo 86 and a new immigration program that welcomed
          wealthy investors.
        </p>
        <p>
          This coincided perfectly with political uncertainty surrounding
          the 1997 Handover of Hong Kong to China. Huge numbers of
          capital-rich immigrants from Hong Kong, and later Mainland China,
          chose Vancouver as their new home.
        </p>

        <p>
          The list of most common non-official languages reads like a map
          of the Asia-Pacific. Vancouver has substantial populations
          speaking Korean (40,045 speakers) and Tagalog (37,890 speakers).
          The city also has a surprisingly large community of Iranian
          Persian speakers (30,985). The prevalence of all these Asian and
          global languages, especially compared to the relatively small
          number of French speakers (8,685), highlights Vancouver&apos;s
          identity as a deeply Pacific-focused global city.
        </p>

        <p>
          The 2010 Winter Olympic Games held in Vancouver provided a global
          marketing platform for the city, and reinforced existing
          immigration trends.
        </p>

        {/* <Chart city="vancouver"></Chart> */}
      </section>

      <div className="city-divider"></div>

      <DataExplorer />
      <Footer />
    </>
  );
}

export default App;
