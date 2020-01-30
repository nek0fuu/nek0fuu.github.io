/* Stances Fully Count Towards Max Caps*/

window.onload = function(){
    mainCalcFunction();
}
var errorFlag;
function fetchUserStats() {
    // Remove stats error because we're getting a new username and new stats
    //statsErrorMsg.classList.remove('show');

    // GET PAGE ID FROM HERE WHEN PUBLISHED
    // https://spreadsheets.google.com/feeds/cells/SHEET_ID/od6/public/full?alt=json
    let sheetID = "11DBV69f-U9T1EXbdI_AvjHpp7XzSs38fH9eKqdx2sUw";

    let url = `https://spreadsheets.google.com/feeds/list/${sheetID}/2/public/full?alt=json`;

    let request = new XMLHttpRequest();
    
    request.ontimeout = () => {
        logError(statsErrorMsg, `Error - Timed Out while fetching user's stats. Please manually input current stats.`);
        fetchBtn.disabled = false;
    };

    request.open('GET', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.timeout = 5000;

    request.send();
    
    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            if (request.status === 200) {
                // Good response
                let data = JSON.parse(request.response).feed.entry;
                let entry = data.findIndex((e) => {
                    return (e.gsx$racialboost.$t.localeCompare(document.getElementById("username").value, 'en', {sensitivity: 'base'}) === 0)
                });
                if (entry) {
                    //currentStats.value = entry.gsx$totalbasestats.$t;
                    document.getElementById("stamIPF").value=data[entry+1].gsx$currentstats.$t;
                    document.getElementById("stamRIPF").value=data[entry+1].gsx$racialboost.$t;
                    document.getElementById("strIPF").value=data[entry+2].gsx$currentstats.$t;
                    document.getElementById("strRIPF").value=data[entry+2].gsx$racialboost.$t;
                    document.getElementById("spdIPF").value=data[entry+3].gsx$currentstats.$t;
                    document.getElementById("spdRIPF").value=data[entry+3].gsx$racialboost.$t;
                    document.getElementById("dexIPF").value=data[entry+4].gsx$currentstats.$t;
                    document.getElementById("dexRIPF").value=data[entry+4].gsx$racialboost.$t;
                    document.getElementById("willIPF").value=data[entry+5].gsx$currentstats.$t;
                    document.getElementById("willRIPF").value=data[entry+5].gsx$racialboost.$t;
                    document.getElementById("charName").textContent=data[entry].gsx$a.$t;
                    mainCalcFunction();
                } else {
                    logError(statsErrorMsg, "Error Fetching User's Stats. Check spelling or enter stats manually");
                }
                return;
            } else {
                logError(statsErrorMsg, "Error Fetching User's Stats from Google");
                fetchBtn.disabled = false;
                return;
            }
        }
    }
    
    request.onabort = function() {
        logError(statsErrorMsg, "Fetching User's Stats Aborted");
        calculateMaxStats();
        fetchBtn.disabled = false;
        return;
    }

    request.onerror = function() {
        logError(statsErrorMsg, "Error Fetching User's Stats from Google");
        console.log(`Error ${request.status}: ${request.statusText}`);
        calculateMaxStats();
        fetchBtn.disabled = false;
        return;
    }
}


function mainCalcFunction()
{
    var ipfields=document.getElementsByClassName("IP");
    for(var i=0;i<ipfields.length;i++)
        {
            ipfields[i].addEventListener("change",mainCalcFunction);
            ipfields[i].style.border="";
        }
    
    var errors=document.getElementsByClassName("error-msg");
    var warns=document.getElementsByClassName("warn-msg");
    var MaxTotalBoostLabel=document.getElementsByClassName("maxBoost");
    var MaxPhysBoostLabel=document.getElementsByClassName("maxPhysBoost");
    var MaxMentBoostLabel=document.getElementsByClassName("maxMentBoost");
    var MaxFlatLabel=document.getElementsByClassName("maxFlatBoost");
    var MaxTotalFlatLabel=document.getElementsByClassName("maxTotalFlatBoost");
    var MaxStanceBoostLabel=document.getElementsByClassName("maxStanceBoost");
    var TempBoosts=document.getElementsByClassName("TempBoostIPF");
    var FlatBoosts=document.getElementsByClassName("FlatBoosts");
    var newStats=document.getElementsByClassName("new-stats");
    var racestam=document.getElementById("stamRIPF").valueAsNumber;
    var basestam=document.getElementById("stamIPF").valueAsNumber;
    var tempstamBoost=document.getElementById("stamTempBoostIPF").valueAsNumber;
    var stancestamBoost=document.getElementById("stamStancesIPF").valueAsNumber;
    var stancestamLoss=document.getElementById("stamStancesLossIPF").valueAsNumber;
    var otherstamBoost=document.getElementById("stamTempFlatBoostIPF").valueAsNumber;
    var racestr=document.getElementById("strRIPF").valueAsNumber;
    var basestr=document.getElementById("strIPF").valueAsNumber;
    var tempstrBoost=document.getElementById("strTempBoostIPF").valueAsNumber;
    var stancestrBoost=document.getElementById("strStancesIPF").valueAsNumber;
    var stancestrLoss=document.getElementById("strStancesLossIPF").valueAsNumber;
    var otherstrBoost=document.getElementById("strTempFlatBoostIPF").valueAsNumber;
    var racespd=document.getElementById("spdRIPF").valueAsNumber;
    var basespd=document.getElementById("spdIPF").valueAsNumber;
    var tempspdBoost=document.getElementById("spdTempBoostIPF").valueAsNumber;
    var stancespdBoost=document.getElementById("spdStancesIPF").valueAsNumber;
    var stancespdLoss=document.getElementById("spdStancesLossIPF").valueAsNumber;
    var otherspdBoost=document.getElementById("spdTempFlatBoostIPF").valueAsNumber;
    var racedex=document.getElementById("dexRIPF").valueAsNumber;
    var basedex=document.getElementById("dexIPF").valueAsNumber;
    var tempdexBoost=document.getElementById("dexTempBoostIPF").valueAsNumber;
    var stancedexBoost=document.getElementById("dexStancesIPF").valueAsNumber;
    var stancedexLoss=document.getElementById("dexStancesLossIPF").valueAsNumber; 
    var otherdexBoost=document.getElementById("dexTempFlatBoostIPF").valueAsNumber;
    var racewill=document.getElementById("willRIPF").valueAsNumber;
    var basewill=document.getElementById("willIPF").valueAsNumber;
    var tempwillBoost=document.getElementById("willTempBoostIPF").valueAsNumber;
    var stancewillBoost=document.getElementById("willStancesIPF").valueAsNumber;
    var stancewillLoss=document.getElementById("willStancesLossIPF").valueAsNumber;
    var otherwillBoost=document.getElementById("willTempFlatBoostIPF").valueAsNumber;
    var stancePerkLevel=document.getElementById("StancePerk").value;
    //var maxBoosterPerk=document.getElementById("MaxModifier").value;
    var strongWill=document.getElementById("StrongWillIPF").checked;
    var maxRacialBoost=3,maxStanceBoost;
    var maxTotalBoost=10,maxBaseStatAmt=500, maxStatFlatBoost=50, maxTotalFlatBoost=100;
    var maxPhysStatBoost=5, maxBoostPhysStatAmt=750, maxMentStatBoost=5, maxBoostMentStatAmt=750;
    var statLossReduction,totalRaceBoost,totalStanceBoost,totalFlatStanceBoost,properFlatStanceLoss,actualFlatStanceLoss,totalBoost, totalFlatBoost=0;
    var totalStamBoost=1;
    var totalStrBoost=1;
    var totalSpdBoost=1;
    var totalDexBoost=1;
    var totalWillBoost=1;    
    var racebasestam,racebasestr,racebasespd,racebasedex,racebasewill,finalstam,finalstr,finalspd,finaldex,finalwill,finaltotal;
    var i; //Initializing
    var boosts=document.getElementsByClassName("Boost");
    var raceBoost=document.getElementsByClassName("raceBoost");
    var stamBoost=document.getElementsByClassName("stamBoost");
    var strBoost=document.getElementsByClassName("strBoost");
    var spdBoost=document.getElementsByClassName("spdBoost");
    var dexBoost=document.getElementsByClassName("dexBoost");
    var willBoost=document.getElementsByClassName("willBoost");
    var stanceBoost=document.getElementsByClassName("stanceBoost"); //Creating Variables/Array Pointers to use in case boosts exceed caps
    var stanceLoss=document.getElementsByClassName("stanceLoss")
    var basetotal=basestam+basestr+basespd+basedex+basewill;
    document.getElementById("TotalIPF").value=basetotal;  //Set Total
    for(i=0;i<errors.length;i++)
        {
            errors[i].style.display="none";  //Hide Errors by Default
        }
    for(i=0;i<warns.length;i++)
        {
            warns[i].style.display="none";  //Hide Warns by Default
        }
    for(i=0;i<newStats.length;i++)
        {
            newStats[i].style.color=""; //Unhighlight Final Stats
        }
    for(i=0;i<boosts.length;i++)
        {
            boosts[i].style.border=""; //Unhighlight Fields
        }
    /*
    switch(maxBoosterPerk)
        {
            case 'NON':maxPhysStatBoost=25;maxBoostPhysStatAmt=675;maxTotalBoost=50;break;
            /*
            case 'M1':maxPhysStatBoost=26;maxBoostPhysStatAmt=680;maxTotalBoost=50;break;
            case 'M2':maxPhysStatBoost=27;maxBoostPhysStatAmt=685;maxTotalBoost=50;break;
            case 'M3':maxPhysStatBoost=28;maxBoostPhysStatAmt=690;maxTotalBoost=50;break;
            case 'M4':maxPhysStatBoost=29;maxBoostPhysStatAmt=695;maxTotalBoost=50;break;
            case 'M5':maxPhysStatBoost=30;maxBoostPhysStatAmt=700;maxTotalBoost=50;break;
            case 'O1':maxPhysStatBoost=28;maxBoostPhysStatAmt=690;maxTotalBoost=50;break;
            case 'O2':maxPhysStatBoost=31;maxBoostPhysStatAmt=705;maxTotalBoost=50;break;
            case 'O3':maxPhysStatBoost=34;maxBoostPhysStatAmt=720;maxTotalBoost=50;break;
            case 'O4':maxPhysStatBoost=37;maxBoostPhysStatAmt=735;maxTotalBoost=50;break;
            case 'O5':maxPhysStatBoost=40;maxBoostPhysStatAmt=750;maxTotalBoost=50;break;
            case 'A1':maxPhysStatBoost=40;maxBoostPhysStatAmt=750;maxTotalBoost=53;break;
            case 'A2':maxPhysStatBoost=40;maxBoostPhysStatAmt=750;maxTotalBoost=56;break;
            case 'A3':maxPhysStatBoost=40;maxBoostPhysStatAmt=750;maxTotalBoost=60;break;
            
            case 'A1':maxPhysStatBoost=28;maxBoostPhysStatAmt=690;maxTotalBoost=53;break;
            case 'A2':maxPhysStatBoost=31;maxBoostPhysStatAmt=705;maxTotalBoost=56;break;
            case 'A3':maxPhysStatBoost=35;maxBoostPhysStatAmt=725;maxTotalBoost=60;break;
            default:break;
        }
    totalStanceBoost=(stancestamBoost+stancestrBoost+stancespdBoost+stancedexBoost+stancewillBoost)/100
    switch(stancePerkLevel)
        {
            /*
            case '0':statLossReduction=0;maxStanceBoost=10;maxMentStatBoost=25;maxBoostMentStatAmt=675;break;
            case '1':statLossReduction=25;maxStanceBoost=13;
                if(strongWill){maxMentStatBoost=30;maxBoostMentStatAmt=700;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;
            case '2':statLossReduction=50;maxStanceBoost=16;
                if(strongWill){maxMentStatBoost=35;maxBoostMentStatAmt=725;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;
            case '3':statLossReduction=75;maxStanceBoost=20;
                if(strongWill){maxMentStatBoost=40;maxBoostMentStatAmt=750;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;
            
            case '1':statLossReduction=25;maxStanceBoost=13;
                if(strongWill&&totalStanceBoost){maxMentStatBoost=28;maxBoostMentStatAmt=690;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;
            case '2':statLossReduction=50;maxStanceBoost=16;
                if(strongWill&&totalStanceBoost){maxMentStatBoost=31;maxBoostMentStatAmt=705;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;
            case '3':statLossReduction=75;maxStanceBoost=20;
                if(strongWill&&totalStanceBoost){maxMentStatBoost=35;maxBoostMentStatAmt=725;}
                else{maxMentStatBoost=25;maxBoostMentStatAmt=675;}break;    
                
            default:statLossReduction=0;maxStanceBoost=10;break;
        }
    maxBoostPhysStatAmt=700;
    maxBoostMentStatAmt=700;
    */
    for(i=0;i<MaxTotalBoostLabel.length;i++)
        {
            MaxTotalBoostLabel[i].textContent=maxTotalBoost;
        }
    for(i=0;i<MaxPhysBoostLabel.length;i++)
        {
            MaxPhysBoostLabel[i].textContent=maxPhysStatBoost;
        }
    for(i=0;i<MaxMentBoostLabel.length;i++)
        {
            MaxMentBoostLabel[i].textContent=maxMentStatBoost;
        }
    for(i=0;i<MaxFlatLabel.length;i++)
        {
            MaxFlatLabel[i].textContent=maxStatFlatBoost;
        }
    for(i=0;i<MaxTotalFlatLabel.length;i++)
        {
            MaxTotalFlatLabel[i].textContent=maxTotalFlatBoost;
        }
    //document.getElementById("maxPhysBoost").textContent=maxPhysStatBoost;
    //document.getElementById("maxMentBoost").textContent=maxMentStatBoost;
    //Setting Maxes (Based on Zoan Awakening/Fighting Spirit)
    /*
    document.getElementById("maxBoost").max=maxTotalBoost;
    for(i=0;i<MaxTotalBoostLabel;i++)
        {
            MaxTotalBoostLabel[i].textContent=maxTotalBoost;
        }
    for(i=0;i<MaxStatBoostLabel;i++)
        {
            MaxStatBoostLabel[i].textContent=maxStatBoost;
        }
    for(i=0;i<TempBoosts.length;i++)
        {
            TempBoosts[i].max=maxStatBoost;
        }
    */
    
    document.getElementById("stamStancesLossIPF").disabled=false;
    document.getElementById("strStancesLossIPF").disabled=false;
    document.getElementById("spdStancesLossIPF").disabled=false;  //Manually Re-enable Stat Loss Fields for physicals, not mental cause it needs a perk
    if(!strongWill)
        {
            maxStanceBoost=2;
            document.getElementById("dexStancesIPF").value=0;
            document.getElementById("dexStancesLossIPF").value=0;
            stancedexBoost=0;
            stancedexLoss=0;
            document.getElementById("dexStancesIPF").disabled=true;
            document.getElementById("dexStancesLossIPF").disabled=true; 
            document.getElementById("willStancesIPF").value=0;
            document.getElementById("willStancesLossIPF").value=0;
            stancewillBoost=0;
            stancewillLoss=0;
            document.getElementById("willStancesIPF").disabled=true;
            document.getElementById("willStancesLossIPF").disabled=true; //Disable Mental from Stances by default and Max to 10
        }
    else
        {
            maxStanceBoost=4;
            document.getElementById("dexStancesIPF").disabled=false;
            document.getElementById("dexStancesLossIPF").disabled=false;
            document.getElementById("willStancesIPF").disabled=false;
            document.getElementById("willStancesLossIPF").disabled=false;
        }
    switch(stancePerkLevel)
        {
            case '0':statLossReduction=0;break;
            case '1':statLossReduction=25;break;
            case '2':statLossReduction=50;break;
            case '3':statLossReduction=75;break  
                
            default:statLossReduction=0;maxStanceBoost=10;break;
        }
    for(i=0;i<MaxStanceBoostLabel.length;i++)
        {
            MaxStanceBoostLabel[i].textContent=maxStanceBoost;
        }
    document.getElementById("LossRedIPF").value=statLossReduction; //set StatLossReduction based on Perk Level
    
    
            //Check and Correct Base Stats, Race, Temp Boost, Stance Boost Fields before doing the other checks
            basestam=check(basestam,maxBaseStatAmt);
            if(errorFlag)
                {
                    document.getElementById("stamIPF").value=maxBaseStatAmt;
                    errorFlag=false;
                }
            basestr=check(basestr,maxBaseStatAmt);
            if(errorFlag)
                {
                    document.getElementById("strIPF").value=maxBaseStatAmt;
                    errorFlag=false;
                }
            basespd=check(basespd,maxBaseStatAmt);
            if(errorFlag)
                {
                    document.getElementById("spdIPF").value=maxBaseStatAmt;
                    errorFlag=false;
                }
            basedex=check(basedex,maxBaseStatAmt);
            if(errorFlag)
                {
                    document.getElementById("dexIPF").value=maxBaseStatAmt;
                    errorFlag=false;
                }
            basewill=check(basewill,maxBaseStatAmt);
            if(errorFlag)
                {
                    document.getElementById("willIPF").value=maxBaseStatAmt;
                    errorFlag=false;
                }
    
            racestam=check(racestam,maxRacialBoost);
            if(errorFlag)
                {
                    document.getElementById("stamRIPF").value=maxRacialBoost;
                    errorFlag=false;
                }
            racestr=check(racestr,4);
            if(errorFlag)
                {
                    document.getElementById("strRIPF").value=4;
                    errorFlag=false;
                }
            racespd=check(racespd,maxRacialBoost);
            if(errorFlag)
                {
                    document.getElementById("spdRIPF").value=maxRacialBoost;
                    errorFlag=false;
                }
            racedex=check(racedex,maxRacialBoost);
            if(errorFlag)
                {
                    document.getElementById("dexRIPF").value=maxRacialBoost;
                    errorFlag=false;
                }
            racewill=check(racewill,maxRacialBoost);
            if(errorFlag)
                {
                    document.getElementById("willRIPF").value=maxRacialBoost;
                    errorFlag=false;
                }
            tempstamBoost=check(tempstamBoost,maxPhysStatBoost);
            if(errorFlag)
                {
                    document.getElementById("stamTempBoostIPF").value=maxPhysStatBoost;
                    errorFlag=false;
                }
            tempstrBoost=check(tempstrBoost,maxPhysStatBoost);
            if(errorFlag)
                {
                    document.getElementById("strTempBoostIPF").value=maxPhysStatBoost;
                    errorFlag=false;
                }
            tempspdBoost=check(tempspdBoost,maxPhysStatBoost);
            if(errorFlag)
                {
                    document.getElementById("spdTempBoostIPF").value=maxPhysStatBoost;
                    errorFlag=false;
                }
            tempdexBoost=check(tempdexBoost,maxMentStatBoost);
            if(errorFlag)
                {
                    document.getElementById("dexTempBoostIPF").value=maxMentStatBoost;
                    errorFlag=false;
                }
            tempwillBoost=check(tempwillBoost,maxMentStatBoost);
            if(errorFlag)
                {
                    document.getElementById("willTempBoostIPF").value=maxMentStatBoost;
                    errorFlag=false;
                }
    
            stancestamBoost=check(stancestamBoost,maxStanceBoost)
            if(errorFlag)
                {
                    document.getElementById("stamStancesIPF").value=maxStanceBoost;
                    errorFlag=false;
                }
            stancestrBoost=check(stancestrBoost,maxStanceBoost)
            if(errorFlag)
                {
                    document.getElementById("strStancesIPF").value=maxStanceBoost;
                    errorFlag=false;
                }
            stancespdBoost=check(stancespdBoost,maxStanceBoost)
            if(errorFlag)
                {
                    document.getElementById("spdStancesIPF").value=maxStanceBoost;
                    errorFlag=false;
                }
            stancedexBoost=check(stancedexBoost,maxStanceBoost)
            if(errorFlag)
                {
                    document.getElementById("dexStancesIPF").value=maxStanceBoost;
                    errorFlag=false;
                }
            stancewillBoost=check(stancewillBoost,maxStanceBoost)
            if(errorFlag)
                {
                    document.getElementById("willStancesIPF").value=maxStanceBoost;
                    errorFlag=false;
                }
            otherstamBoost=check(otherstamBoost,maxStatFlatBoost)
            if(errorFlag)
                {
                    document.getElementById("stamTempFlatBoostIPF").value=maxStatFlatBoost;
                    errorFlag=false;
                }
            otherstrBoost=check(otherstrBoost,maxStatFlatBoost)
            if(errorFlag)
                {
                    document.getElementById("strTempFlatBoostIPF").value=maxStatFlatBoost;
                    errorFlag=false;
                }
            otherspdBoost=check(otherspdBoost,maxStatFlatBoost)
            if(errorFlag)
                {
                    document.getElementById("spdTempFlatBoostIPF").value=maxStatFlatBoost;
                    errorFlag=false;
                }
            otherdexBoost=check(otherdexBoost,maxStatFlatBoost)
            if(errorFlag)
                {
                    document.getElementById("dexTempFlatBoostIPF").value=maxStatFlatBoost;
                    errorFlag=false;
                }
            otherwillBoost=check(otherwillBoost,maxStatFlatBoost)
            if(errorFlag)
                {
                    document.getElementById("willTempFlatBoostIPF").value=maxStatFlatBoost;
                    errorFlag=false;
                }
    
    
            //Check Stances settings and accordingly adjust
            //Calculate Total Boosts by adding (TotalTempBoosts+TotalStancesBoost*StatLossReduction)
            //Check if Individual and Total Boosts are within maxPhysStatBoost/100 or maxMenStatBoost/100 and maxTotalBoost/100 resp, show errors if true and highlight necessary boxes
            totalRaceBoost=(racestam+racestr+racespd+racedex+racewill)/100; //Should be less than 0.15
            totalStamBoost=(tempstamBoost+stancestamBoost)/100;
            totalStrBoost=(tempstrBoost+stancestrBoost)/100;
            totalSpdBoost=(tempspdBoost+stancespdBoost)/100;    //Each Should be Less than maxPhysStatBoost/100
            totalDexBoost=(tempdexBoost+stancedexBoost)/100;
            totalWillBoost=(tempwillBoost+stancewillBoost)/100; //Each Should be Less than maxMentStatBoost/100
            totalStanceBoost=(stancestamBoost+stancestrBoost+stancespdBoost+stancedexBoost+stancewillBoost)/100; //Should be less than MaxStanceBoost
            totalBoost=((tempstamBoost+tempstrBoost+tempspdBoost+tempdexBoost+tempwillBoost)+(stancestamBoost+stancestrBoost+stancespdBoost+stancedexBoost+stancewillBoost))/100 //Should be less than maxTotalBoost/100
            //Change the second bracket to (stancestamBoost+stancestrBoost+stancespdBoost+stancedexBoost+stancewillBoost)*statLossReduction/100 if you want to account for the fact that stances are not "really" boosts cause of flat loss
            document.getElementById("maxBoost").value=Math.round(totalBoost*100);
    
            if(totalRaceBoost>maxRacialBoost/100)
                {
                    document.getElementById("race-error-msg").style.display="";
                    for(i=0;i<raceBoost.length;i++)
                        {
                            raceBoost[i].style.border="2px solid red";
                        }
                }
            totalStamBoost=check(totalStamBoost,maxPhysStatBoost/100);
            if(errorFlag)
                {
                    document.getElementById("physstatCap-error-msg").style.display="";
                    for(i=0;i<stamBoost.length;i++)
                        {
                            stamBoost[i].style.border="2px solid red";
                        }
                    errorFlag=false;
                }
    
            totalStrBoost=check(totalStrBoost,maxPhysStatBoost/100);
            if(errorFlag)
                {
                    document.getElementById("physstatCap-error-msg").style.display="";
                    for(i=0;i<strBoost.length;i++)
                        {
                            strBoost[i].style.border="2px solid red";
                        }
                    errorFlag=false;
                }
            totalSpdBoost=check(totalSpdBoost,maxPhysStatBoost/100);
            if(errorFlag)
                {
                    document.getElementById("physstatCap-error-msg").style.display="";
                    for(i=0;i<spdBoost.length;i++)
                        {
                            spdBoost[i].style.border="2px solid red";
                        }
                    errorFlag=false;
                }
            totalDexBoost=check(totalDexBoost,maxMentStatBoost/100);
            
            if(errorFlag)
                {
                    document.getElementById("mentstatCap-error-msg").style.display="";
                    for(i=0;i<dexBoost.length;i++)
                        {
                            dexBoost[i].style.border="2px solid red";
                        }
                    errorFlag=false;
                }
            totalWillBoost=check(totalWillBoost,maxMentStatBoost/100);
            if(errorFlag)
                {
                    document.getElementById("mentstatCap-error-msg").style.display="";
                    for(i=0;i<willBoost.length;i++)
                        {
                            willBoost[i].style.border="2px solid red";
                        }
                    errorFlag=false;
                }
    
            totalStamBoost+=racestam/100;
            totalStrBoost+=racestr/100;
            totalSpdBoost+=racespd/100;
            totalDexBoost+=racedex/100;
            totalWillBoost+=racewill/100;
    
    /*basetotal=Math.round
    (check(basestam+basetotal*(racestam/100),maxBoostPhysStatAmt)+
     check(basestr+basetotal*(racestr/100),maxBoostPhysStatAmt)+
     check(basespd+basetotal*(racespd/100),maxBoostPhysStatAmt)+
     check(basedex+basetotal*(racedex/100),maxBoostPhysStatAmt)+
     check(basewill+basetotal*(racewill/100),maxBoostPhysStatAmt));
    //Updating base Total to Include Racials so that it reflects in boosts
    //Update: Pretty Pointless, difference is miniscule
    */
            /*
            if(totalStamBoost>maxPhysStatBoost/100)
                {
                    document.getElementById("statCap-error-msg").style.display="";
                    for(i=0;i<stamBoost.length;i++)
                        {
                            stamBoost[i].style.border="2px solid red";
                        }
                }
            if(totalStrBoost>maxPhysStatBoost/100)
                {
                    document.getElementById("statCap-error-msg").style.display="";
                    for(i=0;i<strBoost.length;i++)
                        {
                            strBoost[i].style.border="2px solid red";
                        }
                }
            if(totalSpdBoost>maxPhysStatBoost/100)
                {
                    document.getElementById("statCap-error-msg").style.display="";
                    for(i=0;i<spdBoost.length;i++)
                        {
                            spdBoost[i].style.border="2px solid red";
                        }
                }
            if(totalDexBoost>maxMentStatBoost/100)
                {
                    document.getElementById("statCap-error-msg").style.display="";
                    for(i=0;i<dexBoost.length;i++)
                        {
                            dexBoost[i].style.border="2px solid red";
                        }
                }
            if(totalWillBoost>maxMentStatBoost/100)
                {
                    document.getElementById("statCap-error-msg").style.display="";
                    for(i=0;i<willBoost.length;i++)
                        {
                            willBoost[i].style.border="2px solid red";
                        }
                }
            */
    
    
            if(totalStanceBoost>maxStanceBoost/100)
                {
                    document.getElementById("stanceCap-error-msg").style.display="";
                    for(i=0;i<stanceBoost.length;i++)
                        {
                            stanceBoost[i].style.border="2px solid red";
                        }
                }
            if(totalBoost>maxTotalBoost/100)
                {
                    document.getElementById("maxStatCap-error-msg").style.display="";
                    for(i=0;i<TempBoosts.length;i++)
                        {
                            TempBoosts[i].style.border="2px solid red";
                        }
                }
            if(otherstamBoost>0) totalFlatBoost+=otherstamBoost;
            if(otherstrBoost>0) totalFlatBoost+=otherstrBoost;
            if(otherspdBoost>0) totalFlatBoost+=otherspdBoost;
            if(otherdexBoost>0) totalFlatBoost+=otherdexBoost;
            if(otherwillBoost>0) totalFlatBoost+=otherwillBoost;
    
            if(totalFlatBoost>maxTotalFlatBoost)
                {
                    document.getElementById("flatCap-error-msg").style.display=""
                    for(i=0;i<FlatBoosts.length;i++)
                        {
                            FlatBoosts[i].style.border="2px solid red";
                        }
                }
    
            if(stancestamBoost)
                {
                    stancestamLoss=0;
                    document.getElementById("stamStancesLossIPF").value=stancestamLoss;
                    document.getElementById("stamStancesLossIPF").disabled=true;
                }
            if(stancestrBoost)
                {
                    stancestrLoss=0;
                    document.getElementById("strStancesLossIPF").value=stancestrLoss;
                    document.getElementById("strStancesLossIPF").disabled=true;
                }
            if(stancespdBoost)
                {
                    stancespdLoss=0;
                    document.getElementById("spdStancesLossIPF").value=stancespdLoss;
                    document.getElementById("spdStancesLossIPF").disabled=true;
                }
            if(stancedexBoost)
                {
                    stancedexLoss=0;
                    document.getElementById("dexStancesLossIPF").value=stancedexLoss;
                    document.getElementById("dexStancesLossIPF").disabled=true;
                }
            if(stancewillBoost)
                {
                    stancewillLoss=0;
                    document.getElementById("willStancesLossIPF").value=stancewillLoss;
                    document.getElementById("willStancesLossIPF").disabled=true;
                }
            
    
            //totalFlatStanceBoost=basestam*stancestamBoost/100+basestr*stancestrBoost/100+basespd*stancespdBoost/100+basedex*stancedexBoost/100+basewill*stancewillBoost/100; Uncomment this if using boosts based off individual stats
            totalFlatStanceBoost=basetotal*totalStanceBoost;
            properFlatStanceLoss=totalFlatStanceBoost*(100-statLossReduction)/100;
            actualFlatStanceLoss=stancestamLoss+stancestrLoss+stancespdLoss+stancedexLoss+stancewillLoss;
            document.getElementById("totalStancesLossF").value=Math.round(properFlatStanceLoss-actualFlatStanceLoss);
            
       if(document.getElementById("totalStancesLossF").value!=0)
                {
                    document.getElementById("stanceLoss-error-msg").style.display="";
                    for(i=0;i<stanceLoss.length;i++)
                        {
                            stanceLoss[i].style.border="2px solid red";
                        }
                } //Check to see if the flat stat reduction from the stance is proper
            
            /*
            racebasestam=check(basestam*(1+racestam/100),maxBaseStatAmt);
            racebasestr=check(basestr*(1+racestr/100),maxBaseStatAmt);
            racebasespd=check(basespd*(1+racespd/100),maxBaseStatAmt);
            racebasedex=check(basedex*(1+racedex/100),maxBaseStatAmt);
            racebasewill=check(basewill*(1+racewill/100),maxBaseStatAmt);
            errorFlag=false; //ignore error for these
    
            */ //Removed 500 Cap for Racial Boosts
            /*if(racebasestam>maxBaseStatAmt)
                {
                    racebasestam=maxBaseStatAmt;
                }
            if(racebasestr>maxBaseStatAmt)
                {
                    racebasestr=maxBaseStatAmt;
                }
            if(racebasespd>maxBaseStatAmt)
                {
                    racebasespd=maxBaseStatAmt;
                }
            if(racebasedex>maxBaseStatAmt)
                {
                    racebasedex=maxBaseStatAmt;
                }
            if(racebasewill>maxBaseStatAmt)
                {
                    racebasewill=maxBaseStatAmt;
                }*/
    
            //finalstam=Math.round(check(check(check(check(racebasestam,maxBoostPhysStatAmt)+(basestam*totalStamBoost),maxBoostPhysStatAmt)+otherstamBoost,maxBoostPhysStatAmt)-stancestamLoss,maxBoostPhysStatAmt));
            //Old System with 500 Cap on Racials
            //finalstam=Math.round(check(check(check(basestam*(1+totalStamBoost),maxBoostPhysStatAmt)+otherstamBoost,maxBoostPhysStatAmt)-stancestamLoss,maxBoostPhysStatAmt));
            //Semi-Old System with Boosts based on Individual Stats
            finalstam=Math.round(check(check(check(basestam+basetotal*(totalStamBoost),maxBoostPhysStatAmt)+otherstamBoost,maxBoostPhysStatAmt)-stancestamLoss,maxBoostPhysStatAmt));
            if(errorFlag)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    document.getElementById("new-stam").style.color="yellow";
                    errorFlag=false;
                }
    
            //finalstr=Math.round(check(check(check(check(racebasestr,maxBoostPhysStatAmt)+(basestr*totalStrBoost),maxBoostPhysStatAmt)+otherstrBoost,maxBoostPhysStatAmt)-stancestrLoss,maxBoostPhysStatAmt))
            //finalstr=Math.round(check(check(check(basestr*(1+totalStrBoost),maxBoostPhysStatAmt)+otherstrBoost,maxBoostPhysStatAmt)-stancestrLoss,maxBoostPhysStatAmt));
            finalstr=Math.round(check(check(check(basestr+basetotal*(totalStrBoost),maxBoostPhysStatAmt)+otherstrBoost,maxBoostPhysStatAmt)-stancestrLoss,maxBoostPhysStatAmt));
            if(errorFlag)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    document.getElementById("new-str").style.color="yellow";
                    errorFlag=false;
                }
            //finalspd=Math.round(check(check(check(check(racebasespd,maxBoostPhysStatAmt)+(basespd*totalSpdBoost),maxBoostPhysStatAmt)+otherspdBoost,maxBoostPhysStatAmt)-stancespdLoss,maxBoostPhysStatAmt))
            //finalspd=Math.round(check(check(check(basespd*(1+totalSpdBoost),maxBoostPhysStatAmt)+otherspdBoost,maxBoostPhysStatAmt)-stancespdLoss,maxBoostPhysStatAmt));
            finalspd=Math.round(check(check(check(basespd+basetotal*(totalSpdBoost),maxBoostPhysStatAmt)+otherspdBoost,maxBoostPhysStatAmt)-stancespdLoss,maxBoostPhysStatAmt));
            if(errorFlag)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    document.getElementById("new-spd").style.color="yellow";
                    errorFlag=false;
                }
            //finaldex=Math.round(check(check(check(check(racebasedex,maxBoostMentStatAmt)+(basedex*totalDexBoost),maxBoostMentStatAmt)+otherdexBoost,maxBoostMentStatAmt)-stancedexLoss,maxBoostMentStatAmt))
            //finaldex=Math.round(check(check(check(basedex*(1+totalDexBoost),maxBoostPhysStatAmt)+otherdexBoost,maxBoostPhysStatAmt)-stancedexLoss,maxBoostPhysStatAmt));
            finaldex=Math.round(check(check(check(basedex+basetotal*(totalDexBoost),maxBoostPhysStatAmt)+otherdexBoost,maxBoostPhysStatAmt)-stancedexLoss,maxBoostPhysStatAmt));
            if(errorFlag)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    document.getElementById("new-dex").style.color="yellow";
                    errorFlag=false;
                }
            //finalwill=Math.round(check(check(check(check(racebasewill,maxBoostMentStatAmt)+(basewill*totalWillBoost),maxBoostMentStatAmt)+otherwillBoost,maxBoostMentStatAmt)-stancewillLoss,maxBoostMentStatAmt))
            //finalwill=Math.round(check(check(check(basewill*(1+totalWillBoost),maxBoostPhysStatAmt)+otherwillBoost,maxBoostPhysStatAmt)-stancewillLoss,maxBoostPhysStatAmt));
            finalwill=Math.round(check(check(check(basewill+basetotal*(totalWillBoost),maxBoostPhysStatAmt)+otherwillBoost,maxBoostPhysStatAmt)-stancewillLoss,maxBoostPhysStatAmt));
            if(errorFlag)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    document.getElementById("new-will").style.color="yellow";
                    errorFlag=false;
                }
    
            /*finalstam=Math.round(racebasestam+basestam*totalStamBoost-stancestamLoss+otherstamBoost);
            finalstr=Math.round(racebasestr+basestr*totalStrBoost-stancestrLoss+otherstrBoost);
            finalspd=Math.round(racebasespd+basespd*totalSpdBoost-stancespdLoss+otherspdBoost);
            finaldex=Math.round(racebasedex+basedex*totalDexBoost-stancedexLoss+otherdexBoost);
            finalwill=Math.round(racebasewill+basewill*totalWillBoost-stancewillLoss+otherwillBoost);
    
            if(finalstam>maxBoostPhysStatAmt)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    finalstam=maxBoostPhysStatAmt;
                    document.getElementById("new-stam").style.color="yellow";
                }
            if(finalstr>maxBoostPhysStatAmt)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    finalstr=maxBoostPhysStatAmt;
                    document.getElementById("new-str").style.color="yellow";
                }
            if(finalspd>maxBoostPhysStatAmt)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    finalspd=maxBoostPhysStatAmt;
                    document.getElementById("new-spd").style.color="yellow";
                }
            if(finaldex>maxBoostMentStatAmt)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    finaldex=maxBoostMentStatAmt;
                    document.getElementById("new-dex").style.color="yellow";
                }
            if(finalwill>maxBoostMentStatAmt)
                {
                    document.getElementById("statCap-warn-msg").style.display="";
                    finalwill=maxBoostMentStatAmt;
                    document.getElementById("new-will").style.color="yellow";
                }*/        
            finaltotal=finalstam+finalstr+finalspd+finaldex+finalwill;
            
            document.getElementById("new-stam").textContent=finalstam;
            document.getElementById("new-str").textContent=finalstr;
            document.getElementById("new-spd").textContent=finalspd;
            document.getElementById("new-dex").textContent=finaldex;
            document.getElementById("new-will").textContent=finalwill;
            document.getElementById("new-total-stats").textContent=finaltotal;
        
}
function check(value,Max)
{
    if(value>Max)
        {
            errorFlag=true;
            return Max;
        }
    else return value;
}