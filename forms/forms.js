import select from './types/select.js'; 
import radio from './types/radio.js';
import input from './types/text-input.js';
import multiCheckbox from './types/multi-checkbox.js';

let forms = document.querySelectorAll("form");

forms.forEach((form) => {
    const type = form.dataset.type;
    if (type.startsWith("select")) {
        select(form,type);
    }
    else if (type.startsWith("radio")) {
        radio(form,type);
    }
    else if (type.startsWith("input")) {
        input(form,type);
    }
    else if (type.startsWith("multi-checkbox")) {
        multiCheckbox(form,type);
    }
});