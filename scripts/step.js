import answerDialog from "./answer-dialog";

const doneState = 2;
const classNames = {
  main: 'step',
  states: ['step--current', 'step--done'],
  clue: 'step__clue',
  answerButton: 'step__toggle-answer-dialog'
};

export default init;

function init (appState) {
  const steps = Array.prototype.map.call(
    document.getElementsByClassName(classNames.main),
    (e, i) => Step(e, appState[i] || 0, next.bind(null, i))
  );

  function next (index) {
    const nextStep = steps[index + 1];
    if (!nextStep) return;
    nextStep.init();
  }
}

function Step (container, state, next) {
  let toggleAnswerDialog, answerButton;

  if (applyState() >= doneState) return {init};

  function init () {
    const [clue] = container.getElementsByClassName(classNames.clue);
    const answerAsserter = AnswerAsserter(clue.dataset.answer);
    [answerButton] = container.getElementsByClassName(classNames.answerButton);
    toggleAnswerDialog = answerDialog(answerAsserter, done);
    answerButton.addEventListener('click', toggleAnswerDialog);
  }

  function updateState () {
    state += 1;
    applyState(true);
    if (state >= doneState) done();
    return state;
  }

  function applyState (update) {
    container.classList.add(...classNames.states.slice(state));
    return state;
  }

  function done () {
    answerButton.removeEventListener('click', toggleAnswerDialog);
    next();
  }
}

function AnswerAsserter (correctAnswer) {
  let answerPattern = correctAnswer.trim().replace(/\s*/g, '\\s*')
  answerPattern = new RegExp(answerPattern, 'i');

  return function asserter (value) {
    return value.match(answerPattern);
  }
}
