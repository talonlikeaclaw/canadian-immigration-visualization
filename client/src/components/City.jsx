import '../assets/styles/City.css';

function City({cityName, ref}){
  return (
    <>
      {cityName === 'halifax' && displayHalifax(ref)}
      {cityName === 'montreal' && displayMontreal(ref)}
      {cityName === 'toronto' && displayToronto(ref)}
      {cityName === 'calgary' && displayCalgary(ref) && displayEdmonton(ref)}
      {cityName === 'vancouver' && displayVancouver(ref)}
    </>
  );
}

function displayHalifax(ref){
  return (
    <section className="halifax-section city-section" ref={ref}>
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
  );
}

function displayMontreal(){
  return (
    <h1>Montreal</h1>
  );
}

function displayToronto(){
  return (
    <h1>Toronto</h1>
  );
}

function displayCalgary(){
  return (
    <h1>Calgary</h1>
  );
}

function displayEdmonton(){
  return (
    <h1>Edmonton</h1>
  );
}

function displayVancouver(){
  return (
    <h1>Vancouver</h1>
  );
}

export default City;