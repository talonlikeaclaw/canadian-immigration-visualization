import '../assets/styles/Footer.css';
export default function Footer(){
  return(
    <footer className="footer">
        © Fall 2025, team: Melania Chiru, Talon Dunbar, Habibullah Safari
        <br/>

        Data source: {''}
        <a
            href=""
            target="blank"
            rel=""
        >
            Statistics Canada: Custom 2021 Census Immigration Data
        </a> {''}
        and {''}
        <a 
            href=""
            target="blank"
            rel=""
        >
            Statistics Canada: Custom 2021 Census Language Data
        </a>
        .<br/>
        License under the {''}
        <a
            href=""
            target="blank"
            rel=""
            >
            Open Government License - Canada
        </a>
        .
    </footer>
  );
}