const AddAnEvent = () =>{
    var title = document.querySelector("#eventtitle").value;
    if(title =='reset'){
        localStorage.removeItem("eventtitle");
    }
  if(title !=""){
      title =title.replaceAll(/\s/g, "-");
    var alreadyExist =  localStorage.getItem("eventtitle")?JSON.parse(localStorage.getItem("eventtitle")):"";
    if(Object.keys(alreadyExist).indexOf(title) == -1){
        var addNewItem = {
            ...alreadyExist,
            [title]:""
        }
     localStorage.setItem("eventtitle",  JSON.stringify(addNewItem));
   
     if(!document.getElementById("alreadyexistevent").classList.contains("hide") ){
        document.getElementById("alreadyexistevent").classList.add("hide")  ;
    }
    $("#eventtable").append('<tr> <td>'+title+'</td>  <td><a href="/event.html?id='+title+'">view</a></td></tr>');
    }else{
        if(document.getElementById("alreadyexistevent").classList.contains("hide") ){
            document.getElementById("alreadyexistevent").classList.remove("hide")  
        }
       
    }
  }
 }