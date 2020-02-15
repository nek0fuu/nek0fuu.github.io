var sheet,data,logB5,log,PPTrack,resRange
function getPermaCachedData()
{

  var properties=PropertiesService.getScriptProperties()
  var cached=properties.getProperties()
  if(cached) {
    //SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     //.alert("Cache Exists"+cached);
    //Logger.log(cached)
    return cached;
  }
}
function setPermaCachedData()
{
  var properties=PropertiesService.getScriptProperties()
  var i=0,j=0,str="",values={};
  //SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    // .alert("Setting Cache");
  var sheet=SpreadsheetApp.getActiveSpreadsheet();
  var log=sheet.getSheetByName("Log").getDataRange().getValues();
  var PerkLegend=sheet.getSheetByName("Perk Legend").getDataRange().getValues();
  var PPTrack=sheet.getSheetByName("Copy of PP Tracker").getDataRange().getValues();
  for (i=2;i<log.length;i++)
  {
    if(log[i][0]=="Character Name")
    {
      break;
    }
    for(j=0;j<=2;j++)
    {
      str=i+"Log"+j;
      values[str]=log[i][j].toString();
    }
  }
  for(i=1;i<PerkLegend.length;i++)
  {
    for(j=0;j<=5;j++)
    {
      str=i+"Legend"+j;
      values[str]=PerkLegend[i][j].toString();
    }
  }
  for(i=2;i<PPTrack.length;i++)
  {
    if(PPTrack[i][0]=="Character Name")
    {
      break;
    }
    for(j=0;j<PPTrack[i].length;j++)
    {
      str=i+"PP"+j;
      values[str]=PPTrack[i][j].toString();
    }
  }
  values["LogLen"]=log.length.toString();
  values["LegLen"]=PerkLegend.length.toString();
  values["PPLen"]=PPTrack.length.toString();
  properties.setProperties(values, true);
  //SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
    // .alert("Cache Created");
  return values;
}
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Stats Menu')
      .addItem('First item', 'TestShit')
      .addSeparator()
      .addSubMenu(ui.createMenu('Sub-menu')
          .addItem('Set Perma Cache', 'setPermaCachedData')
           .addItem('Get Perma Cache (Test)', 'CommitPP')
          
                 
                 )
      .addToUi();
}

function statSplit(earned,index) {
  index=Number(index);
  if(earned=="")
  {
    return ""
  }
  /*
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = sheet.getSheets();
  var log=data[1].getDataRange().getValues();
  */
  var log=getPermaCachedData();
  var stri=index-1+"Log0";
  var name=log[str];
  stri=index+"Log2"
  var stm=Number(log[stri]);
  stri=index+1+"Log2"
  var str=Number(log[stri]);
  stri=index+2+"Log2"
  var spd=Number(log[stri]);
  stri=index+3+"Log2"
  var dex=Number(log[stri]);
  stri=index+4+"Log2"
  var will=Number(log[stri]);
  /*
  var name=log[index-1][0];
  var stm=log[index][2];
  var str=log[index+1][2];
  var spd=log[index+2][2];
  var dex=log[index+3][2];
  var will=log[index+4][2];
  */
 
  var total=stm+str+spd+dex+will;
  var phys=stm+str+spd;
  var mental=dex+will;
  var newphys=Math.round((total+earned)*.6-phys)
  var newmen=Math.round((total+earned)*.4-mental)
  return "("+newphys+"/"+newmen+")";
  
}

function PP(Arg2,charName)
{
  //charName=charName.getValue().toString();
  var Arg1="";
  /*
  for(var u=1;u<Arg2.getWidth();u++)
  {
    Arg1+=Arg2.getCell(1,u).getValue().toString();
  }
  */
  //return Arg1[0];
  var AllPerks=[];
  var stat=[]
  var statReqs=[]
  var perkReqs=[]
  
  var i=0,j=0,k=0,x=0,y=0,a=0,b=0,stri,stri2;
  var statCheckCounter,statCheckFlag=true, perkCheckFlag=true, perkCheckCounter, error="", totalPP=0, index, perkFoundFlag, reducedCostFlag;
  /*
  for(i in Arg1.toString().split(","))
  {
    if(Arg1.toString().split(",")[i]!="")
    {
      Perks[x]=Arg1.toString().split(",")[i].trim().toString();
      x++;
    }
  }
  x=0;
  //return Perks; Test Return
  */
  x=0;
  //Arg2=Arg1.toString().split(",");
  //return Arg2[3];
  /*
  for(i in Arg2)
  {
    if(Arg2[i]!="")
    {
      AllPerks[x]=Arg2[i].toString().trim();
      x++;
    }
  }
  */
  /*
  for(i in Arg2)
  {
    for(j in Arg2[i].toString().split(","))
    {
      if(Arg2[i].toString().split(",")[j]!="")
      {
        AllPerks[x]=Arg2[i].toString().split(",")[j].trim().toString();
        x++;
      }
    }
  }*/
  for(i in Arg2.toString().split(","))
  {
    if(Arg2.toString().split(",")[i]!=0)
    {
      AllPerks[x]=Arg2.toString().split(",")[i].trim();
      x++;
    }
  }
  
  x=0;
  
  //return AllPerks[0]; //Test Return
  /*
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = sheet.getSheets();
  var log=data[1].getDataRange().getValues();
  var PerkLegend=data[4].getDataRange().getValues();
  */
  var data=getPermaCachedData();
  
  
  for(i=2;i<data["LogLen"];i++)
  {
    stri=i+"Log0"
    if(data[stri]==charName)
    {
      index=i;
      break;
    }
    /*
    if(log[i][0]==charName)
    {
      index=i;
    }
    */
  }
  //index++;
  
  //index=45;
  //return index; Test Return
  /*
  var baseTot=log[index-1][2];
  var stm=Math.round(log[index][2]+(log[index][1]/100)*baseTot);
  var str=Math.round(log[index+1][2]+(log[index+1][1]/100)*baseTot);
  var spd=Math.round(log[index+2][2]+(log[index+2][1]/100)*baseTot);
  var dex=Math.round(log[index+3][2]+(log[index+3][1]/100)*baseTot);
  var will=Math.round(log[index+4][2]+(log[index+4][1]/100)*baseTot); 
  */
  stri=index+"Log2";
  stat[0]=Number(data[stri]);
  var total=0
  for(i=1;i<6;i++)
  {
    stri=(index+i)+"Log2";
    stri2=(index+i)+"Log1";
    stat[i]=Math.round(Number(data[stri])+(Number(data[stri2])/100*stat[0]))
    total+=stat[i]
  }
  stat[0]=total;
  //var total=stm+str+spd+dex+will; //Setting all the Players Stat Info for Comparision
  var error="";
  //stat=[total,stm,str,spd,dex,will];
  //return stat[0]; //Test Return
  
  for(i in AllPerks)
  {
    perkFoundFlag=false;
    for(j=0;j<data["LegLen"];j++)
    {
      stri=j+"Legend1"
      if(AllPerks[i]==data[stri])
      {
        perkFoundFlag=true;
        stri=j+"Legend4"
        for(k in data[stri].toString().split("|")) //change 11 to 5 later (L to E col)
        {
          statReqs[k]=ConvStrToReqArrStat(data[stri].toString(),k);
          //if(k==1)return statReqs[k]; Test Return
          statCheckFlag=false;
          statCheckCounter=0;
          for(a in statReqs[k])
          {
            if(stat[a]>=statReqs[k][a])
            {
              statCheckCounter++;
            }
            else
            {
              break;
            }    
          }
          if(statCheckCounter==6)
          {
            statCheckFlag=true;
          }
          if(statCheckFlag)
            break;
        }
        stri=j+"Legend5"
        for(k in data[stri].toString().split("|")) //change 10 to 6 (K to F)
        {
          perkReqs[k]=ConvStrToReqArrPerk(data[stri].toString(),k);
          //if(k==1)return perkReqs[k]; Test Return
          perkCheckFlag=false;
          perkCheckCounter=0;
          
          for(a in perkReqs[k])
          {
            for(b in AllPerks)
            {
              if(perkReqs[k][a]==AllPerks[b])
              {
                perkCheckCounter++;
                break;
              }
            }
          }
          if(perkCheckCounter==perkReqs[k].length)
          {
            perkCheckFlag=true;
          }
          if(perkCheckFlag)
            break;
        }
        if(!statCheckFlag)
        {
          stri=j+"Legend2"
          error+="Missing Stats for "+data[stri]+", ";
        }
        if(!perkCheckFlag)
        {
          stri=j+"Legend2";
          error+="Missing Perks for "+data[stri]+", ";
        }
        if(error=="")
        {
          stri=j+"Legend3"
          for(k in AllPerks)
          {
            reducedCostFlag=false;
            if(AllPerks[k]=="PFiS6S")
            {
              if(AllPerks[i].charAt(AllPerks[i].length-1)=="S")
              {
                totalPP+=Number(data[stri])/2;
                reducedCostFlag=true;
                break;
              }
            }
          }
          if(!reducedCostFlag)
          {
            totalPP+=Number(data[stri]);
          }
        }
        break;
      }
      if(data[stri]=="OCP1")
      {
        break;
      }
    }
    if(!perkFoundFlag)
    {
      error+=AllPerks[i]+" Not found, ";
    }
  }
  if(error=="")
  {
    return totalPP;
  }
  else
  {
    return error;
  }
}

function ConvStrToReqArrStat(Arg,reqNo)
{
  var reqs=Arg.toString().split("|")[reqNo];
  var str=reqs.split(":")
  var res=[];
  for(var i=1;i<str.length;i++)
  {
    res[i-1]=str[i].split("&")[0];
  }
  return res;
}
function ConvStrToReqArrPerk(Arg,reqNo)
{
  var reqs=Arg.toString().split("|")[reqNo];
  var str=reqs.split("&")
  var res=[];
  for(var i=0;i<str.length;i++)
  {
    res[i]=str[i].toString();
  }
  return res;
}
/********************************************************************************/
function TestShit()
{
  //logB5[1].clearContent();
  var arg1=[]
  var ResArr=[]
  for(var i=2;i<PPTrack.length;i++)
  {
    arg1=[]
    for(var j=4;j<PPTrack[i].length;j++)
    {
      arg1[j]=PPTrack[i][j];
    }
    ResArr[i]=PP(arg1,PPTrack[i][0])
  }
  return i;
  /*
  PP([data][4][i][5]-data[4][i][30],data[4][i][0])
  for(var i=3;i<resRange.getHeight();i++)
  {
    resRange.getCell(i,4).setValue(PP(resRange.getSheet().getRange(i, 5, 1, 27),resRange.getCell(i,1)));
  }
  //resRange.getCell(9,4).setValue(PP(resRange.getSheet().getRange(9, 5, 1, 27),resRange.getCell(9,1))))
  
  //logB5.getCell(1, 1).setValue("A");
  //logB5.getValues()[0].value="A"
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked Clear Log!')//+resRange.getCell(9,4).setValue(PP(resRange.getSheet().getRange(9, 5, 1, 27),resRange.getCell(9,1))));*/
}
function TestShit2(x)
{
   var sheet=SpreadsheetApp.getActiveSpreadsheet();
  var l=getPermaCachedData();
  var str;
  for(var i=8;i<10;i++)
  {
    for(var j=0;j<3;j++)
    {
      str=i+"Log"+j;
      //if(l[str]=="Paramecia 3")
      {
         SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
         .alert('You clicked !'+l[str]+"\ni="+i+"\nj="+j);
      }
    }
  }
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert("Test Fn Ended");
  //var str='2log0'
 //SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
   //  .alert('You clicked a!'+l[str]);
  //sheet.getSheetByName("Log").getDataRange().getValues()[0][0]
  //resRange.getCell(del,4).setValue(PP(resRange.getSheet().getRange(del, 5, 1, 27),resRange.getCell(del,1)))
  //TestShit3();
}
function TestShit3(x)
{
  return 2*2;
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
     .alert('You clicked !'+del);
}
function CommitPP()
{
  var data=setPermaCachedData();
  var ResArr=[];//=new Array(Number(data["PPLen"]));
  var name;
  for(i=2;i<Number(data["PPLen"]);i++)
  {
    ResArr[i-2]=[];
    ResArr[i-2][0]=0;
  }
  var x,i=0,j=0,str="",arg="";
  for(i=0;i<ResArr.length;i++)
  {
    arg="";
    for(j=0;j<=29;j++)
    {
      str=(i+2)+"PP"+(j+4);
      if(data[str])
      {
        arg+=data[str];
      }
    }
    str=(i+2)+"PP0"
    name=data[str]
    if(name=="Character Name")
    break;
    ResArr[i][0]=PP(arg,name); //call PP function here
  }
  var sheet=SpreadsheetApp.getActiveSpreadsheet();
  var resRange=sheet.getSheetByName("Copy of PP Tracker").getRange("D3:D405");
  resRange.setValues(ResArr);
  
}
