import createTooltip from '../tooltip.js';
import { mockData } from '../mockdata.js';
import { wrongEmoji, correctEmoji } from '../emoji.js';

export default function radio(form,type) {
    form.addEventListener("invalid", async (e) => {
        await createTooltip(e);
    }, true)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let correctAnswer = mockData[e.target.name];
        const formData = new FormData(e.target);
        e.target.reset();
        for (let [id,answer] of formData.entries()) {
            let radio = e.target.querySelector(`input[type='radio'][name='${id}'][value='${answer}']`);
            if (correctAnswer[id] == answer) {
                e.target.querySelectorAll(`input[type='radio'][name='${id}']`).forEach((input) => {
                    input.disabled = true;
                });
                radio.classList.add("correct");
                radio.setAttribute("label", String.fromCodePoint(correctEmoji.random()) + " " + radio.getAttribute("label"))
                radio.closest(".radio").classList.add("correct");
            } else {
                radio.disabled = true;
                radio.classList.add("wrong");
                radio.setAttribute("label", String.fromCodePoint(wrongEmoji.random()) + " " + radio.getAttribute("label"))
            }
        };
    });
    
}
