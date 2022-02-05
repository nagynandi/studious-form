import createTooltip from '../tooltip.js';
import { mockData } from '../mockdata.js';
import { wrongEmoji, correctEmoji } from '../emoji.js';

export default function multiCheckbox(form,type) {
    let checkboxes = form.querySelectorAll("input[type='checkbox']");
    form.addEventListener("invalid", async (e) => {
        await createTooltip(e);
    }, true)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valid = true;
        checkboxes.forEach((checkbox) => {
            let sameNames = [...form.querySelectorAll(`[type='checkbox'][name='${checkbox.name}']`)].filter(elem => elem.checked);
            if (!sameNames.length) {
                valid = false;
                checkbox.setCustomValidity("Please select at least one.");
                e.target.reportValidity();
                checkbox.setCustomValidity("");
            }
        });
        if (!valid) return;
        let correctAnswer = mockData[e.target.name];
        let formData = new FormData(e.target);
        let names = new Set(formData.keys());
        for (let name of names) {
            let value = formData.getAll(name).join('');
            let inputs = document.querySelectorAll(`input[name="${name}"]`);
            inputs.forEach((input) => input.disabled = true);
            let last = inputs[inputs.length-1];
            let span = document.createElement("span");
            if (correctAnswer[name].includes(value)) {
                span.classList.add("correct");
                span.innerHTML = `&#${correctEmoji.random()} Your answer is Correct`;
                last.parentElement.after(span);
            } else {
                span.classList.add("wrong")
                span.innerHTML = `&#${wrongEmoji.random()} Your answer is Wrong<br>The correct answer will go here!`;
                last.parentElement.after(span);
            }
        }
    });
}