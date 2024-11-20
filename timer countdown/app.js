const topSections  = document.querySelectorAll('.top');
const container = document.getElementsByClassName('container')
const clock = document.querySelector('.clock');
const alarm = document.querySelector('.alarm');
const stopWatch = document.querySelector('.stop-watch');
const timer = document.querySelector('.timer');
const iconTag = document.querySelector('i');

topSections.forEach(topSection=>{
    topSection.addEventListener('click',(e)=>{
        let icon = e.currentTarget.firstElementChild
        iconStyle(icon);
        if(e.currentTarget.classList.contains('clock')){
            showCurrentTime();
        }
    });
});

function iconStyle(icon){
    iconTag.style.fontWeight='500';
    iconTag.style.borderBottom = 'none';
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
}

function showCurrentTime(){
    const currDate = new Date();
    console.log(currDate.getTimezoneOffset())
}

// clock.addEventListener('click',(e)=>{
//     let icon = e.currentTarget.firstElementChild
//     icon.style.fontWeight= '600';
//     icon.style.borderBottom = '1px solid black';
// });

// alarm.addEventListener('click',(e)=>{
//     let icon = e.currentTarget.firstElementChild
//     icon.style.fontWeight= '600';
//     icon.style.borderBottom = '1px solid black';
// });

// stopWatch.addEventListener('click',(e)=>{
//     let icon = e.currentTarget.firstElementChild
//     icon.style.fontWeight= '600';
//     icon.style.borderBottom = '1px solid black';
// });

// timer.addEventListener('click',(e)=>{
//     let icon = e.currentTarget.firstElementChild
//     icon.style.fontWeight= '600';
//     icon.style.borderBottom = '1px solid black';
// });

