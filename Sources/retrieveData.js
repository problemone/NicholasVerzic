let projectData = null;
let currProjectNum = 1;
const bodyElement = document.querySelector("body");
const backgroundElement = document.querySelector(".background");
const backgroundTravelling = document.querySelector(".backgroundTravelling");
const backgroundMinColor = [85, 83, 76];
const colorScale = 120;
let percScroll = 0;
let targetColor = backgroundMinColor;

function retProjectInfo(projectNum){
    let position = null;
    let company = null;

    let specificProject = projectData.split('\n')[projectNum - 1];
    company = specificProject.split(',')[1];
    position = specificProject.split(',')[0];
    
    return position + ";" + company;
}

function selectProject(projectNum){
    currProjectNum = projectNum;
    document.querySelector("#content").scrollIntoView({behavior: "smooth", block: "start", inline: "center"});
}

function scrollToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function initializeWebsite(){
    // Set window to top
    window.scrollTo(0, 0);

    // Hide scrollbar if window is at the top
    window.addEventListener('scroll', () => {
        percScroll = Math.min(window.scrollY/window.innerHeight, 1);
        if (window.scrollY == 0) {
            document.querySelector(".Btn").style.visibility = "hidden";
            bodyElement.style.overflowY = "hidden";
        } else {
            document.querySelector(".Btn").style.visibility = "visible";
            bodyElement.style.overflowY = "visible";
        }
        
        let fadeInElements = document.getElementsByClassName('fadeIn');
        let relScreenPos = 0;

        for(let i = 0; i < fadeInElements.length; i++){
            relScreenPos = Math.max(0, Math.min((fadeInElements[i].offsetTop - window.scrollY)/(fadeInElements[i].offsetTop - (window.scrollY + window.innerHeight)), 1));
            console.log("FadeInElementPosition: " + relScreenPos);
            fadeInElements[i].style.opacity = relScreenPos;
        }

        targetColor = [percScroll * colorScale + backgroundMinColor[0], percScroll * colorScale + backgroundMinColor[1], percScroll * colorScale + backgroundMinColor[2]]
        backgroundElement.style.backgroundColor = "rgb(" + targetColor[0] + "," + targetColor[1] + "," + targetColor[2] + ")";
        backgroundTravelling.style.backgroundColor = "rgb(" + targetColor[0] + "," + targetColor[1] + "," + targetColor[2] + ")";
    });

    // Retrieve s3 bucket file with project info
    const config = {
        "apiEndpoint": "https://sdr9a8oax0.execute-api.us-east-2.amazonaws.com/dev/nicholasverzicwebsiteprojects/websiteProjects.csv"
    };

    try{
        (async function(){
            projectData = await fetch(config["apiEndpoint"])
            .then(function(response) {
                return response.text();
            }).then(function(data) {
                return data;
            });
            console.log("Retrieved project data!");
        })();
    } catch(e){
        console.log("Retrieval Error: " + e);
    }
}

initializeWebsite();
