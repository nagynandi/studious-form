import sleep from './utility.js';

export default async function createTooltip(e) {
    e.preventDefault()
    if (!document.querySelector("#tooltip") ) { 
        let wrapper;
        if (!e.target.parentElement.classList.contains("wrapper")) {
            wrapper = document.createElement("span");
            wrapper.classList.add("wrapper");
            e.target.before(wrapper);
            wrapper.appendChild(e.target);
        } else {
            wrapper = e.target.parentElement;
        }
        let span = document.createElement("span");
        span.innerText = e.target.validationMessage;
        span.id = "tooltip";
        
        wrapper.appendChild(span);
        e.target.focus();

        let inputSize = e.target.getBoundingClientRect();
        let spanSize = span.getBoundingClientRect();
        
        if ( window.innerWidth < inputSize.left + spanSize.width) {
            span.style.left = `-${Math.abs(inputSize.width - spanSize.width) }px`;   
        }
        await sleep(10);
        span.classList.add("slide-down");
        await sleep(940);
        span.classList.add("fade");
        await sleep(300);
        span.remove();
    }
}