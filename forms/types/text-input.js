import createTooltip from '../tooltip.js';
import { mockData } from '../mockdata.js';
import { wrongEmoji, correctEmoji } from '../emoji.js';

export default function input(form, type) {
    const inputs = form.querySelectorAll("input[type='text']");
    inputs.forEach((input) => {
        if (type.includes("auto-size")) {
            input.size = Math.max(input.value.length, input.placeholder.length);
            input.addEventListener("input", (e)=> {
                input.size = Math.max(input.value.length, input.placeholder.length);
            });
        }
        if (type.includes("one-word")) {
            input.pattern = " *[A-Za-z0-9\-\$\€\˚]+ *"
            input.title="One word only"
        }
        
    });
    form.addEventListener("invalid", async (e) => {
        await createTooltip(e);
    }, true)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let correctAnswer = mockData[e.target.name];
        let formData = new FormData(e.target);
        for (let [name,value] of formData.entries()) {
            let input = e.target.querySelector(`[name="${name}"]`);
            value = value.trim();
            if (correctAnswer[name].includes(value)) {
                input.outerHTML = `&#${correctEmoji.random()}&nbsp<ins>${value}</ins>`;
            } else {
                input.outerHTML = `&#${wrongEmoji.random()}&nbsp<del>${value}</del>&nbsp<ins>${correctAnswer[name].join("/")}</ins>`;
            }
        }
    });
}