
var fs=require('fs');
var rl=require('readline').createInterface({
  input:fs.createReadStream('csv/crimedata.csv')
});
var assault=[];
var firstRow=true;
rl.on('line',function(line)
{
  var arr=line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
          if(firstRow){firstRow=false;}
          else{
          var item=assault .find((x)=>(x.year==arr[17]));
          if(!item)
          {
            item={};
            item.year=arr[17];
            item["Arrest"]=0;
            item["NotArrested"]=0;
            assault.push(item);
          }
              if(arr[8]=="true" && arr[5]=="ASSAULT")
              {
                item["Arrest"]++;
              }
              if(arr[8]=="false" && arr[5]=="ASSAULT")
              {
                item["NotArrested"]++;
              }
           }
});
   rl.on("close",function(){

     var arrest=assault.sort((a,b)=>(a.year-b.year));
     fs.writeFile("Assault.json",JSON.stringify(arrest),function(err){
       if(err){
         console.log(err);
       }
       else{
         console.log("Assault.json created");
       }
     })
})
