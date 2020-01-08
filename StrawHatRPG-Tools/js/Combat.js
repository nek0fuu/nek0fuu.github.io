var ipfields=document.getElementsByClassName("IP");
var errors=document.getElementsByClassName("error-msg");
/*
var dia=500;  135 30
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

500 380 130 500 380 95
480 380 110 485 380 84
460 380 90  470 380 73
440 380 70  455 380 61
420 380 50  440 380 50
400 380 30  425 380 39
380 380 10  410 380 28
            395 380 16
            380 380 5
            
            

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
var attPow,breakAmt;

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
    var oppwill=document.getElementById("defwillIPF").valueAsNumber;
    var attackLevel=document.getElementById("attattackLevel").value;
    var hakiLevel=document.getElementById("attHakiLevel").value;
    var boostedSpeed=document.getElementById("boostedSpeed");
    var meitoGrade=document.getElementById("attbladeGrade").value;
    var PowCheck=document.getElementById("attPowCheck").checked;
    var DFCheck=document.getElementById("attDFCheck").checked;
    var UACheck=document.getElementById("attUACheck").checked;
    var NACheck=document.getElementById("attNACheck").checked;
    var focCheck=document.getElementById("attHaoFoc").checked;
    var attackPower,attackMult,i,lowest=9999;
    var SoruBoost,SoruMult,spdReq;
    var baseAtt=0,hakiAtt=0,powerAtt=0,MeitoAtt=0,attSrc;
    var stats=[basestr,basespd,basedex,basewill];
    var strFactor=.35;
    var spdFactor=.125;
    var dexFactor=.35;
    var willFactor=.175;
    var overflow=.25;
    var thr=9999,restype;
    var baseDrain, HaoMult,totalDrain,willDiff,focHao=1,maxDrain,willReq,maxPerc,willReq,HakiMult,ryouMult,base2Drain,scaleDrain;
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
            case "NS9":baseAtt=1.00;restype="AttMeito";break;
            case "IW1":baseAtt=.45;thr=100;restype="Att";break;
            case "IW2":baseAtt=.56;thr=200;restype="Att";break;
            case "IW3":baseAtt=.67;thr=300;restype="Att";break;
            case "IW4":baseAtt=.78;thr=400;restype="Att";break;
            case "IW5":baseAtt=.90;thr=500;restype="Att";break;
            case "FS1":baseAtt=.55;thr=100;restype="AttMeitoFS";break;
            case "FS2":baseAtt=.65;thr=200;restype="AttMeitoFS";break;
            case "FS3":baseAtt=.75;thr=300;restype="AttMeitoFS";break;
            case "FS4":baseAtt=.85;thr=400;restype="AttMeitoFS";break;
            case "FS5":baseAtt=.95;thr=500;restype="AttMeitoFS";break;
            case "FSS":baseAtt=1.05;restype="AttMeitoFS";break;
            case "SO1":baseAtt=1.00;SoruMult=0.30;spdReq=70;restype="Soru";break;
            case "SO2":baseAtt=1.00;SoruMult=0.35;spdReq=135;restype="Soru";break;
            case "SO3":baseAtt=1.00;SoruMult=0.40;spdReq=200;restype="Soru";break;
            case "SOS":baseAtt=1.00;SoruMult=0.45;spdReq=265;restype="Soru";break;
            case "SH1":baseAtt=1.05;restype="Att";break;
            case "SH2":baseAtt=1.10;restype="Att";break;
            case "SH3":baseAtt=1.15;restype="Att";break;
            case "SHS":baseAtt=1.20;restype="Att";break;
            case "RK1":baseAtt=.50;thr=165;restype="Att";break;
            case "RK2":baseAtt=.625;thr=335;restype="Att";break;
            case "RK3":baseAtt=.75;thr=500;restype="Att";break;
            case "RKS":baseAtt=.875;restype="Att";break;
            case "RG1":baseAtt=1.2;restype="Att";break;
            case "RG2":baseAtt=1.3;restype="Att";break;
            case "RG3":baseAtt=1.4;restype="Att";break;
            case "RGS":baseAtt=1.5;restype="Att";break;
            case "HAL":baseDrain=0;base2Drain=0;HaoMult=.2;willReq=200;restype="Hao";break;
            case "HAM":baseDrain=5;base2Drain=10;HaoMult=.25;willReq=250;restype="Hao";break;
            case "HAH":baseDrain=10;base2Drain=20;HaoMult=.3;willReq=300;restype="Hao";break;
            case "HAI":baseDrain=15;base2Drain=30;HaoMult=.35;willReq=350;restype="Hao";break;
            case "HAS":baseDrain=20;base2Drain=40;HaoMult=.40;willReq=400;restype="Hao";break;
                
            default:baseAtt=0;thr=9999;break;
        }
    
    if(restype.includes("Soru"))
        {
            document.getElementById("hideThisSoru").style.display="";
        }
    else
        {
            document.getElementById("hideThisSoru").style.display="none";            
        }
    if(restype.includes("Att"))
        {
            document.getElementById("hideThisAttackRes").style.display="";
            document.getElementById("hideThisPowCheck").style.display="";
            document.getElementById("hideThisHaki").style.display="";
        }
    else
        {
            document.getElementById("hideThisAttackRes").style.display="none"; 
            document.getElementById("hideThisPowCheck").style.display="none";
            document.getElementById("hideThisHaki").style.display="none";
        }
    if(restype.includes("Hao"))
        {
            document.getElementById("hideThisHao").style.display="";
            document.getElementById("hideThisHaoCheck").style.display="";
        }
    else
        {
            document.getElementById("hideThisHao").style.display="none";  
            document.getElementById("hideThisHaoCheck").style.display="none";
        }
    if(restype.includes("Meito"))
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
    if(restype.includes("FS"))
       {
            document.getElementById("hideThisCheck").style.display="";
       }
       else
       {
            document.getElementById("hideThisCheck").style.display="none";
       }
    SoruBoost=(spdReq+basespd)*SoruMult;
    document.getElementById("SoruSpd").textContent=Math.round(basespd+SoruBoost);
    
    if(!focCheck)
       focHao=.6;
    baseDrain=(basewill+willReq)*HaoMult/10;
    maxDrain=(basewill+willReq)*HaoMult/10*2;
    scaleDrain=(basewill-oppwill)*.4;
    totalDrain=baseDrain+scaleDrain;
    

    totalDrain=diminish0(scaleDrain+baseDrain);
    if(totalDrain>maxDrain)
        totalDrain=maxDrain;
    if(totalDrain<0)
        {
            totalDrain=0;
        }
    totalDrain*=focHao;
    document.getElementById("HaoRes").textContent=Math.round(totalDrain);
    
    switch(hakiLevel)
        {
            case "HC1":HakiMult=0.0075;ryouMult=0;willReq=250;break;
            case "HC2":HakiMult=0.0125;ryouMult=0;willReq=300;break;
            case "HC3":HakiMult=0.0175;ryouMult=0;willReq=350;break;
            case "HCS":HakiMult=0.0225;ryouMult=0;willReq=400;break;
            case "HR1":HakiMult=0.0050;ryouMult=.035;willReq=300;break;
            case "HR2":HakiMult=0.0075;ryouMult=.055;willReq=350;break;
            case "HRS":HakiMult=0.0100;ryouMult=.075;willReq=400;break;
            default:HakiMult=0;willReq=0;ryouMult=0;break;
        }
    hakiAtt=(willReq+basewill)*HakiMult/100;
    breakAmt=(willReq+basewill)*ryouMult/100;

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
            powerAtt=0.20;
        }
    attSrc=[powerAtt,hakiAtt].sort(function(a,b){return a-b});
    attSrc.reverse();
    console.log(attSrc);
    attackMult=attSrc[0]+attSrc[1]*.5+MeitoAtt+baseAtt;
    console.log(attackMult);
    //attackMult=attSrc[0]+attSrc[1]+attSrc[2]+MeitoAtt;
    if((DFCheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.9;
        }
    if((UACheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.95;
        }
    
    attackPower=(strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)*attackMult;
    for(i=0;i<stats.length;i++)
        {
            if(stats[i]<=lowest)
                {
                    lowest=stats[i];
                }
        }
    thr=[lowest*5,basestr*2,thr].sort(function(a,b){return a-b})[0];
    if(attackPower>thr)
        {
            attackPower=(attackPower-thr)*overflow+thr;
        }
    attackPower=diminish2(attackPower);
    /*
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
            
        }*/
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
    var FullCheck=document.getElementById("defFullCheck").checked;
    var totMit,defPower,maxArmor,armorSources,spdRed,armPerk,arm2Perk,fullPart=1;
    var statDef,HakiMult,TekkaiMult,HakiMin,TekkaiMin,HakiBoost,TekkaiBoost,willReq,stamReq;
    var stamFactor=.175,willFactor=0.075;
    var overflow=.25,sloverflow=.10;
    var stamRed=basestam*.001, totSpdRed;
    
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
            case "TK1":TekkaiMult=0.275;stamReq=70;break;
            case "TK2":TekkaiMult=0.350;stamReq=135;break;
            case "TK3":TekkaiMult=0.425;stamReq=200;break;
            case "TKS":TekkaiMult=0.500;stamReq=265;break;
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
    
    HakiBoost=(willReq+basewill)*HakiMult;
    TekkaiBoost=(stamReq+basestam)*TekkaiMult;
    
    if(!FullCheck)
       fullPart=.7;
    /*switch(armorPerk)
        {
            case "AP1":maxArmor=100;armPerk=.2;arm2Perk=.8;break;
            case "AP2":maxArmor=200;armPerk=.175;arm2Perk=.825;break;
            case "AP3":maxArmor=300;armPerk=.15;arm2Perk=.85;break;
            case "AP4":maxArmor=400;armPerk=.125;arm2Perk=.875;break;
            case "AP5":maxArmor=500;armPerk=.1;arm2Perk=.9;break;
            default:maxArmor=15;armPerk=.3;arm2Perk=.7;break;
        }
    if(armor>maxArmor)
        {
            spdRed=(maxArmor*armPerk+(armor-maxArmor)*.3)*fullPart;        
        }
    else
        {
            spdRed=armor*armPerk*fullPart;
        }
    if(armor>maxArmor)
        {
            armor=maxArmor*arm2Perk+(armor-maxArmor)*.7;
        }
    else
        {
            armor=armor*arm2Perk;
        }
    armor=diminish2(armor);*/
    switch(armorPerk)
        {
            case "AP1":maxArmor=100;armPerk=.4;arm2Perk=.8;break;
            case "AP2":maxArmor=200;armPerk=.425;arm2Perk=.825;break;
            case "AP3":maxArmor=300;armPerk=.45;arm2Perk=.85;break;
            case "AP4":maxArmor=400;armPerk=.475;arm2Perk=.875;break;
            case "AP5":maxArmor=500;armPerk=.5;arm2Perk=.9;break;
            default:maxArmor=15;armPerk=.3;arm2Perk=.7;break;
        }
    totSpdRed=armPerk+stamRed;
    if(totSpdRed>1)
        {
            totSpdRed=1;
        }
    if(armor>maxArmor)
        {
            spdRed=(maxArmor*(1-(totSpdRed))+(armor-maxArmor)*(1-(.3+stamRed)))*.15;        
        }
    else
        {
            spdRed=armor*(1-(totSpdRed))*.15;
        }
    if(spdRed<armor*.01)
        {
            spdRed=armor*.01;
        }
    if(spdRed>90)
        {
            spdRed=90;
        }
    if(armor>maxArmor)
        {
            armor=maxArmor*arm2Perk+(armor-maxArmor)*.7;
        }
    else
        {
            armor=armor*arm2Perk;
        }
    spdRed*=fullPart;
    armor=diminish2(armor);
    
    //console.log(spdRed);
    armorSources=[HakiBoost,TekkaiBoost,armor].sort(function(a,b){return a-b});
    armorSources.reverse();
    //console.log(armorSources);
    defPower=armorSources[0]+armorSources[1]*.5+armorSources[2]*.5+statDef;
    switch(attackLevel)
        {           
            case "RG1":defPower*=.95;break;
            case "RG2":defPower*=.90;break;
            case "RG3":defPower*=.85;break;
            case "RGS":defPower*=.80;break;
            default:break;
                
        }
    defPower=diminish2(defPower*(1-breakAmt));
    totMit=mitigate(attPow,defPower);
    /*switch(atthakiLevel)
        {
            case "HR1":totMit*=.80;break;
            case "HR2":totMit*=.60;break;
            case "HRS":totMit*=.40;break;
            default:break;
        }*/

    document.getElementById("totMit").textContent=Math.round((totMit/attPow)*100)+"%";
    document.getElementById("IntMit").textContent=Math.round(defPower);
    document.getElementById("SpdPen").textContent=Math.round(spdRed)+"%";
    
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
function diminish0(basestat)
{
    var res=0,multiplier=1,increment=10,decreases=.005,decreasem=.99,decreaseincr=5;
    while(basestat>=increment&&multiplier>0.25)
        {
            res+=increment*multiplier;
            basestat-=increment;    
            multiplier*=decreasem;
            decreasem*=0.95;
            if(increment>10)
                {
                    increment-=decreaseincr;
                }
        }
    res+=basestat*multiplier;
    return res;
}
function diminish(basestat)
{
    var res=0,multiplier=1,increment=100,decreases=.005,decreasem=.99,decreaseincr=5;
    while(basestat>=increment&&multiplier>0.25)
        {
            res+=increment*multiplier;
            basestat-=increment;    
            multiplier*=decreasem;
            decreasem*=0.95;
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
    var res=0,multiplier=1,increment=50,decreases=.005,decreasem=.95,decreaseincr=5;
    while(basestat>=increment&&multiplier>0.25)
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