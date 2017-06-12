const [form] = document.getElementsByClassName('answer-dialog');
const [submit] = form.getElementsByTagName('button');
const [input] = form.getElementsByTagName('input');

const dialog = Dialog();

export default dialog;

function Dialog () {
  let valueAsserter, done;

  form.addEventListener('submit', assert);

  return activate;

  function activate (_valueAsserter, _done) {
    valueAsserter = _valueAsserter;
    done = _done;
    toggle(true);
    input.focus();
  }

  function deactivate () {
    toggle(false);
    form.reset();
  }

  function assert (event) {
    event.preventDefault();
    const value = input.value.toLowerCase();
    if (valueAsserter(value)) return accept();
    if (value === "frog") alert("Frog? ...frog is wrong");
    reject();
  }

  function toggle (active) {
    form.classList.toggle('answer-dialog--active', active);
  }

  function accept () {
    submit.textContent = 'Olé';
    form.classList.add('answer-dialog--success');

    setTimeout(() => {
      submit.textContent = '!';
      form.classList.remove('answer-dialog--success');
      deactivate();
    }, 1500);
  }

  function reject () {
    submit.textContent = 'Please';
    form.classList.add('answer-dialog--error');
    input.focus();
    input.setSelectionRange(0, input.value.length);

    setTimeout(() => {
      submit.textContent = '!';
      form.classList.remove('answer-dialog--error');
    }, 1500);
  }
}
