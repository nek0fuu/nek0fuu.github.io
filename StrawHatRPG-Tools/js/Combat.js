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
    var FMind=document.getElementById("defFMindCheck").checked;
    var attackPower,attackMult,i,lowest=9999;
    var SoruBoost,SoruMult,spdReq;
    var baseAtt=0,hakiAtt=0,powerAtt=0,MeitoAtt=0,attSrc;
    var stats=[basestr,basespd,basedex,basewill];
    var strFactor=.35;
    var spdFactor=.125;
    var dexFactor=.35;
    var willFactor=.175;
    var overflow=.25,sloverflow=.10;
    var thr=875,soruThr,HakiThr,Haki2Thr,restype;
    var HaoMult,totalDrain,focHao=1,maxDrain,minDrain,willReq,maxPerc,HakiMult,ryouMult,extraWill,HaoRes=0;
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
            case "IW1":baseAtt=.250;thr=125;restype="Att";break;
            case "IW2":baseAtt=.425;thr=250;restype="Att";break;
            case "IW3":baseAtt=.600;thr=375;restype="Att";break;
            case "IW4":baseAtt=.775;thr=500;restype="Att";break;
            case "IW5":baseAtt=.950;thr=625;restype="Att";break;
            case "FS1":baseAtt=.35;thr=125;restype="AttMeitoFS";break;
            case "FS2":baseAtt=.50;thr=250;restype="AttMeitoFS";break;
            case "FS3":baseAtt=.65;thr=375;restype="AttMeitoFS";break;
            case "FS4":baseAtt=.80;thr=500;restype="AttMeitoFS";break;
            case "FS5":baseAtt=.95;thr=625;restype="AttMeitoFS";break;
            case "FSS":baseAtt=.95;restype="AttMeitoFS";break;
            case "FSP":baseAtt=1.10;restype="AttMeitoFS";break;
            case "SO1":baseAtt=1.00;SoruMult=0.25;spdReq=70;soruThr=100;restype="Soru";break;
            case "SO2":baseAtt=1.00;SoruMult=0.30;spdReq=135;soruThr=200;restype="Soru";break;
            case "SO3":baseAtt=1.00;SoruMult=0.35;spdReq=200;soruThr=300;restype="Soru";break;
            case "SOS":baseAtt=1.00;SoruMult=0.40;spdReq=265;soruThr=400;restype="Soru";break;
            case "SH1":baseAtt=1.05;restype="Att";break;
            case "SH2":baseAtt=1.10;restype="Att";break;
            case "SH3":baseAtt=1.15;restype="Att";break;
            case "SHP":baseAtt=1.20;restype="Att";break;
            case "RK1":baseAtt=.35;thr=205;restype="Att";break;
            case "RK2":baseAtt=.55;thr=410;restype="Att";break;
            case "RK3":baseAtt=.75;thr=615;restype="Att";break;
            case "RKS":baseAtt=.75;restype="Att";break;    
            case "RKP":baseAtt=.95;restype="Att";break;
            case "RG1":baseAtt=1.15;restype="Att";break;
            case "RG2":baseAtt=1.3;restype="Att";break;
            case "RG3":baseAtt=1.45;restype="Att";break;
            case "RGP":baseAtt=1.6;restype="Att";break;
            case "HAL":minDrain=0;maxDrain=20;HaoMult=.4;willReq=200;restype="Hao";break;
            case "HAM":minDrain=5;maxDrain=30;HaoMult=.6;willReq=250;restype="Hao";break;
            case "HAH":minDrain=10;maxDrain=40;HaoMult=.8;willReq=300;restype="Hao";break;
            case "HAI":minDrain=15;maxDrain=50;HaoMult=1;willReq=350;restype="Hao";break;
            case "HAS":minDrain=20;maxDrain=60;HaoMult=1.2;willReq=400;restype="Hao";break;
                
            default:baseAtt=0;break;
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
            document.getElementById("hideThisHao2").style.display="";
            document.getElementById("hideThisHaoCheck").style.display="";
        }
    else
        {
            document.getElementById("hideThisHao").style.display="none";  
            document.getElementById("hideThisHao2").style.display="none";
            document.getElementById("hideThisHaoCheck").style.display="none";
        }
    if(restype.includes("Meito"))
        {
            document.getElementById("hideThisBladeGrade").style.display="";
            document.getElementById("attbladeGrade").disabled=false;
        }
    else
        {
            document.getElementById("attbladeGrade").value="NON";
            document.getElementById("hideThisBladeGrade").style.display="none";
            document.getElementById("attbladeGrade").disabled=true;
            meitoGrade=document.getElementById("attbladeGrade").value;
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
    if(SoruBoost>soruThr)
        {
            SoruBoost=(SoruBoost-soruThr)*overflow+soruThr;
        }
    document.getElementById("SoruSpd").textContent=Math.round(basespd+SoruBoost);
    
    if(!focCheck)
       focHao=.6;
    /*
    baseDrain=(basewill+willReq)*HaoMult;
    maxDrain=(basewill+willReq)*HaoMult*2;
    scaleDrain=(basewill-oppwill)*.2;
    totalDrain=baseDrain+scaleDrain;*/
    extraWill=(basewill+willReq)*HaoMult*.025;
    totalDrain=(basewill+extraWill-oppwill)*HaoMult;
    //willCost=willCost+basewill*HaoMult*.1;
    
    if(FMind)
        {
            HaoRes=(300+oppwill)*.05/100;  //300=willReq
        }
    if(HaoRes>.40)
        {
            HaoRes=(HaoRes-.40)*overflow+.40 //.30=thr
        }
    //totalDrain=diminish0(scaleDrain+baseDrain);
    //totalDrain=scaleDrain+baseDrain;
    if(totalDrain>maxDrain)
        {
            //totalDrain=(totalDrain-maxDrain)*sloverflow+maxDrain;
            totalDrain=maxDrain;
        }
        
        
    if(totalDrain<minDrain)
        {
            totalDrain=minDrain;
        }
    totalDrain=totalDrain*focHao*(1-HaoRes);
    document.getElementById("HaoRes").textContent=Math.round(totalDrain);
    //document.getElementById("HaoRes2").textContent=Math.round(willCost);
    
    switch(hakiLevel)
        {
            case "HC1":HakiMult=0.0075;ryouMult=0;willReq=250;HakiThr=0.05;Haki2Thr=0;break;
            case "HC2":HakiMult=0.0125;ryouMult=0;willReq=300;HakiThr=0.10;Haki2Thr=0;break;
            case "HC3":HakiMult=0.0175;ryouMult=0;willReq=350;HakiThr=0.15;Haki2Thr=0;break;
            case "HCS":HakiMult=0.0225;ryouMult=0;willReq=400;HakiThr=0.2;Haki2Thr=0;break;
            case "HR1":HakiMult=0.0050;ryouMult=.035;willReq=300;HakiThr=0.03;Haki2Thr=.25;break;
            case "HR2":HakiMult=0.0075;ryouMult=.055;willReq=350;HakiThr=0.06;Haki2Thr=.50;break;
            case "HRS":HakiMult=0.0100;ryouMult=.075;willReq=400;HakiThr=0.09;Haki2Thr=.75;break;
            default:HakiMult=0;willReq=0;ryouMult=0;break;
        }
    hakiAtt=(willReq+basewill)*HakiMult/100;
    if(hakiAtt>HakiThr)
        {
            hakiAtt=(hakiAtt-HakiThr)*overflow+HakiThr
        }
    breakAmt=(willReq+basewill)*ryouMult/100;
    if(breakAmt>Haki2Thr)
        {
            breakAmt=(breakAmt-Haki2Thr)*overflow+Haki2Thr;
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
            powerAtt=0.20;
        }
    attSrc=[powerAtt,hakiAtt].sort(function(a,b){return a-b});
    attSrc.reverse();
    attackMult=attSrc[0]+attSrc[1]*.5+MeitoAtt+baseAtt;
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
    thr=[lowest*5,basestr*2.5,thr].sort(function(a,b){return a-b})[0];
    if(attackPower>thr)
        {
            attackPower=(attackPower-thr)*overflow+thr;
        }
    //attackPower=diminish2(attackPower);
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
    var FullCheck=document.getElementById("defFullCheck").value;
    var totMit,defPower,maxArmor,armorSources,spdRed,armPerk,arm2Perk,fullPart=1;
    var statDef,HakiMult,TekkaiMult,HakiMin,TekkaiMin,HakiBoost,TekkaiBoost,willReq,stamReq;
    var stamFactor=.175,willFactor=0.075;
    var overflow=.25,sloverflow=.10,thr=875,Tekkaithr,Hakithr;
    var statRed=basestam*.00025+basewill*.00015, totSpdRed;
    var thrStat=0;
    
    statDef=basestam*stamFactor+basewill*willFactor;
    thrStat=[basestam/2,basewill].sort(function(a,b){return a-b})[0]
    if(statDef>thrStat)
        {
            statDef=(statDef-thrStat)*overflow+thrStat;
        }
    switch(tekkai)
        {
            case "TK1":TekkaiMult=0.225;stamReq=70;Tekkaithr=125;break;
            case "TK2":TekkaiMult=0.325;stamReq=135;Tekkaithr=250;break;
            case "TK3":TekkaiMult=0.425;stamReq=200;Tekkaithr=375;break;
            case "TKS":TekkaiMult=0.525;stamReq=265;Tekkaithr=500;break;
            default:TekkaiMult=0;stamReq=0;Tekkaithr=0;break;
        }
    switch(haki)
        {
            case "HC1":HakiMult=0.25;willReq=250;Hakithr=155;break;
            case "HC2":HakiMult=0.35;willReq=300;Hakithr=310;break;
            case "HC3":HakiMult=0.45;willReq=350;Hakithr=465;break;
            case "HCS":HakiMult=0.55;willReq=400;Hakithr-620;break;    
            default:HakiMult=0;willReq=0;break;
        }
    //TekkaiMin=TekkaiMult*600;
    //HakiMin=HakiMult*600;
    
    HakiBoost=(willReq+basewill)*HakiMult;
    if(HakiBoost>Hakithr)
        {
            HakiBoost=(HakiBoost-Hakithr)*overflow+Hakithr
        }
    TekkaiBoost=(stamReq+basestam)*TekkaiMult;
    if(TekkaiBoost>Tekkaithr)
        {
            TekkaiBoost=(TekkaiBoost-Tekkaithr)*overflow+Tekkaithr;
        }
    
    switch(FullCheck)
        {
            case 'H1':fullPart=.15;break;
            case 'H2':fullPart=.30;break;
            case 'H3':fullPart=.50;break;
            case 'H4':fullPart=.70;break;
            case 'H5':fullPart=1;break;
        }
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
    armorcopy=armor;
    switch(armorPerk)
        {
            case "AP1":maxArmor=100;armPerk=.3;arm2Perk=.7;break;
            case "AP2":maxArmor=200;armPerk=.35;arm2Perk=.75;break;
            case "AP3":maxArmor=300;armPerk=.4;arm2Perk=.8;break;
            case "AP4":maxArmor=400;armPerk=.45;arm2Perk=.85;break;
            case "AP5":maxArmor=500;armPerk=.5;arm2Perk=.9;break;
            default:maxArmor=15;armPerk=.1;arm2Perk=.5;break;
        }
    totSpdRed=armPerk+statRed;
    if(totSpdRed>1)
        {
            totSpdRed=1;
        }
    if(armor>maxArmor)
        {
            spdRed=((maxArmor*(1-totSpdRed))+(armor-maxArmor)*(1-(.1+statRed))) ;        
        }
    else
        {
            spdRed=(armor*(1-totSpdRed));
        }
    if(spdRed<armor*.25)
        {
            spdRed=armor*.25;
        }
    spdRed=Try2(spdRed)
    /*
    if(spdRed>99)
        {
            spdRed=99;
        }
    */
    /*if(armor>maxArmor)
        {
            armor=maxArmor*arm2Perk+(armor-maxArmor)*.5;
        }
    else
        {
            armor=armor*arm2Perk;
            
        }*/
    spdRed*=fullPart;
    //armor=diminish2(armor);
    
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
    if(defPower>thr)
        {
            defPower=(defPower-thr)*overflow+thr;
        }
    //defPower=diminish2(defPower*(1-breakAmt));
    defPower=(defPower*(1-breakAmt));
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
    document.getElementById("SpdPen").textContent=Math.round(spdRed);
    
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
function Try(base)
{       
    var res=0
    while(base>0)
        {
            base--;
            res=res+(1*(.1+base/500*1.8));
        }
    return res;
}
function Try2(base)
{
        return base*base/500;
}
/*
            */