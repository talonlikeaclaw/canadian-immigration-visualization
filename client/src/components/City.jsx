function City({cityName}){
  return (
    <>
      {cityName === 'halifax' && displayHalifax()}
      {cityName === 'montreal' && displayMontreal()}
      {cityName === 'toronto' && displayToronto()}
      {cityName === 'calgary' && displayCalgary() && displayEdmonton()}
      {cityName === 'vancouver' && displayVancouver}
    </>
  );
}

function displayHalifax(){
  return (
    <h1>Halifax</h1>
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