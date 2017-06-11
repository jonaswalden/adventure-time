const [dialogElement] = document.getElementsByClassName('answer-dialog');
const [form] = dialogElement.getElementsByTagName('form');
const [submit] = dialogElement.getElementsByTagName('button');
const inputs = dialogElement.getElementsByTagName('input');

export default dialog;

function dialog (valueAssertion) {

  activate();

  function activate () {
    toggle(true);
    form.addEventlistener('submit', assert);
  }

  function assert (event) {
    event.preventDafault();

    const values = Array.prototype.map.call(inputs, (i) => i.value);
    const valid = valueAssertion(values);

    if (valid) return accept();
    reject();
  }

  function toggle (active) {
    dialogElement.classList.toggle('');
  }

  function accept () {
    form.reset();
  }

  function reject () {
    submit.textContent = 'Wrong';
    dialogElement.classList.add("answer-dialog--error");

    setTimeout(() => {
      submit.textContent = "!";
      dialogElement.classList.remove("answer-dialog--error");
      inputs[0].focus();
    }, 1500);
  }
}
