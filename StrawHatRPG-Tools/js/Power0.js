/*V3:
Changed Stat Weightage (.35,.15,.325,.175)
Updated material hardness scaling diamond upto 570
Updated overflow 50%
Increased str rate for waves and slashes
Reduced Meito Bonuses from 10/20/30/45 to 5/10/15/25
DF Reduction changed from -7.5%/-5% on multipliers to 10%/6.66%
In this version melee slashes are always stronger than any flying slash.
Threshold on normal attacks is 705
Diminishing returns from speed (anti-minmax)
Compatible with the 12/01/2019 Patch (Power Attack)
*/
window.onload=function(){
    mainCalcFunction();
}

function mainCalcFunction()
{
    var max=705;
    var dia2=570, dia2t=325, dia2t2=125;
    var dia1=475, dia1t=275, dia1t2=110;
    var tit2=380, tit2t=230, tit2t2=100;
    var tit1=315, tit1t=195, tit1t2=90;
    var ste2=250, ste2t=160, ste2t2=80;
    var ste1=205, ste1t=135, ste1t2=70;
    var iro2=160, iro2t=110, iro2t2=60;
    var iro1=130, iro1t=90, iro1t2=50;
    var bro2=100, bro2t=70, bro2t2=40;
    var bro1=80, bro1t=55, bro1t2=35;
    var sto2=60, sto2t=40, sto2t2=30;
    var sto1=45, sto1t=30, sto1t2=25;
    var bon2=30, bon2t=20, bon2t2=20;
    var bon1=20, bon1t=15, bon1t2=15;
    var woo2=10, woo2t=10, woo2t2=10;
    var woo1=5, woo1t=5, woo1t2=5;
    var overflow=.4;
    //var overflow=.2;
    var ipfields=document.getElementsByClassName("IP");
    for(var i=0;i<ipfields.length;i++)
        {
            ipfields[i].addEventListener("change",mainCalcFunction);
            ipfields[i].style.border="";
        }
    
    var errors=document.getElementsByClassName("error-msg");
    var basestr=document.getElementById("strIPF").valueAsNumber;
    var basespd=document.getElementById("spdIPF").valueAsNumber;
    var basedex=document.getElementById("dexIPF").valueAsNumber;
    var basewill=document.getElementById("willIPF").valueAsNumber;
    //var basetotal=document.getElementById("totalIPF").valueAsNumber;
    var attackLevel=document.getElementById("attackLevel").value;
    var slashLevel=document.getElementById("slashLevel").value;
    var meitoGrade=document.getElementById("bladeGrade").value;
    var DFCheck=document.getElementById("DFCheck").checked;
    var UACheck=document.getElementById("UACheck").checked;
    var NACheck=document.getElementById("NACheck").checked;
    var PowCheck=document.getElementById("PowCheck").checked;
    var strReq,spdReq,dexReq,willReq,meitoReq;
    var attackMult,slashMult,slashPower,attackPower,attackResult,slashResult,threshold;
    var adjStr,adjSpd,adjDex,adjWill;
    var strFactor=3.5;
    var spdFactor=1.5;
    var dexFactor=3.25;
    var willFactor=1.75;
    //var totalFactor=1;
    var powerScale;
    var i; //Initializing
    //var waveReq=document.getElementsByClassName("waveReq");
    //var slashReq=document.getElementsByClassName("slashReq");
    //var meitoBox=document.getElementsByClassName("bladeGrade"); //Creating Variables/Array Pointers to use in case reqs are not met
    for(i=0;i<errors.length;i++)
        {
            errors[i].style.visibility="hidden";  //Hide Errors by Default
        }
    switch(attackLevel)
        {
            case '0':attackMult=0.975;strReq=0;spdReq=0;break;
            case '1':attackMult=0.350;strReq=50;spdReq=50;break;
            case '2':attackMult=0.400;strReq=90;spdReq=60;break;
            case '3':attackMult=0.550;strReq=130;spdReq=70;break;
            case '4':attackMult=0.700;strReq=170;spdReq=80;break;
            case '5':attackMult=0.850;strReq=210;spdReq=90;break;
        }
    switch(slashLevel)
        {
            case '0':slashMult=1.00;dexReq=0;meitoReq=0;break;
            case '1':slashMult=0.350;dexReq=50;meitoReq=0;break;
            case '2':slashMult=0.425;dexReq=75;meitoReq=1;break;
            case '3':slashMult=0.600;dexReq=100;meitoReq=1;break;
            case '4':slashMult=0.775;dexReq=125;meitoReq=2;break;
            case '5':slashMult=0.950;dexReq=150;meitoReq=3;break;
            
            default:slashMult=0;dexReq=0;break;
        }
    switch(meitoGrade)
        {
            case '0':slashMult+=0;break;
            case '1':slashMult+=.05;break;
            case '2':slashMult+=.10;break;
            case '3':slashMult+=.15;break;
            case '4':slashMult+=.25;break;
        }
    /*if(slashLevel==0)
        {
            gradeMult=(gradeMult-1)/2+1;
        }*/
    willReq=dexReq;
    
    if(basestr<strReq)
        {
            document.getElementById("waveReq-error-msg").style.visibility="visible";
            document.getElementById("strIPF").style.border="2px solid red";
        }
    if(basespd<spdReq)
        {
            document.getElementById("waveReq-error-msg").style.visibility="visible";
            document.getElementById("spdIPF").style.border="2px solid red";
        }
    if(basedex<dexReq)
        {
            document.getElementById("slashReq-error-msg").style.visibility="visible";
            document.getElementById("dexIPF").style.border="2px solid red";
        }
    if(basewill<willReq)
        {
            document.getElementById("slashReq-error-msg").style.visibility="visible";
            document.getElementById("willIPF").style.border="2px solid red";
        }
    if(meitoGrade<meitoReq)
        {
            document.getElementById("meitoGrade-error-msg").style.visibility="visible";
            document.getElementById("bladeGrade").style.border="2px solid red";
        }
    if((DFCheck)&&(slashLevel>0))
        {
            slashMult-=0.10;
        }
    if((UACheck)&&(slashLevel>0))
        {
            slashMult-=0.067;
        }
    if(PowCheck)
        {
            attackMult+=.25;
            slashMult+=.25;
        }
    adjSpd=adjStat(basespd);
    attackPower=(strFactor*basestr+spdFactor*adjSpd+dexFactor*basedex+willFactor*basewill)/10*attackMult;
    slashPower=(strFactor*basestr+spdFactor*adjSpd+dexFactor*basedex+willFactor*basewill)/10*slashMult;
  
    /*if((slashLevel!=0)&&(slashLevel<=5))
        {
            if(slashLevel<=4)
                {
                    if(slashLevel<=3)
                    {
                        if(slashLevel<=2)
                            {
                                if(slashLevel==1)
                                    {
                                        if((slashPower>iro2)&&(meitoGrade>=1))
                                            {
                                                slashPower=iro2+(slashPower-iro2)*overflow;
                                            }
                                        else if(slashPower>iro2)
                                            {
                                                slashPower=iro2+(slashPower-iro2)*overflow;
                                            }
                                    }
                                if((slashPower>ste1)&&(meitoGrade>=1))
                                    {
                                        slashPower=ste1+(slashPower-ste1)*overflow;
                                    }
                                else if(slashPower>ste1)
                                    {
                                        slashPower=ste1+(slashPower-ste1)*overflow;
                                    }
                            }
                        if((slashPower>ste2)&&(meitoGrade>=1))
                            {
                                slashPower=ste2+(slashPower-ste2)*overflow;
                            }
                        else if(slashPower>ste2)
                            {
                                slashPower=ste2+(slashPower-ste2)*overflow;
                            }
                    }
                    if((slashPower>tit2)&&(meitoGrade>=2))
                        {
                            slashPower=tit2+(slashPower-tit2)*overflow;
                        }
                    else if(slashPower>tit2)
                        {
                            slashPower=tit2+(slashPower-tit2)*overflow;
                        }
                }
            if((slashPower>max)&&(meitoGrade==4))
                {
                    slashPower=max+(slashPower-max)*overflow;
                }
            else if (meitoGrade==4)
                {
                    //Do nothing if its a Saijo and its lower than max
                }
            else if((slashPower>dia2)&&(meitoGrade>=3))
                {
                    slashPower=dia2+(slashPower-dia2)*overflow;
                }
            else if(slashPower>dia2)
                {
                    slashPower=dia2+(slashPower-dia2)*overflow;
                }
        }
    if(slashLevel==0)
        {*/
            if((slashPower>woo1)&&(basestr<woo1t||basespd<woo1t2))
                {
                    slashPower=woo1+(slashPower-woo1)*overflow;
                }
                if((slashPower>woo2)&&(basestr<woo2t||basespd<woo2t2))
                    {
                        slashPower=woo2+(slashPower-woo2)*overflow;
                    }
                    if((slashPower>bon1)&&(basestr<bon1t||basespd<bon1t2))
                        {
                            slashPower=bon1+(slashPower-bon1)*overflow;
                        }
                        if((slashPower>bon2)&&(basestr<bon2t||basespd<bon2t2))
                            {
                                slashPower=bon2+(slashPower-bon2)*overflow;
                            }
                            if((slashPower>sto1)&&(basestr<sto1||basespd<sto1t2))
                                {
                                    slashPower=sto1+(slashPower-sto1)*overflow;
                                }
                                if((slashPower>sto2)&&(basestr<sto2t||basespd<sto2t2))
                                    {
                                        slashPower=sto2+(slashPower-sto2)*overflow;
                                    }
                                    if((slashPower>bro1)&&(basestr<bro1t||basespd<bro1t2))
                                        {
                                            slashPower=bro1+(slashPower-bro1)*overflow;
                                        }
                                        if((slashPower>bro2)&&(basestr<bro2t||basespd<bro2t2))
                                            {
                                                slashPower=bro2+(slashPower-bro2)*overflow;
                                            }
                                            if((slashPower>iro1)&&(basestr<iro1t||basespd<iro1t2))
                                                {
                                                    slashPower=iro1+(slashPower-iro1)*overflow;
                                                }
                                                if((slashPower>iro2)&&((basestr<iro2t||basespd<iro2t2)||(slashLevel==1)))
                                                    {
                                                        slashPower=iro2+(slashPower-iro2)*overflow;
                                                    }
                                                    if((slashPower>ste1)&&((basestr<ste1t||basespd<ste1t2)||((slashLevel>0)&&(slashLevel<=2))))
                                                        {
                                                            slashPower=ste1+(slashPower-ste1)*overflow;
                                                        }
                                                        if((slashPower>ste2)&&((basestr<ste2t||basespd<ste2t2)||((slashLevel>0)&&(slashLevel<=3))))
                                                            {
                                                                slashPower=ste2+(slashPower-ste2)*overflow;
                                                            }
                                                            if((slashPower>tit1)&&((basestr<tit1t||basespd<tit1t2)||((slashLevel>0)&&(slashLevel<=3))))
                                                                {
                                                                    slashPower=tit1+(slashPower-tit1)*overflow;
                                                                }
                                                                if((slashPower>tit2)&&((basestr<tit2t||basespd<tit2t2)||((slashLevel>0)&&(slashLevel<=4))))
                                                                    {
                                                                        slashPower=tit2+(slashPower-tit2)*overflow;
                                                                    }
                                                                    if((slashPower>dia1)&&((basestr<dia1t||basespd<dia1t2)||((slashLevel>0)&&(slashLevel<=4))))
                                                                        {
                                                                            slashPower=dia1+(slashPower-dia1)*overflow;
                                                                        }
                                                                        if((slashPower>dia2)&&((basestr<dia2t||basespd<dia2t2)||(((slashLevel>0)&&(slashLevel<=5))&&(meitoGrade!=4))))
                                                                            {
                                                                                slashPower=dia2+(slashPower-dia2)*overflow;
                                                                            }
                                                                            if(slashPower>max)  
                                                                                {
                                                                                    slashPower=max+(slashPower-max)*overflow;
                                                                                }                        
        /*}
    if((attackLevel!=0)&&(attackLevel<=5))
        {
            if(attackLevel<=4)
                {
                    if(attackLevel<=3)
                        {
                            if(attackLevel<=2)
                                {
                                    if(attackLevel==1)
                                        {
                                            if(attackPower>iro2)
                                                {
                                                    attackPower=iro2+(attackPower-iro2)*overflow;
                                                }
                                        }
                                    if(attackPower>ste1)
                                        {
                                            attackPower=ste1+(attackPower-ste1)*overflow;
                                        }
                                }
                            if(attackPower>ste2)
                                {
                                    attackPower=ste2+(attackPower-ste2)*overflow;
                                }
                        }
                    if(attackPower>tit1)
                        {
                            attackPower=tit1+(attackPower-tit1)*overflow;
                        }
                }
            if(attackPower>tit2)
                {
                    attackPower=tit2+(attackPower-tit2)*overflow;
                }
            
        }
    if(attackLevel==0)
        {*/
            if((attackPower>woo1)&&(basestr<woo1t||basespd<woo1t2))
                {
                    attackPower=woo1+(attackPower-woo1)*overflow;
                }
                if((attackPower>woo2)&&(basestr<woo2t||basespd<woo2t2))
                    {
                        attackPower=woo2+(attackPower-woo2)*overflow;
                    }
                    if((attackPower>bon1)&&(basestr<bon1t||basespd<bon1t2))
                        {
                            attackPower=bon1+(attackPower-bon1)*overflow;
                        }
                        if((attackPower>bon2)&&(basestr<bon2t||basespd<bon2t2))
                            {
                                attackPower=bon2+(attackPower-bon2)*overflow;
                            }
                            if((attackPower>sto1)&&(basestr<sto1||basespd<sto1t2))
                                {
                                    attackPower=sto1+(attackPower-sto1)*overflow;
                                }
                                if((attackPower>sto2)&&(basestr<sto2t||basespd<sto2t2))
                                    {
                                        attackPower=sto2+(attackPower-sto2)*overflow;
                                    }
                                    if((attackPower>bro1)&&(basestr<bro1t||basespd<bro1t2))
                                        {
                                            attackPower=bro1+(attackPower-bro1)*overflow;
                                        }
                                        if((attackPower>bro2)&&(basestr<bro2t||basespd<bro2t2))
                                            {
                                                attackPower=bro2+(attackPower-bro2)*overflow;
                                            }
                                            if((attackPower>iro1)&&(basestr<iro1t||basespd<iro1t2))
                                                {
                                                    attackPower=iro1+(attackPower-iro1)*overflow;
                                                }
                                                if((attackPower>iro2)&&((basestr<iro2t||basespd<iro2t2)||(attackLevel==1)))
                                                    {
                                                        attackPower=iro2+(attackPower-iro2)*overflow;
                                                    }
                                                    if((attackPower>ste1)&&((basestr<ste1t||basespd<ste1t2)||((attackLevel>0)&&(attackLevel<=2))))
                                                        {
                                                            attackPower=ste1+(attackPower-ste1)*overflow;
                                                        }
                                                        if((attackPower>ste2)&&((basestr<ste2t||basespd<ste2t2)||((attackLevel>0)&&(attackLevel<=3))))
                                                            {
                                                                attackPower=ste2+(attackPower-ste2)*overflow;
                                                            }
                                                            if((attackPower>tit1)&&((basestr<tit1t||basespd<tit1t2)||((attackLevel>0)&&(attackLevel<=4))))
                                                                {
                                                                    attackPower=tit1+(attackPower-tit1)*overflow;
                                                                }
                                                                if((attackPower>tit2)&&((basestr<tit2t||basespd<tit2t2)||((attackLevel>0)&&(attackLevel<=5))))
                                                                    {
                                                                        attackPower=tit2+(attackPower-tit2)*overflow;
                                                                    }
                                                                    if((attackPower>dia1)&&((basestr<dia1t||basespd<dia1t2)||((attackLevel>0)&&(attackLevel<=5))))
                                                                        {
                                                                            attackPower=dia1+(attackPower-dia1)*overflow;
                                                                        }
                                                                        if((attackPower>dia2)&&((basestr<dia2t||basespd<dia2t2)||((attackLevel>0)&&(attackLevel<=5))))
                                                                            {
                                                                                attackPower=dia2+(attackPower-dia2)*overflow;
                                                                            }
                                                                            if(attackPower>max)  
                                                                                {
                                                                                    attackPower=max+(attackPower-max)*overflow;
                                                                                }                        
        //}
    powerScaleThreshold=[dia2,dia1,tit2,tit1,ste2,ste1,iro2,iro1,bro2,bro1,sto2,sto1,bon2,bon1,woo2,woo1];
    powerScaleMaterial=["2Diamond","1Diamond","2Titanium","1Titanium","2Steel","1Steel","2Iron","1Iron","2Bronze","1Bronze","2Stone","1Stone","2Bone","1Bone","2Wood","1Wood"];
    attackPower=Math.round(attackPower);
    slashPower=Math.round(slashPower);
    for(var index in powerScaleThreshold)
        {
            if((attackPower>=powerScaleThreshold[index])&&(!attackResult))
                {
                    attackResult=powerScaleMaterial[index];
                    
                }
           if((slashPower>=powerScaleThreshold[index])&&(!slashResult))
                {
                    slashResult=powerScaleMaterial[index];
                }
        }    if(attackResult[0]=="2")
        {
            attackResult=attackResult.replace("2","Can Smash ");
        }
    else if(attackResult[0]=="1")
        {
            attackResult=attackResult.replace("1","Can Dent ");
        }
    else
        {
            attackResult="This shouldn't be happening";
        }
    if(slashResult[0]=="2")
        {
            slashResult=slashResult.replace("2","Can Cut ");
        }
    else if(slashResult[0]=="1")
        {
            slashResult=slashResult.replace("1","Can Gouge ");
        }
    else
        {
            slashResult="This shouldn't be happening";
        }
    
    
    document.getElementById("attackPower").textContent=Math.round(attackPower);
    document.getElementById("slashPower").textContent=Math.round(slashPower);
    document.getElementById("attackResult").textContent=attackResult;
    document.getElementById("slashResult").textContent=slashResult;

    
        
}

function adjStat(basestat)
{
    var res=0,multiplier=1.35,increment=25;
    while(basestat>=increment)
        {
            res+=increment*multiplier;
            basestat-=increment;
            multiplier-=0.0255;
        }
    res+=basestat*multiplier;
    return res;
}
