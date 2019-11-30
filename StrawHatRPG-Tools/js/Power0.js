/*V3:
Changed Stat Weightage (1.5,.5,1,1)
Updated material hardness scaling diamond upto 570
Updated overflow 50%, overflow 25%
Increased str rate for waves and slashes
Reduced Meito Bonuses from 10/20/30/45 to 5/10/15/25
DF Reduction changed from -7.5%/-5% on multipliers to 10%/7.5%
In this version melee slashes are always stronger than any flying slash.
Threshold on normal attacks is 665
Compatible with the 12/01/2019 Patch (Power Attack)
*/

window.onload=function(){
    mainCalcFunction();
}

function mainCalcFunction()
{
    var max=570;
    var dia2=570;
    var dia1=475;
    var tit2=380;
    var tit1=315;
    var ste2=250;
    var ste1=205;
    var iro2=160;
    var iro1=130;
    var bro2=100;
    var bro1=80;
    var sto2=60;
    var sto1=45;
    var bon2=30;
    var bon1=20;
    var woo2=10;
    var woo1=5;
    var overflow=.5;
    //var overflow=.25;
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
    var attackLevel=document.getElementById("attackLevel").value;
    var slashLevel=document.getElementById("slashLevel").value;
    var meitoGrade=document.getElementById("bladeGrade").value;
    var DFCheck=document.getElementById("DFCheck").checked;
    var UACheck=document.getElementById("UACheck").checked;
    var NACheck=document.getElementById("NACheck").checked;
    var PowCheck=document.getElementById("PowCheck").checked;
    var strReq,spdReq,dexReq,willReq,meitoReq;
    var attackMult,slashMult,slashPower,attackPower,attackResult,slashResult,threshold;
    var strFactor=1.33;
    var spdFactor=0.67;
    var dexFactor=1.25;
    var willFactor=.75;
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
            case '1':attackMult=0.650;strReq=50;spdReq=50;break;
            case '2':attackMult=0.700;strReq=90;spdReq=60;break;
            case '3':attackMult=0.750;strReq=130;spdReq=70;break;
            case '4':attackMult=0.800;strReq=170;spdReq=80;break;
            case '5':attackMult=0.850;strReq=210;spdReq=90;break;
        }
    switch(slashLevel)
        {
            case '0':slashMult=1.00;dexReq=0;meitoReq=0;break;
            case '1':slashMult=0.750;dexReq=50;meitoReq=0;break;
            case '2':slashMult=0.800;dexReq=75;meitoReq=1;break;
            case '3':slashMult=0.850;dexReq=100;meitoReq=1;break;
            case '4':slashMult=0.900;dexReq=125;meitoReq=2;break;
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
            slashMult-=0.075;
        }
    if(PowCheck)
        {
            attackMult+=.25;
            slashMult+=.25;
        }
    attackPower=(strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)/4*attackMult;
    slashPower=(strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)/4*slashMult;
    
    if((slashLevel!=0)&&(slashLevel<=5))
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
                    slashPower=dia2+(slashPower-dia2)*overflow;
                }
            else if (meitoGrade==4)
                {
                    //Do nothing if its a Saijo and its lower than max
                }
            else if((slashPower>560)&&(meitoGrade>=3))
                {
                    slashPower=560+(slashPower-560)*overflow;
                }
            else if(slashPower>dia2)
                {
                    slashPower=dia2+(slashPower-dia2)*overflow;
                }
        }
    if(slashLevel==0)
        {
            if(slashPower>max)
                {
                    slashPower=max+(slashPower-max)*overflow;
                }
        }
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
        {
            if(attackPower>max)  
                {
                    attackPower=max+(attackPower-max)*overflow;
                }
        }
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


