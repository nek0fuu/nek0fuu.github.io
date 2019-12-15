var ipfields=document.getElementsByClassName("IP");
var errors=document.getElementsByClassName("error-msg");
/*var dia=500;  135 30
var tit=365;    105 25
var ste=260;    80  20
var iro=180;    60  15
var bro=120     45  10
var sto=75;     35  10
var bon=40;     25  10
var woo=15;   15*/
var thr5=500,thr5s=325,thr5o=125;
var thr4=400,thr4s=260,thr4o=100;
var thr3=300,thr3s=195,thr3o=75;
var thr2=200,thr2s=130,thr2o=50;
var thr1=100,thr1s=65,thr1o=25;
var attPow;

window.onload=function(){
    calculateAttack();
    //calculateDefense();
    for(var i=0;i<ipfields.length;i++)
        {
            ipfields[i].addEventListener("change",calculateAttack);
            //ipfields[i].addEventListener("change",calculateDefense);
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
    var SpecBoost=document.getElementById("attspecBoost").valueAsNumber;
    var HakiSpecBoost=document.getElementById("atthakispecBoost").valueAsNumber;
    var meitoGrade=document.getElementById("attbladeGrade").value;
    var PowCheck=document.getElementById("attPowCheck").checked;
    var DFCheck=document.getElementById("attDFCheck").checked;
    var UACheck=document.getElementById("attUACheck").checked;
    var NACheck=document.getElementById("attNACheck").checked;
    var attackPower,attackMult,i,lowest=9999;
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
            case "IW1":attackMult=.35;break;
            case "IW2":attackMult=.45;break;
            case "IW3":attackMult=.55;break;
            case "IW4":attackMult=.65;break;
            case "IW5":attackMult=.75;break;
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
            case "RG8":attackMult=1.25;break;
            case "RG9":attackMult=1.4;break;
            case "RGS":attackMult=1.4+SpecBoost/100;break;
                
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
    attackPower=(strFactor*basestr+spdFactor*basespd+dexFactor*basedex+willFactor*basewill)*attackMult;
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


/*<ul id="posts-inputs-list">
                <h2 class="col-headers">Defender</h2>
                <!--<li>
                    <label class="statIPL">Total HP</label>
                    <input type="number" class="statIPF IP" id="defthpIPF" value="50" min="35" max="3250">
                </li>
                <li>
                    <label class="statIPL">Current HP</label>
                    <input type="number" class="statIPF IP" id="defchpIPF" value="50" min="35" max="3250">
                </li><br><br>-->
                <li>
                    <label class="statIPL">Stamina</label>
                    <input type="number" class="statIPF waveReq IP" id="defstmIPF" value="10" min="7" max="650">
                </li>
                <li>
                    <label class="statIPL">Will</label>
                    <input type="number" class="statIPF slashReq IP" id="defwillIPF" value="10" min="7" max="650">
                </li>
                <!--<li>
                    <label class="statIPL">Total Stats</label>
                    <input type="number" class="statIPF slashReq IP" id="totalIPF" value="50" min="50" max="2500">
                </li>--><br>
                </ul>
            <ul id="posts-inputs-list">
                <!--<li>
                    <label class="statIPL">Hardness 2</label>
                    <input type="number" class="statIPF slashReq IP" id="defhard2IPF" value="0" max="650">
                </li>
                <li>
                    <label class="AttackIPL">Haki</label>
                    <select class="HakiIPF IP" id="defHakiLevel2">
                        <option value="NA">None</option>
                        <option value="HC1">Haki Coating 1</option>
                        <option value="HC2">Haki Coating 2</option>
                        <option value="HC3">Haki Coating 3</option>
                    </select>
                </li>-->
                <li>
                    <label class="AttackIPL">Tekkai</label>
                    <select class="AttackIPF IP" id="deftekkaiLevel">
                        <option value="NA">None</option>
                        <option value="TK1">Tekkai Level 1</option>
                        <option value="TK2">Tekkai Level 2</option>
                        <option value="TK3">Tekkai Level 3</option>
                        <option value="TKS">Tekkai Specialization</option>
                    </select>
                </li>
                <li>
                    <label class="AttackIPL">Haki</label>
                    <select class="HakiIPF IP" id="defHakiLevel">
                        <option value="NA">None</option>
                        <option value="HC1">Haki Coating 1</option>
                        <option value="HC2">Haki Coating 2</option>
                        <option value="HC3">Haki Coating 3</option>
                        <option value="HCS">Haki Specialization</option>
                    </select>
                </li><br><br>
                <li>
                    <label class="statIPL">Tekkai Specialization</label>
                    <input type="number" class="SlashIPF IP" id="defTekkaiSpecBoost" value="0" min="0" max="25">
                </li>
                <li>
                    <label class="statIPL">Haki Specialzation</label>
                    <input type="number" class="SlashIPF IP" id="defHakiSpecBoost" value="0" min="0" max="25">
                </li><br><br>
                <li>
                    <label class="statIPL">Armor Hardness</label>
                    <input type="number" class="statIPF waveReq IP" id="defarmIPF" value="0" max="650">
                </li>
                <li>
                    <label class="AttackIPL">Armor Perk</label>
                    <select class="HakiIPF IP" id="defArmorPerkLevel">
                        <option value="AP0">Armour Perk 0</option>
                        <option value="AP1">Armour Perk 1</option>
                        <option value="AP2">Armour Perk 2</option>
                        <option value="AP3">Armour Perk 3</option>
                        <option value="AP4">Armour Perk 4</option>
                    </select>
                </li>
                <!--<li>
                    <label class="SlashIPL">Blood Lust</label>
                    <input type="checkbox" class="SlashIPF IP" id="defBloodLust" name="BloodLust" value="BloodLust">
                </li>
                <br><br>-->                         
            </ul>
            
            <!--<p id="query-msg">Query Status: <span id="query-status">Idle</span></p>

            <button id="fetch-btn">Fetch Comments</button>
            
            <p id="fetch-error-msg" class="error-msg"></p>

            <button id="remove-btn">Filter Removed Comments</button> 

            <p id="remove-error-msg" class="error-msg"></p>-->

            <!-- Stat Calculations -->
            <!--
            <ul id="calcs-list">
                <li>
                    <p class="word-count"><span id="word-count">0</span> words counted</p>
                </li>

                <li>
                    <p class="comment-count"><span id="comment-count">0</span> comments loaded</p>
                </li>

                <li>
                    <p class="words-per-comment">Average of <span id="words-per-comment">0</span> words per comment</p>
                </li>
            </ul>
            -->

            <!-- Stat Calculation Inputs -->
            <!--<ul id="calcs-inputs-list">
                <li>
                    <label class="current-stats-total">Current Stats</label>
                    <input type="number" class="current-stats" id="current-stats" value="50" autocomplete="off">
                </li>

                <li>
                    <label class="base-level">Base Level</label>
                    <select id="base-level" autocomplete="off">
                        <option value="base_0">0</option>
                        <option value="base_1">1</option>
                        <option value="base_2" selected="selected">2</option>
                        <option value="base_3">3</option>
                        <option value="base_4">4</option>
                        <option value="base_5">5</option>
                        <option value="base_6">6</option>
                        <option value="base_7">7</option>
                        <option value="base_8">8</option>
                        <option value="base_9">9</option>
                    </select>
                </li>

                <li>
                    <label class="max-stats-total">Max Stats (<span id="max-stats-label-new">0</span>)</label>
                    <input type="number" class="max-stats" id="max-stats" value="751" autocomplete="off">
                </li>
            </ul>-->

            <!-- Results -->
            <ul id="results-list">
                <li>
                    <p>
                        <strong>Reduction</strong>
                        <span class="power" id="totMit"><strong>0</strong></span>
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Hardness</strong>
                        <span class="power" id="IntMit"><strong>0</strong></span>
                    </p>
                </li>
                
            </ul>
            */