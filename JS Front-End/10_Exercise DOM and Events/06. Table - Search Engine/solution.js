function solve() {
   
   const tableRef = Array.from(document.querySelectorAll('body > table > tbody tr'));

   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      
      const input = document.getElementById('searchField').value;
      for (let row of tableRef) {
         let rowText = row.textContent;
         if (rowText.includes(input)) {
            row.classList.add('select')
         } else {
            row.classList.remove('select')
         }
         
      }


   }
}