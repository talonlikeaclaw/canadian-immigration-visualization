import '../assets/styles/Footer.css';
export default function Footer(){
  return(
    <footer className="footer">
        © Fall 2025, team: Melania Chiru, Talon Dunbar, Habibullah Safari
      <br/>

        Data source: {''}
      <a
        href="https://www150.statcan.gc.ca/t1/tbl1/en/cv!recreate.action?pid=9810034901
        &selectedNodeIds=1D12,1D37,1D100,1D123,1D126,1D166,4D1
        &checkedLevels=1D1,2D1,4D5,5D1,5D2
        &refPeriods=20210101,20210101
        &dimensionLayouts=layout3,layout3,layout3,layout3,layout3,layout3,layout2
        &vectorDisplay=false"
        target="blank"
        rel=""
      >
            Statistics Canada: Custom 2021 Census Immigration Data
      </a> {''}
        and {''}
      <a 
        href="https://www150.statcan.gc.ca/t1/tbl1/en/cv!recreate.action?pid=9810019201
        &selectedNodeIds=
            4D4,4D5,4D7,4D115,4D127,4D145,4D149,4D159,4D177,4D178,4D184,4D187,4D197,
            4D203,4D214,4D218,4D219,4D220,4D229,4D233,4D242,4D243,4D248,4D249,4D250,4D251,4D255
        &checkedLevels=0D3,0D4,1D1,2D1,4D1
        &refPeriods=20210101,20210101
        &dimensionLayouts=layout3,layout3,layout3,layout3,layout3,layout2
        &vectorDisplay=false"
        target="blank"
        rel=""
      >
            Statistics Canada: Custom 2021 Census Language Data
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