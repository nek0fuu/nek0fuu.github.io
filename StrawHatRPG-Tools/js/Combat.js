var ipfields=document.getElementsByClassName("IP");
var errors=document.getElementsByClassName("error-msg");
/*var dia=500;  135 30
var tit=365;    105 25
var ste=260;    80  20
var iro=180;    60  15
var bro=120     45  10
var sto=75;     35  10
var bon=40;     25  10
var woo=15;   15

W/Tungsten
3rd
500     90  10
390     95  15
295     80  15
215     65  15
150     50  10
100     40  10
60      30  10
30      20  10
10      10 

2nd
500 90  5
410 85  10
325 75  5
250 70  15
180 55  10
125 45  5
80  40  15
40  25  10
15  15  

1st
495 95  10
400 85  10
315 75  10
240 65  10
175 55  10
120 45  10
75  35  10
40  25  10
15  15  
*/


var thr5=500,thr5s=325,thr5o=125;
var thr4=400,thr4s=260,thr4o=100;
var thr3=300,thr3s=195,thr3o=75;
var thr2=200,thr2s=130,thr2o=50;
var thr1=100,thr1s=65,thr1o=25;
var attPow;

window.onload=function(){
    calculateAttack();
    calculateDefense();
    for(var i=0;i<ipfields.length;i++)
        {
            ipfields[i].addEventListener("change",calculateAttack);
            ipfields[i].addEventListener("change",calculateDefense);
            ipfields[i].style.border="";
        }
}

/*function getResult()
{
    for(var i=0;i<ipfields.length;i++)
        {
            ipfields[i].addEventListener("change",getResult);
            ipfields[i].style.border="";
        }
    calculateAttack();
    calculateDefense(); 
    
    var res=(attPow-dmgMit)*(1-resist);
    if(res<0)
        {
            res=0;
        }
    document.getElementById("dmgToDef").textContent=Math.round(res);

}*/
function calculateAttack()
{
    //var chp=document.getElementById("attchpIPF").valueAsNumber;
    //var thp=document.getElementById("attthpIPF").valueAsNumber;
    var basestr=document.getElementById("attstrIPF").valueAsNumber;
    var basespd=document.getElementById("attspdIPF").valueAsNumber;
    var basedex=document.getElementById("attdexIPF").valueAsNumber;
    var basewill=document.getElementById("attwillIPF").valueAsNumber;
    var attackLevel=document.getElementById("attattackLevel").value;
    var hakiLevel=document.getElementById("attHakiLevel").value;
    //var soruLevel=document.getElementById("soruLevel").value;
    var boostedSpeed=document.getElementById("boostedSpeed");
    //var SpecBoost=document.getElementById("attspecBoost").valueAsNumber;
    //var HakiSpecBoost=document.getElementById("atthakispecBoost").valueAsNumber;
    var meitoGrade=document.getElementById("attbladeGrade").value;
    var PowCheck=document.getElementById("attPowCheck").checked;
    var DFCheck=document.getElementById("attDFCheck").checked;
    var UACheck=document.getElementById("attUACheck").checked;
    var NACheck=document.getElementById("attNACheck").checked;
    var attackPower,attackMult,i,lowest=9999;
    var SoruBoost,SoruMult,spdReq;
    var baseAtt=0,hakiAtt=0,powerAtt=0,MeitoAtt=0,attSrc;
    var stats=[basestr,basespd,basedex,basewill];
    var strFactor=.35;
    var spdFactor=.15;
    var dexFactor=.35;
    var willFactor=.15;
    var overflow=.25;
    var thr=9;
    for(i=0;i<errors.length;i++)
    {
        errors[i].style.visibility="hidden";  //Hide Errors by Default
    }
    /*if(attackLevel.charAt(2)!="S"&&attackLevel!="RK5")
        {
            document.getElementById("attspecBoost").valueAsNumber=0;
            document.getElementById("attspecBoost").disabled=true;
        }
    else
        {   
            document.getElementById("attspecBoost").disabled=false;
        }*/
    switch(attackLevel)
        {
            case "NS9":baseAtt=1.00;break;
            case "IW1":baseAtt=.45;thr=1;break;
            case "IW2":baseAtt=.56;thr=2;break;
            case "IW3":baseAtt=.67;thr=3;break;
            case "IW4":baseAtt=.78;thr=4;break;
            case "IW5":baseAtt=.90;thr=5;break;
            case "FS1":baseAtt=.55;thr=1;break;
            case "FS2":baseAtt=.65;thr=2;break;
            case "FS3":baseAtt=.75;thr=3;break;
            case "FS4":baseAtt=.85;thr=4;break;
            case "FS5":baseAtt=.95;thr=5;break;
            case "FSS":baseAtt=1.05;break;
            case "SO1":baseAtt=1.00;SoruMult=0.30;spdReq=70;break;
            case "SO2":baseAtt=1.00;SoruMult=0.35;spdReq=140;break;
            case "SO3":baseAtt=1.00;SoruMult=0.40;spdReq=210;break;
            case "SOS":baseAtt=1.00;SoruMult=0.45;spdReq=250;break;
            case "SH1":baseAtt=1.05;thr=2;break;
            case "SH2":baseAtt=1.10;thr=3;break;
            case "SH3":baseAtt=1.15;thr=5;break;
            case "SHS":baseAtt=1.20;break;
            case "RK1":baseAtt=.50;thr=2;break;
            case "RK2":baseAtt=.60;thr=3;break;
            case "RK3":baseAtt=.70;thr=5;break;
            case "RKS":baseAtt=.80;break;
            case "RG1":baseAtt=1.2;break;
            case "RG2":baseAtt=1.3;break;
            case "RG3":baseAtt=1.4;break;
            case "RGS":baseAtt=1.5;break;
                
            default:baseAtt=0;break;
        }
    SoruBoost=(spdReq*1.5+basespd)*SoruMult;
    document.getElementById("SoruSpd").textContent=Math.round(basespd+SoruBoost);
    
    if(attackLevel.includes("SO"))
        {
            document.getElementById("hideThisSoru").style.display="";
        }
    else
        {
            document.getElementById("hideThisSoru").style.display="none";            
        }
    switch(hakiLevel)
        {
            case "HC1":hakiAtt=0.05;break;
            case "HC2":hakiAtt=0.10;break;
            case "HC3":hakiAtt=0.20;break;
            case "HCS":hakiAtt=0.25;break;
            case "HR1":hakiAtt=0.025;break;
            case "HR2":hakiAtt=0.05;break;
            case "HRS":hakiAtt=0.075;break;
            default:break;
        }
    if(attackLevel.charAt(1)=="S")
        {
            document.getElementById("hideThisBladeGrade").style.display="";
            document.getElementById("attbladeGrade").disabled=false;
        }
    else
        {
            document.getElementById("hideThisBladeGrade").style.display="none";
            document.getElementById("attbladeGrade").disabled=true;
            document.getElementById("attbladeGrade").value="NON"
        }
    if(attackLevel.includes("FS"))
       {
            document.getElementById("hideThisCheck").style.display="";
       }
       else
       {
            document.getElementById("hideThisCheck").style.display="none";
       }
    switch(meitoGrade)
        {
            case "WAZ":MeitoAtt=0.05;break;
            case "RYO":MeitoAtt=0.10;break;
            case "OWA":MeitoAtt=0.15;break;
            case "SOW":MeitoAtt=0.25;break;
            default:break;
        }
    if(PowCheck)
        {
            powerAtt=0.10;
        }
    attSrc=[baseAtt,powerAtt,hakiAtt,MeitoAtt].sort();
    attSrc.reverse();
    //console.log(attSrc);
    //attackMult=attSrc[0]+attSrc[1]*.85+attSrc[2]*.70+MeitoAtt;
    attackMult=attSrc[0]+attSrc[1]+attSrc[2]+attSrc[3];
    if((DFCheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.9;
        }
    if((UACheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.95;
        }
    
    attackPower=diminish2((strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)*attackMult);
    for(i=0;i<stats.length;i++)
        {
            if(stats[i]<=lowest)
                {
                    lowest=stats[i];
                }
        }
    if((attackPower>thr1)&&(thr==1))
       {
            attackPower=(attackPower-thr1)*overflow+thr1;
       }
    if((attackPower>thr2)&&(thr<=2))
       {
            attackPower=(attackPower-thr2)*overflow+thr2;
       }
    if((attackPower>thr3)&&(thr<=3))
       {
            attackPower=(attackPower-thr3)*overflow+thr3;
       }
    if((attackPower>thr4)&&(thr<=4))
       {
            attackPower=(attackPower-thr4)*overflow+thr4;
       }
    if((attackPower>thr5)&&(thr<=5))
       {
            attackPower=(attackPower-thr5)*overflow+thr5;
       }
    
    
    
    if((attackPower>basestr*2)||(attackPower>lowest*5))
        {
            if(basestr*2<lowest*5)
                {
                    attackPower=((attackPower-basestr*2)*overflow)+(basestr*2);
                }
            else
                {
                    attackPower=((attackPower-lowest*5)*overflow)+(lowest*5);
                }
            
        }
    document.getElementById("attPow").textContent=Math.round(attackPower);
    attPow=attackPower;
    
}
function calculateDefense()
{
    //var chp=document.getElementById("defchpIPF").valueAsNumber;
    //var thp=document.getElementById("defthpIPF").valueAsNumber;
    var basestam=document.getElementById("defstmIPF").valueAsNumber;
    var basewill=document.getElementById("defwillIPF").valueAsNumber;
    var tekkai=document.getElementById("deftekkaiLevel").value;
    var haki=document.getElementById("defHakiLevel").value;
    //var tspec=document.getElementById("defTekkaiSpecBoost").valueAsNumber;
    //var hspec=document.getElementById("defHakiSpecBoost").valueAsNumber;
    var armor=document.getElementById("defarmIPF").valueAsNumber;
    var armorPerk=document.getElementById("defArmorPerkLevel").value;
    var atthakiLevel=document.getElementById("attHakiLevel").value;
    var attackLevel=document.getElementById("attattackLevel").value;
    var totMit,defPower,maxArmor,armorSources;
    var statDef,HakiMult,TekkaiMult,HakiMin,TekkaiMin,HakiBoost,TekkaiBoost,willReq,stamReq;
    var stamFactor=.175,willFactor=0.075;
    var overflow=.25,sloverflow=.10;
    
    statDef=basestam*stamFactor+basewill*willFactor;
    
    if((statDef>basestam/2)||(statDef>basewill))
        {
            if(basestam<basewill/2)
                {
                    statPower=(statDef-basestam/2)*overflow+basestam;
                }
            else
                {
                    statPower=(statDef-basewill)*overflow+basewill;
                }
        }
    switch(tekkai)
        {
            case "TK1":TekkaiMult=0.225;stamReq=70;break;
            case "TK2":TekkaiMult=0.325;stamReq=140;break;
            case "TK3":TekkaiMult=0.425;stamReq=210;break;
            case "TKS":TekkaiMult=0.500;stamReq=250;break;
            default:TekkaiMult=0;stamReq=0;break;
        }
    switch(haki)
        {
            case "HC1":HakiMult=0.275;willReq=250;break;
            case "HC2":HakiMult=0.350;willReq=300;break;
            case "HC3":HakiMult=0.425;willReq=350;break;
            case "HCS":HakiMult=0.500;willReq=375;break;    
            default:HakiMult=0;willReq=0;break;
        }
    //TekkaiMin=TekkaiMult*600;
    //HakiMin=HakiMult*600;
    
    HakiBoost=(willReq*1.5+basewill)*HakiMult;
    TekkaiBoost=(stamReq*1.5+basestam)*TekkaiMult;
    
    
    switch(armorPerk)
        {
            case "AP1":maxArmor=100;break;
            case "AP2":maxArmor=200;break;
            case "AP3":maxArmor=300;break;
            case "AP4":maxArmor=400;break;
            case "AP5":maxArmor=500;break;
            default:maxArmor=15;break;
        }
    if(armor>maxArmor)
        {
            armor=(armor-maxArmor)*overflow+maxArmor;
        }
    armorSources=[statDef,HakiBoost,TekkaiBoost,armor].sort();
    armorSources.reverse();
    //console.log(armorSources);
    defPower=diminish(armorSources[0]+armorSources[1]*.85+armorSources[2]*.70+armorSources[3]*.55);
    
    totMit=mitigate(attPow,diminish(defPower));
    switch(atthakiLevel)
        {
            case "HR1":totMit*=.80;break;
            case "HR2":totMit*=.65;break;
            case "HRS":totMit*=.50;break;
            default:break;
        }
    switch(attackLevel)
        {           
            case "RG7":totMit*=.95;break;
            case "RG8":totMit*=.90;break;
            case "RG9":totMit*=.85;break;
            case "RGS":totMit*=.80;break;
            default:break;
                
        }

    document.getElementById("totMit").textContent=Math.round((totMit/attPow)*100)+"%";
    document.getElementById("IntMit").textContent=Math.round(diminish(defPower));
}

function mitigate(power,hardness)
{
    var mitRate=0,mitAmt,maxblock,minblock;
    
    minblock=.1+hardness/500*.3;
    maxblock=.9;
    //maxblock=.75+hardness/850*.15;
    if(minblock>.4)
        {
            minblock=.4
        }
    if(maxblock>.9)
        {
            maxblock=.9;
        }
    mitRate=minblock+(1-(power/hardness)*(1-minblock));
    if(mitRate<minblock)
        {
            mitRate=minblock
        }
    mitAmt=mitRate*hardness;
    if(mitAmt>=power*maxblock)
        {
            mitAmt=power*maxblock;
        }
    return mitAmt;
}
function diminish(basestat)
{
    var res=0,multiplier=1,increment=50,decreases=.005,decreasem=.99,decreaseincr=5;
    while(basestat>=increment&&multiplier>0)
        {
            res+=increment*multiplier;
            basestat-=increment;    
            multiplier*=decreasem;
            if(increment>10)
                {
                    increment-=decreaseincr;
                }
        }
    res+=basestat*multiplier;
    return res;
}
function diminish2(basestat)
{
    var res=0,multiplier=1,increment=50,decreases=.005,decreasem=.99,decreaseincr=5;
    while(basestat>=increment&&multiplier>0)
        {
            res+=increment*multiplier;
            basestat-=increment;    
            multiplier-=decreases;
            if(increment>10)
                {
                    increment-=decreaseincr;
                }
        }
    res+=basestat*multiplier;
    return res;
}
/*
            */