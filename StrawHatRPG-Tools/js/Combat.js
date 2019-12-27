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
    var soruLevel=document.getElementById("soruLevel").value;
    var boostedSpeed=document.getElementById("boostedSpeed");
    var SpecBoost=document.getElementById("attspecBoost").valueAsNumber;
    var HakiSpecBoost=document.getElementById("atthakispecBoost").valueAsNumber;
    var meitoGrade=document.getElementById("attbladeGrade").value;
    var PowCheck=document.getElementById("attPowCheck").checked;
    var DFCheck=document.getElementById("attDFCheck").checked;
    var UACheck=document.getElementById("attUACheck").checked;
    var NACheck=document.getElementById("attNACheck").checked;
    var attackPower,attackMult,i,lowest=9999;
    var sspec=5,SoruBoost,SoruMult,spdReq;
    var stats=[basestr,basespd,basedex,basewill];
    var strFactor=.35;
    var spdFactor=.15;
    var dexFactor=.35;
    var willFactor=.15;
    var overflow=.25;
    for(i=0;i<errors.length;i++)
    {
        errors[i].style.visibility="hidden";  //Hide Errors by Default
    }
    if(attackLevel.charAt(2)!="S"&&attackLevel!="RK5")
        {
            document.getElementById("attspecBoost").valueAsNumber=0;
            document.getElementById("attspecBoost").disabled=true;
        }
    else
        {   
            document.getElementById("attspecBoost").disabled=false;
        }
    switch(attackLevel)
        {
            case "NS9":attackMult=1.00;break;
            case "IW1":attackMult=.45;break;
            case "IW2":attackMult=.56;break;
            case "IW3":attackMult=.67;break;
            case "IW4":attackMult=.78;break;
            case "IW5":attackMult=.90;break;
            case "FS1":attackMult=.55;break;
            case "FS2":attackMult=.65;break;
            case "FS3":attackMult=.75;break;
            case "FS4":attackMult=.85;break;
            case "FS5":attackMult=.95;break;
            case "FSS":attackMult=0.95+SpecBoost/100;break;
            case "SH2":attackMult=1.05;break;
            case "SH3":attackMult=1.10;break;
            case "SH5":attackMult=1.20;break;
            case "SHS":attackMult=1.20+SpecBoost/100;break;
            case "RK1":attackMult=.50;break;
            case "RK2":attackMult=.60;break;
            case "RK4":attackMult=.70;break;
            case "RK5":attackMult=.70+SpecBoost/100;break;
            case "RG7":attackMult=1.1;break;
            case "RG8":attackMult=1.3;break;
            case "RG9":attackMult=1.5;break;
            case "RGS":attackMult=1.5+SpecBoost/100;break;
                
            default:attackMult=0;break;
        }
    if(hakiLevel!="HCS")
        {
            document.getElementById("atthakispecBoost").valueAsNumber=0;
            document.getElementById("atthakispecBoost").disabled=true;
        }
    else
        {   
            document.getElementById("atthakispecBoost").disabled=false;
        }
    switch(hakiLevel)
        {
            case "HC1":attackMult+=0.05;break;
            case "HC2":attackMult+=0.10;break;
            case "HC3":attackMult+=0.20;break;
            case "HR1":attackMult+=0.025;break;
            case "HR2":attackMult+=0.05;break;
            case "HCS":attackMult+=HakiSpecBoost/100;break;
            default:break;
        }
    if(attackLevel.charAt(1)=="S")
        {
            document.getElementById("attbladeGrade").disabled=false;
        }
    else
        {
            document.getElementById("attbladeGrade").disabled=true;
            document.getElementById("attbladeGrade").value="NON"
        }
    switch(meitoGrade)
        {
            case "WAZ":attackMult+=0.05;break;
            case "RYO":attackMult+=0.10;break;
            case "OWA":attackMult+=0.15;break;
            case "SOW":attackMult+=0.25;break;
            default:break;
        }
    if(PowCheck)
        {
            attackMult+=0.10;
        }
    if((DFCheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.9;
        }
    if((UACheck)&&(attackLevel.includes("FS")))
        {
            attackMult*=0.95;
        }
    switch(soruLevel)
        {
            case "SO1":SoruMult=0.30;spdReq=70;break;
            case "SO2":SoruMult=0.35;spdReq=140;break;
            case "SO3":SoruMult=0.40;spdReq=210;break;
            case "SOS":SoruMult=0.40+sspec/100;spdReq=250;break;    
            default:SoruMult=0;spdReq=0;break;
        }
    SoruBoost=(spdReq*2.5+(basespd-spdReq))*SoruMult;
    //basespd+=SoruBoost;
    boostedSpeed.value=Math.round(basespd+SoruBoost);
    attackPower=diminish2((strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)*attackMult);
    for(i=0;i<stats.length;i++)
        {
            if(stats[i]<=lowest)
                {
                    lowest=stats[i];
                }
        }
    if((attackPower>thr1)&&(attackLevel.charAt(2)==1))
       {
            attackPower=(attackPower-thr1)*overflow+thr1;
       }
    if((attackPower>thr2)&&(attackLevel.charAt(2)<=2))
       {
            attackPower=(attackPower-thr2)*overflow+thr2;
       }
    if((attackPower>thr3)&&(attackLevel.charAt(2)<=3))
       {
            attackPower=(attackPower-thr3)*overflow+thr3;
       }
    if((attackPower>thr4)&&(attackLevel.charAt(2)<=4))
       {
            attackPower=(attackPower-thr4)*overflow+thr4;
       }
    if((attackPower>thr5)&&(attackLevel.charAt(2)<=5))
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
    var tspec=document.getElementById("defTekkaiSpecBoost").valueAsNumber;
    var hspec=document.getElementById("defHakiSpecBoost").valueAsNumber;
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
    
    if(tekkai!="TKS")
        {
            document.getElementById("defTekkaiSpecBoost").valueAsNumber=0;
            document.getElementById("defTekkaiSpecBoost").disabled=true;
        }
    else
        {   
            document.getElementById("defTekkaiSpecBoost").disabled=false;
        }
    if(haki!="HCS")
        {
            document.getElementById("defHakiSpecBoost").valueAsNumber=0;
            document.getElementById("defHakiSpecBoost").disabled=true;
        }
        else
        {   
            document.getElementById("defHakiSpecBoost").disabled=false;
        }
    switch(tekkai)
        {
            case "TK1":TekkaiMult=0.225;stamReq=70;break;
            case "TK2":TekkaiMult=0.325;stamReq=140;break;
            case "TK3":TekkaiMult=0.425;stamReq=210;break;
            case "TKS":TekkaiMult=0.425+tspec/100;stamReq=250;break;
            default:TekkaiMult=0;stamReq=0;break;
        }
    switch(haki)
        {
            case "HC1":HakiMult=0.275;willReq=250;break;
            case "HC2":HakiMult=0.350;willReq=300;break;
            case "HC3":HakiMult=0.425;willReq=350;break;
            case "HCS":HakiMult=0.425+hspec/100;willReq=375;break;    
            default:HakiMult=0;willReq=0;break;
        }
    //TekkaiMin=TekkaiMult*600;
    //HakiMin=HakiMult*600;
    
    HakiBoost=(willReq*2.5+(basewill-willReq))*HakiMult;
    TekkaiBoost=(stamReq*2.5+(basestam-stamReq))*TekkaiMult;
    
    
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
            //armor=(armor-maxArmor)*overflow+maxArmor;
            armor=(armor-maxArmor)*overflow+maxArmor;
        }
    armorSources=[statDef,HakiBoost,TekkaiBoost,armor].sort();
    armorSources.reverse();
    console.log(armorSources);
    defPower=diminish(armorSources[0]+armorSources[1]*.85+armorSources[2]*.70+armorSources[3]*.55);
    
    /*if((defPower<TekkaiMin)||(defPower<HakiMin))
        {
            if(TekkaiMin<HakiMin)
                {
                    defPower=HakiMin;
                }
            else
            {
                defPower=TekkaiMin;
            }
        }*/
    
    totMit=mitigate(attPow,diminish(defPower));
    switch(atthakiLevel)
        {
            case "HR1":totMit*=.75;break;
            case "HR2":totMit*=.50;break;
            default:break;
        }
    switch(attackLevel)
        {           
            case "RG7":totMit*=.95;break;
            case "RG8":totMit*=.90;break;
            case "RG9":totMit*=.80;break;
            default:break;
                
        }

    document.getElementById("totMit").textContent=Math.round((totMit/attPow)*100)+"%";
    document.getElementById("IntMit").textContent=Math.round(diminish(defPower));
}

function mitigate(power,hardness)
{
    var mitRate=0,mitAmt,maxblock,minblock;
    
    //hardness=diminish(hardness);
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
function soruCode(level)
{
    var basespd=document.getElementById("attspdIPF").valueAsNumber;
    var sspec=5;
    var SoruBoost;
    switch(level)
        {
            case "SO1":SoruMult=0.30;spdReq=70;break;
            case "SO2":SoruMult=0.35;spdReq=140;break;
            case "SO3":SoruMult=0.40;spdReq=210;break;
            case "SOS":SoruMult=0.40+sspec/100;spdReq=250;break;    
            default:SoruMult=0;spdReq=0;break;
        }
    SoruBoost=(spdReq*2.5+(basespd-spdReq))*SoruMult;
    return SoruBoost;
}
function myFunc(stat1,stat2,stat3,req1,req2,req3,m1,m2,m3,f1,f2,f3)
{
    var s,s1,s2,s3;
    s1=(req1*f1+(stat1-req1))*m1;
    s2=(req2*f2+(stat2-req2))*m2;
    s3=(req3*f3+(stat3-req3))*m3;
    s=s1+s2+s3;
    return s;
}
/*
            */