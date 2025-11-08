import '../assets/styles/Footer.css';
export default function Footer(){
  return(
    <footer className="footer">
        © Fall 2025, team: Melania Chiru, Talon Dunbar, Habibullah Safari
        <br/>

        Data source: {''}
        <a
            href="https://www150.statcan.gc.ca/t1/tbl1/en/cv!recreate.action?pid=9810034901&selectedNodeIds=1D12,1D37,1D100,1D123,1D126,1D166,4D1&checkedLevels=1D1,2D1,4D5,5D1,5D2&refPeriods=20210101,20210101&dimensionLayouts=layout3,layout3,layout3,layout3,layout3,layout3,layout2&vectorDisplay=false"
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
            href="https://open.canada.ca/en/open-government-licence-canada"
            target="blank"
            rel=""
            >
            Open Government License - Canada
        </a>
        .
    </footer>
  );
}