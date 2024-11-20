const clock = document.querySelector('.clock');
const alarm = document.querySelector('.alarm');
const stopWatch = document.querySelector('.stop-watch');
const timer = document.querySelector('.timer');
const top = document.querySelector('.top');


clock.addEventListener('click',(e)=>{
    let icon = e.currentTarget.firstElementChild
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
});

alarm.addEventListener('click',(e)=>{
    let icon = e.currentTarget.firstElementChild
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
});

stopWatch.addEventListener('click',(e)=>{
    let icon = e.currentTarget.firstElementChild
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
});

timer.addEventListener('click',(e)=>{
    let icon = e.currentTarget.firstElementChild
    icon.style.fontWeight= '600';
    icon.style.borderBottom = '1px solid black';
});

