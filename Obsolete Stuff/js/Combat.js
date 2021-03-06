var ipfields=document.getElementsByClassName("IP");
var errors=document.getElementsByClassName("error-msg");

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

function calculateAttack()
{
    var basestm=document.getElementById("attstmIPF").valueAsNumber;
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
    //var curseCheck=document.getElementById("attCurseCheck").checked;
    var DFCheck=document.getElementById("attDFCheck").checked;
    var UACheck=document.getElementById("attUACheck").checked;
    var NACheck=document.getElementById("attNACheck").checked;
    var focCheck=document.getElementById("attHaoFoc").checked;
    //var FMind=document.getElementById("defFMindCheck").checked;
    var attackPower,attackMult,i,lowest=9999;
    var SoruBoost,SoruMult,spdReq,SoruFlat;
    var totalStats=basestm+basestr+basespd+basedex+basewill;
    var baseAtt=0,hakiAtt=0,HakiFlat=0,powerAtt=0,powerFlat=0,MeitoAtt=0,MeitoFlat=0,curseAtt=0,curseFlat,attBoost,flatBoost;
    var stats=[basestr,basespd,basedex,basewill];
    var baseFactor=.01
    var strFactor=.325;
    var spdFactor=.1;
    var dexFactor=.280;
    var willFactor=.145;
    var overflow=.25,sloverflow=.10,maxAttMult=60,maxFlatBoost=60;
    var thr=700,soruThr,HakiThr,Haki2Thr,restype;
    var HaoMult,totalDrain,focHao=1,maxDrain,minDrain,willReq,maxPerc,HakiMult,ryouMult,extraWill,HaoRes=0;
    for(i=0;i<errors.length;i++)
    {
        errors[i].style.visibility="hidden";  //Hide Errors by Default
    }
    switch(attackLevel)
        {
            case "NS":baseAtt=1.00;restype="AttMeitoFS";break;
            case "IW1":baseAtt=.30;thr=100;restype="AttMeitoFS";break;
            case "IW2":baseAtt=.45;thr=180;restype="AttMeitoFS";break;
            case "IW3":baseAtt=.60;thr=260;restype="AttMeitoFS";break;
            case "IW4":baseAtt=.75;thr=340;restype="AttMeitoFS";break;
            case "IW5":baseAtt=.90;thr=420;restype="AttMeitoFS";break;
            case "FS1":baseAtt=.35;thr=100;restype="AttMeitoFS";break;
            case "FS2":baseAtt=.50;thr=200;restype="AttMeitoFS";break;
            case "FS3":baseAtt=.65;thr=300;restype="AttMeitoFS";break;
            case "FS4":baseAtt=.80;thr=400;restype="AttMeitoFS";break;
            case "FS5":baseAtt=.95;thr=500;restype="AttMeitoFS";break;
            case "FSS":baseAtt=.95;restype="AttMeitoFS";break;
            case "FSP":baseAtt=1.10;restype="AttMeitoFS";break;
            case "SO1":baseAtt=1.00;SoruFlat=10;SoruMult=0.20;spdReq=70;soruThr=100;restype="Soru";break;
            case "SO2":baseAtt=1.00;SoruFlat=20;SoruMult=0.25;spdReq=135;soruThr=200;restype="Soru";break;
            case "SO3":baseAtt=1.00;SoruFlat=30;SoruMult=0.30;spdReq=200;soruThr=300;restype="Soru";break;
            case "SOS":baseAtt=1.00;SoruFlat=30;SoruMult=0.30;spdReq=200;soruThr=400;restype="Soru";break;
            case "SOP":baseAtt=1.00;SoruFlat=40;SoruMult=0.35;spdReq=265;soruThr=400;restype="Soru";break;
            case "SH1":baseAtt=1.05;restype="Att";break;
            case "SH2":baseAtt=1.10;restype="Att";break;
            case "SH3":baseAtt=1.15;restype="Att";break;
            case "SHS":baseAtt=1.15;restype="Att";break;
            case "SHP":baseAtt=1.20;restype="Att";break;
            case "RK1":baseAtt=.35;thr=150;restype="Att";break;
            case "RK2":baseAtt=.55;thr=300;restype="Att";break;
            case "RK3":baseAtt=.75;thr=450;restype="Att";break;
            case "RKS":baseAtt=.75;restype="Att";break;    
            case "RKP":baseAtt=.95;restype="Att";break;
            case "RG1":baseAtt=1.15;restype="Att";break;
            case "RG2":baseAtt=1.25;restype="Att";break;
            case "RG3":baseAtt=1.35;restype="Att";break;
            case "RGS":baseAtt=1.35;restype="Att";break;
            case "RGP":baseAtt=1.45;restype="Att";break;
            case "HAL":minDrain=0;maxDrain=15;HaoMult=.4;willReq=200;restype="Hao";break;
            case "HAM":minDrain=5;maxDrain=23;HaoMult=.6;willReq=250;restype="Hao";break;
            case "HAH":minDrain=10;maxDrain=30;HaoMult=.8;willReq=300;restype="Hao";break;
            case "HAI":minDrain=15;maxDrain=38;HaoMult=1;willReq=350;restype="Hao";break;
            case "HAS":minDrain=15;maxDrain=45;HaoMult=1;willReq=350;restype="Hao";break;
            case "HAP":minDrain=20;maxDrain=45;HaoMult=1.2;willReq=400;restype="Hao";break;
                
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
            document.getElementById("InnDef").style.display=""
            document.getElementById("ArmDef").style.display=""
        }
    else
        {
            document.getElementById("hideThisAttackRes").style.display="none"; 
            document.getElementById("hideThisPowCheck").style.display="none";
            document.getElementById("hideThisHaki").style.display="none";
            document.getElementById ("InnDef").style.display="none";
            document.getElementById("ArmDef").style.display="none";
        }
    if(restype.includes("Hao"))
        {
            document.getElementById("hideThisHao").style.display="";
            //document.getElementById("hideThisHao2").style.display="";
            document.getElementById("hideThisHaoCheck").style.display="";
        }
    else
        {
            document.getElementById("hideThisHao").style.display="none";  
            //document.getElementById("hideThisHao2").style.display="none";
            document.getElementById("hideThisHaoCheck").style.display="none";
        }
    if(restype.includes("Meito"))
        {
            document.getElementById("hideThisBladeGrade").style.display="";
            document.getElementById("attbladeGrade").disabled=false;
            //document.getElementById("hideThisCurseCheck").style.display="";

        }
    else
        {
            document.getElementById("attbladeGrade").value="NON";
            document.getElementById("hideThisBladeGrade").style.display="none";
            document.getElementById("attbladeGrade").disabled=true;
            //document.getElementById("hideThisCurseCheck").style.display="none";
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
    SoruBoost=(spdReq+basespd)*SoruMult+SoruFlat;
    if(SoruBoost>soruThr)
        {
            SoruBoost=(SoruBoost-soruThr)*overflow+soruThr;
        }
    document.getElementById("SoruSpd").textContent=Math.round(basespd+SoruBoost);
    
    if(!focCheck)
       focHao=.55;
    extraWill=(basewill+willReq)*HaoMult*.025;
    totalDrain=(basewill+extraWill-oppwill)*HaoMult;
    /*
    if(FMind)
        {
            HaoRes=(300+oppwill)*.05/100;  //300=willReq
        }
        */
    if(HaoRes>.40)
        {
            HaoRes=(HaoRes-.40)*overflow+.40 //.30=thr
        }
    if(totalDrain>maxDrain)
        {
            totalDrain=maxDrain;
        }
        
        
    if(totalDrain<minDrain)
        {
            totalDrain=minDrain;
        }
    totalDrain=totalDrain*focHao*(1-HaoRes);
    document.getElementById("HaoRes").textContent=Math.round(totalDrain);
    
    switch(hakiLevel)
        {
            case "HC1":HakiFlat=5;HakiMult=0.0075;ryouMult=0;willReq=250;HakiThr=0.05;Haki2Thr=0;break;
            case "HC2":HakiFlat=10;HakiMult=0.0125;ryouMult=0;willReq=300;HakiThr=0.10;Haki2Thr=0;break;
            case "HC3":HakiFlat=15;HakiMult=0.0175;ryouMult=0;willReq=350;HakiThr=0.15;Haki2Thr=0;break;
            case "HCS":HakiFlat=20;HakiMult=0.0225;ryouMult=0;willReq=400;HakiThr=0.2;Haki2Thr=0;break;
            case "HR1":HakiFlat=3;HakiMult=0.0050;ryouMult=.020;willReq=300;HakiThr=0.03;Haki2Thr=.2;break;
            case "HR2":HakiFlat=6;HakiMult=0.0075;ryouMult=.040;willReq=350;HakiThr=0.06;Haki2Thr=.4;break;
            case "HRS":HakiFlat=9;HakiMult=0.0100;ryouMult=.060;willReq=400;HakiThr=0.09;Haki2Thr=.6;break;
            default:HakiMult=0;willReq=0;ryouMult=0;break;
        }
    hakiAtt=(willReq+basewill)*HakiMult/100;
    breakAmt=(willReq+basewill)*ryouMult/100;
    if(breakAmt>Haki2Thr)
        {
            breakAmt=(breakAmt-Haki2Thr)*overflow+Haki2Thr;
        }

    switch(meitoGrade)
        {
            case "WAZ":MeitoAtt=0.10;MeitoFlat=10;break;
            case "RYO":MeitoAtt=0.15;MeitoFlat=20;break;
            case "OWA":MeitoAtt=0.20;MeitoFlat=30;break;
            case "SOW":MeitoAtt=0.30;MeitoFlat=45;break;
            default:break;
        }
    if(PowCheck)
        {
            powerAtt=0.10;
            powerFlat=12.5;
        }
    /*
    if(curseCheck)
        {
            curseAtt=0.10;
            curseFlat=10;
        }
    */
    attackMult=MeitoAtt+curseAtt+powerAtt+hakiAtt
    if(attackMult>maxAttMult)
        {
            attackMult=(attackMult-maxAttMult)*overflow+maxAttMult;
        }
    if(DFCheck)         //&&(attackLevel.includes("FS")
        {
            MeitoFlat*=0.2;
        }
    if(UACheck)
        {
            MeitoFlat*=0.6;
        }
    flatBoost=powerFlat+HakiFlat+MeitoFlat;
    if(flatBoost>maxFlatBoost)
        {
            flatBoost=(flatBoost-maxFlatBoost)*overflow+maxFlatBoost;
        }
    attackPower=(strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill+totalStats*baseFactor+flatBoost)*baseAtt+attackMult/10*totalStats+10;
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
    document.getElementById("attPow").textContent=Math.round(attackPower);
    attPow=attackPower;
    
}
function calculateDefense()
{
    var basestam=document.getElementById("defstmIPF").valueAsNumber;
    var basewill=document.getElementById("defwillIPF").valueAsNumber;
    var tekkai=document.getElementById("deftekkaiLevel").value;
    var haki=document.getElementById("defHakiLevel").value;
    var armHaki=document.getElementById("defArmHakiLevel").value;
    var armor=document.getElementById("defarmIPF").valueAsNumber;
    var armorPerk=document.getElementById("defArmorPerkLevel").value;
    var atthakiLevel=document.getElementById("attHakiLevel").value;
    var attackLevel=document.getElementById("attattackLevel").value;
    var FullCheck=document.getElementById("defFullCheck").value;
    //var BSCheck=document.getElementById("defBMCheck").checked;
    var innDef,armDef=0,maxArmor,armSources,innSources,spdRed,armPerk,fullPart=1;
    var statDef,HakiMult,TekkaiMult,HakiMin,TekkaiMin,HakiBoost,TekkaiBoost,HakiFlat,TekkaiFlat,willReq,stamReq,ArmHakiBoost,armDmg;
    var stamFactor=.1,willFactor=0;
    var overflow=.25,sloverflow=.10,thr=700,Tekkaithr,Hakithr;
    var statRed=basestam*.00025+basewill*.00015, totSpdRed;
    var thrStat=0,dmgLvl="",dmgLvl2="";
    
    statDef=basestam*stamFactor+basewill*willFactor;
    thrStat=[basestam/2,basewill].sort(function(a,b){return a-b})[0]
    if(statDef>thrStat)
        {
            statDef=(statDef-thrStat)*overflow+thrStat;
        }
    switch(tekkai)
        {
            case "TK1":TekkaiFlat=10;TekkaiMult=0.10;stamReq=70;Tekkaithr=100;break;
            case "TK2":TekkaiFlat=20;TekkaiMult=0.35;stamReq=135;Tekkaithr=200;break;
            case "TK3":TekkaiFlat=30;TekkaiMult=0.40;stamReq=200;Tekkaithr=300;break;
            case "TKP":TekkaiFlat=40;TekkaiMult=0.45;stamReq=265;Tekkaithr=500;break;
            case "TKS":TekkaiFlat=30;TekkaiMult=0.35;stamReq=200;Tekkaithr=500;break;
            default:TekkaiFlat=0;TekkaiMult=0;stamReq=0;Tekkaithr=0;break;
        }
    TekkaiBoost=(stamReq+basestam)*TekkaiMult;
    if(TekkaiBoost>Tekkaithr)
        {
            TekkaiBoost=(TekkaiBoost-Tekkaithr)*overflow+Tekkaithr+TekkaiFlat;
        }
    switch(haki)
        {
            case "HC1":HakiFlat=20;HakiMult=0.300;willReq=250;Hakithr=150;break;
            case "HC2":HakiFlat=30;HakiMult=0.350;willReq=300;Hakithr=300;break;
            case "HC3":HakiFlat=40;HakiMult=0.400;willReq=350;Hakithr=450;break;
            case "HCP":HakiFlat=50;HakiMult=0.450;willReq=400;Hakithr=700;break;
            case "HCS":HakiFlat=40;HakiMult=0.400;willReq=350;Hakithr=700;break;
            default:HakiFlat=0;HakiMult=0;willReq=0;break;
        }
    HakiBoost=(willReq+basewill)*HakiMult+HakiFlat;
    if(HakiBoost>Hakithr)
        {
            HakiBoost=(HakiBoost-Hakithr)*overflow+Hakithr
        }
    switch(armHaki)
        {
            case "HC1":HakiFlat=20;HakiMult=0.300;willReq=250;Hakithr=150;break;
            case "HC2":HakiFlat=30;HakiMult=0.350;willReq=300;Hakithr=300;break;
            case "HC3":HakiFlat=40;HakiMult=0.400;willReq=350;Hakithr=450;break;
            case "HCP":HakiFlat=50;HakiMult=0.45;willReq=400;Hakithr=700;break;
            case "HCS":HakiFlat=40;HakiMult=0.400;willReq=350;Hakithr=700;break;
            default:HakiMult=0;willReq=0;break;
        }
    ArmHakiBoost=(willReq+basewill)*HakiMult+HakiFlat;
    if(ArmHakiBoost>Hakithr)
        {
            ArmHakiBoost=(ArmHakiBoost-Hakithr)*overflow+Hakithr
        }
    
    switch(FullCheck)
        {
            case 'H1':fullPart=.15;break;
            case 'H2':fullPart=.30;break;
            case 'H3':fullPart=.50;break;
            case 'H4':fullPart=.70;break;
            case 'H5':fullPart=1;break;
        }
    /*
    if(BSCheck)
        {
            fullPart*=.75;
        }
    */
    switch(armorPerk)
        {
            case "AP1":maxArmor=100;armPerk=.3;break;
            case "AP2":maxArmor=200;armPerk=.35;break;
            case "AP3":maxArmor=300;armPerk=.4;break;
            case "AP4":maxArmor=400;armPerk=.45;break;
            case "AP5":maxArmor=500;armPerk=.5;break;
            default:maxArmor=15;armPerk=.1;break;
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
    spdRed*=fullPart;
    
    
    
    innSources=[statDef,TekkaiBoost,HakiBoost].sort(function(a,b){return a-b});
    innSources.reverse();
    innDef=innSources[0]+innSources[1]*.5+innSources[2]*.5+15;
    
    if(armor>0)
        {
            armSources=[ArmHakiBoost,armor].sort(function(a,b){return a-b});
            armSources.reverse();
            armDef=armSources[0]+armSources[1]*.25;
        }
    switch(attackLevel)
        {           
            case "RG1":innDef*=.95;armDef*=.95;break;
            case "RG2":innDef*=.90;armDef*=.90;break;
            case "RG3":innDef*=.85;armDef*=.85;break;
            case "RGS":innDef*=.85;armDef*=.85;break;
            case "RGP":innDef*=.80;armDef*=.80;break;
            default:break;                
        }
    innDef=(innDef*(1-breakAmt));
    armDef=(armDef*(1-(breakAmt)));
    if(innDef>thr)
        {
            innDef=(innDef-thr)*overflow+thr;
        }
    document.getElementById("InnDef").textContent=Math.round(innDef);
    document.getElementById("ArmDef").textContent=Math.round(armDef);
    document.getElementById("SpdPen").textContent=Math.round(spdRed);
    innDef*=(1+innDef/700*.25);
    armDef*=(1+armDef/700*.25);
    if(attPow>armDef)
        {
            dmgLvl2="Major Damage"// <span style='color:red''>(Broken)</span>";
            attPow=(attPow-armDef)
        }
    else if(attPow>armDef*.8)
        {
            //armDmg=Math.round((attPow-armDef*.55)*.5)
            dmgLvl2="Moderate Damage"// <span style='color:yellow'>("+armDmg+")</span>";
            attPow=0;
        }
    else if(attPow>armDef*.6)
        {
            //armDmg=Math.round((attPow-armDef*.55)*.5)
            dmgLvl2="Minor Damage"// <span style='color:yellow'>("+armDmg+")</span>";
            attPow=0;
        }
    else if(attPow>armDef*.4)
        {
            //armDmg=Math.round((attPow-armDef*.55)*.5)
            dmgLvl2="Negligable Damage"// <span style='color:yellow'>("+armDmg+")</span>";
            attPow=0;
        }
    else
        {
            dmgLvl2="Literally Nothing"
            attPow=0;
        }
    if(attPow>innDef)
        {
            dmgLvl="Major Damage"
        }
    else if(attPow>innDef*.8)
        {
            dmgLvl="Moderate Damage";
        }
    else if(attPow>innDef*.6)
        {
            dmgLvl="Minor Damage";
        }
    else if(attPow>innDef*.4)
        {
            dmgLvl="Negligable Damage"
        }
    else
        {
            dmgLvl="Literally Nothing"
        }
    if(armDef>0)
        {
            document.getElementById("DmgLvl2").innerHTML=dmgLvl2;
        }
    document.getElementById("DmgLvl").innerHTML=dmgLvl;
    
}

function Try2(base)
{
        return base*base/700;
}
/*
            */