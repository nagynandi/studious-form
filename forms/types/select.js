import createTooltip from './../tooltip.js';
import sleep from './../utility.js';{}
import { mockData } from '../mockdata.js';
import { wrongEmoji, correctEmoji } from '../emoji.js';

async function resizeSelect(select) {
    const tmpOption = document.createElement("option");
    tmpOption.textContent = select.selectedOptions[0].textContent;
    const tmpSelect = document.createElement("select");
    tmpSelect.style.visibility = "hidden";
    tmpSelect.style.position = "fixed";
    tmpSelect.appendChild(tmpOption);
    select.after(tmpSelect);
    select.style.width = `${tmpSelect.clientWidth + 4}px`
    tmpSelect.remove();
    await sleep(250);
}

export default function select(form,type) {
    const selects =  form.querySelectorAll("select");
    selects.forEach((select) => {
        resizeSelect(select);
        select.addEventListener("change", async (e) => {
            if (type.includes("auto-size")) {
                await resizeSelect(e.target);
            }
            e.target.classList.remove("wrong");

            if (type.includes("unique-values")) {
                let sameValues = [...selects].filter((elem) => elem.value !== ""  && elem.value == e.target.value);
                if (1 < sameValues.length) {
                    e.target.setCustomValidity("You have already selected this.");
                    e.target.reportValidity();
                    e.target.setCustomValidity("");
                } else {
                    e.target.setCustomValidity("");
                }
            }
            if (select.value.includes("-wrong")) {
                e.target.setCustomValidity("This is a wrong answer!");
                e.target.reportValidity();
            }
        })
        
    });
    form.addEventListener("invalid", async (e) => {
        e.preventDefault();
        await createTooltip(e);
    }, true)
    //submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        selects.forEach((select)=> {
            if (valid && select.value.includes("-wrong")) {
                valid = false;
                select.setCustomValidity("This is a wrong answer!");
                select.reportValidity();
                select.setCustomValidity("");
            }
            if (type.includes("unique-values")) {
                let sameValues = [...selects].filter((elem) => elem.value !== ""  && elem.value == select.value);
                if (valid && 1 < sameValues.length) {
                    valid = false;
                    sameValues[sameValues.length-1].setCustomValidity(`You have already selected this.`);
                    sameValues[sameValues.length-1].reportValidity();
                    sameValues[sameValues.length-1].setCustomValidity("");
                }
            }
        });
        if (!valid) return;
        let correctAnswer = mockData[e.target.name];
        const formData = new FormData(e.target);
        for (let [id,answer] of formData.entries()) {
            const select = form.querySelector(`select[name="${id}"]`);
            const option = select.querySelector(`option[value="${answer}"]`);
            if (correctAnswer[id] == answer) {
                select.classList.remove("wrong");
                select.classList.add("correct");
                option.innerText = String.fromCodePoint(correctEmoji.random()) + " " + option.innerText
                select.disabled = true;
            } else {
                select.classList.add("wrong");
                option.value = option.value + "-wrong";
                option.innerText = String.fromCodePoint(wrongEmoji.random()) + " " + option.innerText
            }
            resizeSelect(select);
        }
    });
}