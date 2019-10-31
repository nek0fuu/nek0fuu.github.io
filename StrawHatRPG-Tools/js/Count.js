// Elements
// Countdown Timer
let timerLabel = document.getElementById('timer-label');
let timerCounter = document.getElementById('timer-counter');
// Posts collector inputs
let username = document.getElementById('username');
let subreddit = document.getElementById('subreddit');
let startDate = document.getElementById('start-date');
let endDate = document.getElementById('end-date');
// Query Status
let queryStatus = document.getElementById('query-status');
// Fetch Button
let fetchBtn = document.getElementById('fetch-btn');
// Fetch error message
let fetchErrorMsg = document.getElementById('fetch-error-msg');
// Remove Button
let removeBtn = document.getElementById('remove-btn');
// Remove error message
let removeErrorMsg = document.getElementById('remove-error-msg');
// Small Calculations
//let wordCount = document.getElementById('word-count');
//let commentCount = document.getElementById('comment-count');
//let wordsPerComment = document.getElementById('words-per-comment');
// Stat Calculation Inputs
let currentStats = document.getElementById('current-stats');
let baseLevel = document.getElementById('base-level');
let maxStatsLabelNew = document.getElementById('max-stats-label-new');
let maxStats = document.getElementById('max-stats');
// Results
let score = document.getElementById('score');
let manualScore = document.getElementById('manual-score');
let earnedStats = document.getElementById('earned-stats');
let earnedSplit = document.getElementById('earned-split');
let newStats = document.getElementById('new-stats');
// Calculate Button
let calcBtn = document.getElementById('calc-btn');
// Max Error Message
let maxErrorMsg = document.getElementById('max-error-msg');
// Stats Error Message
let statsErrorMsg = document.getElementById('stats-error-msg');
// Username Header
let usernameHeader = document.getElementById('username-header');
// Posts Column
let postsCol = document.getElementById('posts-col');
//Participants Column
let partCol = document.getElementById('participant-col');
// Global Variables
const QUERY_LIMIT = 50;
let processingComments = false;
let filteringComments = false;
let filterIndex = 0;
let tempWordCount = 0;
let tempCommentCount = 0;
let commentsLoaded = 0;
let commentsRemoved = false;
let posts = [];
let sans={"NPC-senpai":1,"NPC-san":2,"Rewards-san":3,"Stats-san":4,"Shoppe-san":5,"DavyJones-san":6,"Newscoo-san":7};
    
calcBtn.addEventListener('click', () => {
    checkThread(document.getElementById("Link").value);
});
let thread = {}
let fakeElement = document.createElement('p');
// Take a link to a thread and count the number of words total in the thread    
function checkThread(link) {
    calcBtn.disabled=true;
    thread = {
        link: "",
        words: 0,
        comments: 0,
        participants: {},
        posts: []
    }
    thread.link = link + ".json";
    
    query(thread.link, fakeElement, fakeElement, processThread);
}
function query(url = '', btnElement, errorMsgElement, callback) {
    errorMsgElement.classList.remove('show');

    let request = new XMLHttpRequest();
    
    request.ontimeout = () => {
        logError(errorMsgElement, `Error - Timed Out while Querying`);
        btnElement.disabled = false;
        return false;
    };

    request.open('GET', url);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.timeout = 5000;

    request.send();

    request.onreadystatechange = function() {
        if (request.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(request.response);
            //console.log(request);
            if (response.error) {
                logError(errorMsgElement, `Error Querying - ${response.error}: ${response.message}`);
                btnElement.disabled = false;
                return false;
            }
            //console.log(response.data.children);
            if (request.status === 200) {
                //console.log(response.data);
                // Call the Callback and send in the response data
                callback(response);
            }
        }
    }

    return true;
}


function processThread(response) {
    let comment = response[1].data.children[0].data;

    let post = {};
    post.html = document.createElement('div');
    post.html.innerHTML = decodeHTML(comment.body_html);
    post.author = comment.author;
    thread.posts.push(post);

    thread.comments++;
    
    if (comment.replies !== "") {
        let url = "https://api.reddit.com" + comment.replies.data.children[0].data.permalink + ".json";
        query(url, fakeElement, fakeElement, processThread);
    } else {
        countThread();
    }
    
}
function countThread() {
    // Iterate through each comment from thread object and get word count
    
    for (let i in thread.posts) {
        let commentElements = Array.from(thread.posts[i].html.children[0].children);
        let author = thread.posts[i].author;
        for (let element in commentElements) {
            
            // Check each element and only count the words within
            // the element if it isn't a blockquote, table, or list
            if (commentElements[element].tagName.toLowerCase() != 'blockquote' &&
                commentElements[element].tagName.toLowerCase() != 'table' &&
                commentElements[element].tagName.toLowerCase() != 'code' &&
                commentElements[element].tagName.toLowerCase() != 'ul' &&
                commentElements[element].tagName.toLowerCase() != 'ol')
            {
                let tempWords = countWords(commentElements[element].textContent);
                thread.words += tempWords;
                
                if (author in thread.participants) {
                    thread.participants[author].words += tempWords;
                } else {
                    thread.participants[author] = {};
                    thread.participants[author].name = author;
                    thread.participants[author].words = tempWords;
                    thread.participants[author].comments = 0;

                }
            }
        }
        thread.participants[author].comments += 1;
    }
    
    console.log("Thread processed!");
    display();
}
function countWords(str) {
    // Use regular expression to replace things we don't want
    // counted as words with empty spaces, then extract all non-whitespace sequences
    str = str.replace(/[.,?!()<>{}[\]/\\+=~'`|:;_-]/g, '');
    str = str.replace(/-/g, ' ');
    let exp = /\S+/ig;
    let tmp, words = 0;
    while ((tmp = exp.exec(str)) != null) {
        words++;
    }

    return words;
}

function logError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}
function decodeHTML(html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
function display() {
    // Delete all comments from webpage to make room for the new ones
    while (postsCol.lastChild.id !== 'posts-col-header') {
        postsCol.removeChild(postsCol.lastChild);
    }
    // Iterate through posts array
    for (i in thread.posts) {
        let commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        let commentTitle = document.createElement('h3');
        commentTitle.classList.add('comment-title');
        commentTitle.innerHTML = `Posted by: <a href="https://www.reddit.com/user/${thread.posts[i].author}">${thread.posts[i].author}</a>`;
        commentDiv.appendChild(commentTitle);


        let commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        commentBody.innerHTML = decodeHTML(thread.posts[i].html.innerHTML);
        commentDiv.appendChild(commentBody);

        postsCol.appendChild(commentDiv);
    }

    // Delete all Participants from webpage to make room for the new ones
    while (partCol.lastChild.id !== 'participants-header') {
        partCol.removeChild(partCol.lastChild);
    }
    // Iterate through Participants
    for(i in thread.participants) {
        let participantDiv = document.createElement('div');
        participantDiv.classList.add('participant');

        let linebreak1=document.createElement("BR");
        let linebreak2=document.createElement("BR");
        let participantName = document.createElement('h3');
        participantName.classList.add('participant-name');
        participantName.innerHTML=`Participant`;
        participantName.innerHTML = `<a href="https://www.reddit.com/user/${thread.participants[i].name}">${thread.participants[i].name}: `;
        participantDiv.appendChild(participantName);
        
        let participantWordCount = document.createElement('input');
        participantWordCount.setAttribute('type','number');
        participantWordCount.classList.add('participant-word-count');
        participantWordCount.setAttribute('disabled','false');
        participantWordCount.setAttribute('value',thread.participants[i].words);
        let participantWordCountLabel = document.createElement('label');
        participantWordCountLabel.innerHTML=`Words`;
        participantDiv.appendChild(participantWordCount);
        participantDiv.appendChild(participantWordCountLabel)
        participantDiv.appendChild(linebreak1);

        let participantCommentCount = document.createElement('input');
        participantCommentCount.setAttribute('type','number');
        participantCommentCount.classList.add('participant-comment-count');
        participantCommentCount.setAttribute('disabled','false');
        participantCommentCount.setAttribute('value',thread.participants[i].comments);
        let participantCommentCountLabel = document.createElement('label');
        participantCommentCountLabel.innerHTML=`Comments`;
        participantDiv.appendChild(participantCommentCount);
        participantDiv.appendChild(participantCommentCountLabel);
        participantDiv.appendChild(linebreak2);

        
        let participantCheck = document.createElement('input');
        participantCheck.classList.add('participant-checkbox')
        participantCheck.setAttribute('type','checkbox');
        if(thread.participants[i].name in sans)
        {participantCheck.setAttribute('unchecked','true');}
        else
            {
                participantCheck.setAttribute('checked','true');
            }
        participantCheck.addEventListener('change', () => {
    displayResults();;
});
        participantDiv.appendChild(participantCheck);
        
        partCol.appendChild(participantDiv);
    }
    displayResults();
}
function displayResults() {
    calcBtn.disabled=true;
    let totalWC=0
    let parArray=document.getElementsByClassName("participant"); //Array of All Participants
    for (i=0;i<parArray.length;i++)
        {
            if(parArray[i].getElementsByClassName("participant-checkbox")[0].checked==true)
                {
                    totalWC+=parArray[i].getElementsByClassName("participant-word-count")[0].valueAsNumber;                
                }
        }
    newStats.textContent=totalWC;
    calcBtn.disabled=false;
}


