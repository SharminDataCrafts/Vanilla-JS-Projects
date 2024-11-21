const topSections  = document.querySelectorAll('.top');
const container = document.getElementById('container');
const iconTags = document.querySelectorAll('i');
// const clock = document.querySelector('.clock');
// const alarm = document.querySelector('.alarm');
// const stopWatch = document.querySelector('.stop-watch');
// const timer = document.querySelector('.timer');

topSections.forEach(topSection=>{
    topSection.addEventListener('click',(e)=>{
        let icon = e.currentTarget.firstElementChild
        iconStyle(icon);
        if(e.currentTarget.classList.contains('clock')){
            // showCurrentDateTime();
            setInterval(showTime,1000);
        }
    });
});

function iconStyle(icon){
    iconTags.forEach(iconTag=>{
        iconTag.style.fontWeight='500';
        iconTag.style.borderBottom = 'none';
    })
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
}

function showCurrentDateTime(){


    const dateTime = new Date();
    // current time
    const time = dateTime.toLocaleTimeString();
    console.log(time)
    // current Date
    const today = dateTime.toLocaleDateString("en-GB"); 
    console.log(today);

    const timeContainer = document.createElement('div');
    const dateContainer = document.createElement('div');
    timeContainer.innerText = time;
    dateContainer.innerText = 'Current: '+today;
  
    DateTimestyle(timeContainer);
    DateTimestyle(dateContainer);

    container.appendChild(timeContainer);
    container.appendChild(dateContainer);
}


function showTime(){
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
    
    
    const timeContainer = document.createElement('div');
    timeContainer.innerText = currentTime;
  
    DateTimestyle(timeContainer);

    container.appendChild(timeContainer);
    
}
showTime()

function DateTimestyle(element){
    element.style.textAlign = 'center';
    element.style.marginTop = '1rem';
    element.style.fontSize = '2rem';
}
