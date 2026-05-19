console.log("Aditya jain is best");
const fs=require("fs");
fs.writeFile("output.txt","Writing File", (err)=>{
  if (err) {
    console.log("Error occured");
    
  }
  else console.log("file is written Successfully");

})