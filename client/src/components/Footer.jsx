import '../assets/styles/Footer.css';
export default function Footer(){
  return(
    <footer className="footer">
        © Fall 2025, team: Melania Chiru, Talon Dunbar, Habibullah Safari
      <br/>

        Data source: {''}
      <a
        href="http://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=9810034901"
        target="blank"
        rel=""
      >
            Statistics Canada: 2021 Census Immigration Data
      </a> {''}
        and {''}
      <a 
        href="http://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=9810019201"
        target="blank"
        rel=""
      >
            Statistics Canada: 2021 Census Language Data
      </a>
        .<br/>
        Licensed under the {''}
      <a
        href="https://open.canada.ca/en/open-government-licence-canada"
        target="blank"
        rel=""
      >
            Open Government License - Canada
      </a>
        .
      <br/> <br/>
      <em className="footer-disclaimer"> 
          The data prensented in this project is intended solely for the educational
           and analytical purposes. 
          It does not reflect any political, religious, or ideological stance by the authors.
      </em>
    </footer>
  );
}