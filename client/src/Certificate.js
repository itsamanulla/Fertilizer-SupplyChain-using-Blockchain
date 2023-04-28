import React from 'react'
import jsPDF from 'jspdf';



const HtmlToPdf = () => (
    <div class="containers bg-light " id='pdf-content'>
    <div class="logo">
        Government of India.
    </div>

    <div class="marquee">
        Certificate of Approval
    </div>

    <div class="assignment">
        This certificate is presented to
    </div>

    <div class="person">
       Fertilizer name
    </div>

    <div class="reason">
        For Completing all the tests.
    </div>
</div>
  );


function Certificate() {
    const divToDownload = document.getElementById('pdf-content');
    const handleDownload = () => {
        const doc = new jsPDF("l","pt","a4");
        doc.html(document.querySelector("#pdf-content"), {
          callback: function (pdf) {
            doc.save("certificate.pdf");
          }
        });
      };
    console.log( HtmlToPdf);
      return (
        <div>
          <div id="pdf-content">
            <HtmlToPdf />
          </div>
    
          <button onClick={handleDownload}>Download PDF</button>
        </div>
    

  )
}

export default Certificate