
var fs=require('fs');
var rl=require('readline').createInterface({
  input:fs.createReadStream('csv/crimedata.csv')
});
var crimes=[];
var firstRow=true;
rl.on('line',function(line)
{
  var arr=line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
          if(firstRow){firstRow=false;}
          else{
          var item=crimes .find((x)=>(x.year==arr[17]));
          if(!item)
          {
            item={};
            item.year=arr[17];
            item["OVER $500"]=0;
            item["$500 AND UNDER"]=0;
          
            crimes.push(item);
          }
            if(arr[6]=="OVER $500"||(arr[6]=="$500 AND UNDER"))
              {
                  item[arr[6]]++;
              }

           }
});
   rl.on("close",function(){
    var sortCrimes=crimes.sort((a,b)=>(a.year-b.year));
    fs.writeFile("chicagoCrimes.json",JSON.stringify(sortCrimes),function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("chicagoCrimes.json created");
      }
    })

})
