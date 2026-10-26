import Card from "./Card";
import './Cardlist.css'
import stafflist from "./stafflist";

function Cardlist(props){



  const filteredstaff   = stafflist.filter((staff)=>{

    return(staff.name.toLowerCase().startsWith(props.searchTerm.toLowerCase()))


     })
return(
<div className="row">
   
  
   { filteredstaff.map(function c(staff, i){
return<Card 
      key= {staff.key}
      image = {staff.image}
      name=  {staff.name}
      job ={staff.job}
     
    />
    

    })}


</div>

)

}

export default Cardlist;