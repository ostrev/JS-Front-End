function search() {
   const textRef = document.getElementById('searchText');
   const townsRef = Array.from(document.querySelectorAll('#towns li'));
   const resultDiv = document.getElementById('result');
   const listBold = document.querySelectorAll("li")

   let counter = 0;

   textRef.addEventListener('click', handlerClear);

   let text = textRef.value;
   for (let townLi of townsRef) {
      let town = townLi.textContent;
      if (town.includes(text)) {
         townLi.style.textDecoration = "underline"
         townLi.style.fontWeight = "bold"
      }
   }
   
   for (let element of listBold) {
      if (element.style.textDecoration === "underline") {
         counter += 1
      }
   }

   let result = `${counter} matches found`
   resultDiv.textContent = result

   function handlerClear() {
      document.getElementById('searchText').value = '';
      for (let townLi of townsRef) {
         townLi.style.textDecoration = "none"
         townLi.style.fontWeight = "normal"
      }
   }
}
