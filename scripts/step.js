import answerDialog from "./answer-dialog";

const doneState = 3;
const maxAmountOfStates = 2;
const classNames = {
  main: 'step',
  answerButton: 'step__toggle-answer-dialog',
  answerInput: 'step__answer',
  nextButton: 'step__go-to-next',
  states: ['step--current', 'step--confirmed', 'step--done']
};

export default init;

function init (appState) {
  const steps = Array.prototype.map.call(
    document.getElementsByClassName(classNames.main),
    (e, i) => Step(e, appState[i] || 0, next.bind(null, i), i)
  );

  function next (index) {
    console.log("next", index);
    const nextStep = steps[index + 1];
    if (!nextStep) return;
    nextStep.init(true);
  }
}

function Step (container, state, next, id) {
  console.log(id, 'STEP', state);
  let toggleAnswerDialog, answerButton;
  applyState();

  if (!state) return {init};
  if (state >= doneState) return;

  init();

  function init (current) {
    console.log(id, 'init');
    if (current) updateState();

    const [answerInput] = container.getElementsByClassName(classNames.answerInput);
    const [nextButton] = container.getElementsByClassName(classNames.nextButton);
    [answerButton] = container.getElementsByClassName(classNames.answerButton);

    const answerAsserter = AnswerAsserter(answerInput.value, id);
    toggleAnswerDialog = answerDialog.bind(null, answerAsserter, updateState);
    answerButton.addEventListener('click', toggleAnswerDialog, {once: true});
    nextButton.addEventListener('click', updateState, {once: true});
  }

  function done () {
    console.log(id, "done");
    next();
  }

  function updateState () {
    applyState(++state);
    console.log(id, 'updateState', state);
    if (state >= doneState) done();
    return state;
  }

  function applyState () {
    const start = Math.max(0, state - maxAmountOfStates);
    const stop = state;
    console.log(id, "applyState", start, stop, container.className);
    container.classList.add(...classNames.states.slice(start, stop));
    container.classList.remove(...classNames.states.slice(0, start));
    console.log(id, "post applyState", container.className);
    return state;
  }
}

function AnswerAsserter (correctAnswer, id) {
  let answerPattern = correctAnswer.trim().replace(/\s*/g, '\\s*')
  answerPattern = new RegExp(answerPattern, 'i');

  return function asserter (value) {
    const match = answerPattern.test(value);
    console.log(id, "value assertion", value, match);
    return true;
  }
}
