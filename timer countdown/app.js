const topSections  = document.querySelectorAll('.top');
const container = document.getElementById('container');
const iconTags = document.querySelectorAll('i');
let clockInterval; // To manage the clock interval
let clockDiv = null; 
let timeDiv = null;

// alarm
let alarmCount = 0; // Counter to track the number of alarms set
const maxAlarms = 5;

// stop-watch
let count = 0;
let hr = 0;
let min = 0;
let second = 0;
let stopWatchTimer = false;
let intervalId;



topSections.forEach(topSection=>{
    topSection.addEventListener('click',(e)=>{
        let icon = e.currentTarget.firstElementChild
        iconStyle(icon);
        if(e.currentTarget.classList.contains('clock')){
            removeChildren();           
            clockDiv = document.createElement('div'); 
            timeDiv = document.createElement('div');
            container.appendChild(clockDiv);
            container.appendChild(timeDiv);

            startClock(clockDiv);
            date(timeDiv);

        }else if (e.currentTarget.classList.contains('alarm')){
            removeChildren();

            let topDiv = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerText = 'Set Alarm';
            let plusIcon = document.createElement('i');
            plusIcon.className = 'hgi-stroke hgi-add-01';
        
            topDiv.appendChild(h2);
            topDiv.appendChild(plusIcon);
            container.appendChild(topDiv);

            DateTimeStyle(topDiv); 
           

            plusIcon.addEventListener('click',()=>{

                if (alarmCount >= maxAlarms) {
                    alert("You can only set up to 5 alarms.");
                    return; 
                }

                let createAlarm = document.createElement('div');
                let alarmInput = document.createElement('input');
                alarmInput.type = 'time';
                const setAlarmBtn = document.createElement('button');
                setAlarmBtn.innerText = 'set';
                setAlarmBtn.style.marginLeft = '10px';
                DateTimeStyle(createAlarm);
                createAlarm.appendChild(alarmInput);
                createAlarm.appendChild(setAlarmBtn);
                container.appendChild(createAlarm);

                // display alarm
                setAlarmBtn.addEventListener('click',()=>{
                    let alarmTime ;
                    alarmTime  = alarmInput.value;

                     if (!alarmTime) {
                            alarmInput.focus();
                            return;
                        }
                    container.removeChild(createAlarm);   
                    let [hr, min] = alarmTime.split(':');
                    let am_pm = 'AM';
                    if(hr>12){
                        hr -= 12;
                        am_pm = 'PM';
                        }else if(hr==0){
                            hr = 12;
                            am_pm = 'AM';
                        }
                
                
                    let displayAlarmDiv = document.createElement('div');
                    let displayAlarmTime = document.createElement('div');
                
                    let switchLabel = document.createElement('label')
                    let alarmOnOff = document.createElement('input');
                    let sliderRound =document.createElement('span');
                
                    switchLabel.className = 'switch';
                
                    alarmOnOff.type = 'checkbox';
                    alarmOnOff.checked = true; 
                
                    sliderRound.className='slider round';                    
                
                    displayAlarmTime.innerText =`${hr}:${min} ${am_pm}`;
                
                    switchLabel.appendChild(alarmOnOff);
                    switchLabel.appendChild(sliderRound);
                
                    displayAlarmDiv.appendChild(displayAlarmTime);
                    displayAlarmDiv.appendChild(switchLabel);
                    
                    displayAlarmDiv.style.fontSize = '2rem';
                    displayAlarmDiv.style.display = 'flex';
                    displayAlarmDiv.style.justifyContent ='space-around';
                    displayAlarmDiv.style.margin ="5px 0 5px 0";
                    container.appendChild(displayAlarmDiv);
                    
                    let alarmTimeInSeconds = (parseInt(hr) % 12) * 3600 + (parseInt(min) % 60) * 60; // Convert alarm time to seconds

                    // Convert alarm time from 12-hour to 24-hour format for correct comparison
                    if (am_pm === 'PM' && parseInt(hr) !== 12) {
                        alarmTimeInSeconds += 12 * 3600; // Add 12 hours for PM times
                    } else if (am_pm === 'AM' && parseInt(hr) === 12) {
                        alarmTimeInSeconds -= 12 * 3600; // Subtract 12 hours for 12:00 AM case
                    }

                    // Set the interval to check the time every second
                    setInterval(() => {
                        let currentTime = new Date();
                        let currentTimeInSeconds = (currentTime.getHours() * 3600) + (currentTime.getMinutes() * 60) + currentTime.getSeconds();

                        // Check if the current time matches the alarm time and if the alarm is on
                        if (currentTimeInSeconds === alarmTimeInSeconds && alarmOnOff.checked) {
                            playSound(); // Play sound when the alarm time is reached
                        }
                    }, 1000);
                                    
                });
            });

        }else if(e.currentTarget.classList.contains('stop-watch')){
            removeChildren();

            let topDiv = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerText = 'Stop Watch';
            topDiv.appendChild(h2);
            container.appendChild(topDiv);
            DateTimeStyle(topDiv); 

            let contentDiv = document.createElement('div');
            let stopWatchDiv = document.createElement('div');
            stopWatchDiv.innerText = '00:00:00';
            contentDiv.appendChild(stopWatchDiv);
            container.appendChild(contentDiv);
            DateTimeStyle(contentDiv);

            let bottomDiv = document.createElement('div');
            let playBtn = document.createElement('i');
            let pauseBtn = document.createElement('i');
            let resetBtn = document.createElement('i');

            playBtn.className = "hgi-stroke hgi-play";
            pauseBtn.className ='hgi-stroke hgi-pause';
            resetBtn.className ='hgi-stroke hgi-stop';

            bottomDiv.appendChild(playBtn);
            bottomDiv.appendChild(pauseBtn);
            bottomDiv.appendChild(resetBtn);
            container.appendChild(bottomDiv);
            DateTimeStyle(bottomDiv);


            playBtn.addEventListener('click',()=>{
                if(!stopWatchTimer){
                    stopWatchTimer = true;
                    stopWatch(stopWatchDiv);
                }
            });
            pauseBtn.addEventListener('click',()=>{
                stopWatchTimer = false;
                clearInterval(intervalId);
            });
            resetBtn.addEventListener('click',()=>{
                stopWatchTimer = false;
                clearInterval(intervalId);
                count = 0;
                hr = 0;
                min = 0;
                second = 0;
                stopWatchDiv.innerText = '00:00:00';
            });

        }else if(e.currentTarget.classList.contains('timer')){
            removeChildren();
            let topDiv = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerText = 'Timer';
            topDiv.appendChild(h2);
            container.appendChild(topDiv);
            DateTimeStyle(topDiv); 

            let contentDiv = document.createElement('div');
            let hrInput = document.createElement('input');
            let minInput = document.createElement('input');
            let secInput = document.createElement('input');

            hrInput.type = 'number';
            hrInput.setAttribute('min','0');
            hrInput.setAttribute('max','23');
            hrInput.value = '0';

            minInput.type = 'number';
            minInput.setAttribute('min','0');
            minInput.setAttribute('max','59');
            minInput.value = '0';


            secInput.type = 'number';
            secInput.setAttribute('min','0');
            secInput.setAttribute('max','59');
            secInput.value = '0';

           

            contentDiv.appendChild(hrInput);
            contentDiv.appendChild(minInput);
            contentDiv.appendChild(secInput);
            container.appendChild(contentDiv);

            DateTimeStyle(contentDiv);

            let bottomDiv = document.createElement('div');
            let playBtn = document.createElement('i');
            let pauseBtn = document.createElement('i');
            let resetBtn = document.createElement('i');

            playBtn.className = "hgi-stroke hgi-play";
            pauseBtn.className ='hgi-stroke hgi-pause';
            resetBtn.className ='hgi-stroke hgi-stop';

            bottomDiv.appendChild(playBtn);
            bottomDiv.appendChild(pauseBtn);
            bottomDiv.appendChild(resetBtn);
            container.appendChild(bottomDiv);
            DateTimeStyle(bottomDiv);

           // Timer variables
            let timerInterval = null;
            let totalSeconds = 0;
            let isPaused = false;

            playBtn.addEventListener('click', () => {
                if (timerInterval && isPaused) {
                    isPaused = false; // Resume the timer
                    timerInterval = setInterval(updateTimer, 1000); // Restart the countdown
                    return;
                } 
        
                let hours = parseInt(hrInput.value) || 0;
                let minutes = parseInt(minInput.value) || 0;
                let seconds = parseInt(secInput.value) || 0;
        
                totalSeconds = hours * 3600 + minutes * 60 + seconds;
        
                if (totalSeconds <= 0) {
                    alert("Please set a valid time!");
                    return;
                }
        
                hrInput.disabled = true;
                minInput.disabled = true;
                secInput.disabled = true;
        
                timerInterval = setInterval(() => {
                    if (totalSeconds <= 0) {
                        clearInterval(timerInterval);
                        timerInterval = null;
                        playSound();
                        hrInput.disabled = false;
                        minInput.disabled = false;
                        secInput.disabled = false;
                        return;
                    }
        
                    totalSeconds--;
        
                    // Calculate remaining time
                    let displayHours = Math.floor(totalSeconds / 3600);
                    let displayMinutes = Math.floor((totalSeconds % 3600) / 60);
                    let displaySeconds = totalSeconds % 60;
        
                    hrInput.value = displayHours.toString().padStart(2, '0');
                    minInput.value = displayMinutes.toString().padStart(2, '0');
                    secInput.value = displaySeconds.toString().padStart(2, '0');
                }, 1000);
            });  

             // Pause button logic
            pauseBtn.addEventListener('click', () => {
                if (timerInterval) {
                    isPaused = true; // Pause the timer
                    clearInterval(timerInterval);
                    timerInterval = null;
                }
            });
            
            
            resetBtn.addEventListener('click', () => {
                clearInterval(timerInterval);
                timerInterval = null;
                totalSeconds = 0;
        
                hrInput.value = '0';
                minInput.value = '0';
                secInput.value = '0';
        
                hrInput.disabled = false;
                minInput.disabled = false;
                secInput.disabled = false;
            });

                    // Update timer logic
            function updateTimer() {
                if (totalSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    playSound();
                    hrInput.disabled = false;
                    minInput.disabled = false;
                    secInput.disabled = false;
                    return;
                }

                totalSeconds--;

                let displayHours = Math.floor(totalSeconds / 3600);
                let displayMinutes = Math.floor((totalSeconds % 3600) / 60);
                let displaySeconds = totalSeconds % 60;

                hrInput.value = displayHours.toString().padStart(2, '0');
                minInput.value = displayMinutes.toString().padStart(2, '0');
                secInput.value = displaySeconds.toString().padStart(2, '0');
            }
            
        }
    });
});



function playSound() {
    let audio = new Audio('alarm_sound.mp3'); // Example sound URL
    audio.play();
}

function iconStyle(icon){
    iconTags.forEach(iconTag=>{
        iconTag.style.fontWeight='500';
        iconTag.style.borderBottom = 'none';
    })
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
}

// remove Div
function removeChildren(){
    clearInterval(clockInterval);
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
}


function date(timeDiv){
    const dateTime = new Date();
    const today = dateTime.toLocaleDateString("en-GB"); 
    
    timeDiv.innerText = 'Current: '+today;
    DateTimeStyle(timeDiv)
}


function startClock(clockDiv){
    clockInterval = setInterval(()=>{
        const time = new Date();
        let hr = time.getHours();
        let min = time.getMinutes();
        let sec = time.getSeconds();
        let am_pm = 'am';

        if(hr>12){
            hr = hr-12;
            am_pm = 'pm';
        }else if(hr== 0){
            hr = 12;
            am_pm = 'am';
        }

        hr = hr.toString().padStart(2,'0');
        min = min.toString().padStart(2,'0');
        sec = sec.toString().padStart(2,'0');
        
        let currentTime = hr+':'+min+':'+sec+' '+am_pm;
        
        
        clockDiv.innerText = currentTime;
    
        DateTimeStyle(clockDiv);
    },1000)

}


function DateTimeStyle(element){
    element.style.textAlign = 'center';
    element.style.marginTop = '1rem';
    element.style.fontSize = '2rem';
}



function stopWatch(stopWatchDiv){           
    intervalId = setInterval(()=>{
        count++;
        if(count==100){
            second++;
            count=0;
        }
        if(second==60){
            min++;
            second = 0;
        }
        if(min==60){
            hr++;
            min=0;
            second = 0;
        }

        let hrString = hr;
        let minString = min;
        let secondString = second;
        let countString = count;

        if(hr<10){
            hrString = '0'+hr;
        }
        if(min<10){
            minString = '0'+min;
        }
        if(second<10){
            secondString = '0'+second;
        }
        if(count<10){
            countString = '0'+count;
        }
        stopWatchDiv.innerText = hrString+':'+minString+':'+secondString+':'+countString;
    },10);
}

