import answerDialog from "./answer-dialog";
import {update as save} from "./state-manager";
import scrollTo from "./scroll";

const doneState = 3;
const confirmedState = 2;
const maxAmountOfStates = 2;
const classNames = {
  main: 'step',
  answerButton: 'step__toggle-answer-dialog',
  answerInput: 'step__answer',
  nextButton: 'step__go-to-next',
  states: ['step--current', 'step--confirmed', 'step--done'],
  mute: 'step--mute',
  confirmationMessage: 'step__confirmation'
};

export default init;

function init (appState) {
  const steps = Array.prototype.map.call(
    document.getElementsByClassName(classNames.main),
    (e, i) => Step(i, e, appState[i] || 0, next.bind(null, i))
  );

  function next (index) {
    console.log("next", index);
    const nextStep = steps[++index];
    if (!nextStep) return;
    nextStep.init(true);
  }
}

function Step (index, container, state, next) {
  console.log(index, 'STEP', state);
  let toggleAnswerDialog, answerButton, confirmationMessage;
  applyState();

  if (!state) return {init};
  if (state >= doneState) return {init: () => false};

  init();

  function init (progress) {
    console.log(index, 'init');

    if (progress) updateState();
    if (progress || (index && state === 1)) scrollTo(container, -17);

    if (container.classList.contains(classNames.mute)) return;

    const [answerInput] = container.getElementsByClassName(classNames.answerInput);
    const [nextButton] = container.getElementsByClassName(classNames.nextButton);
    [confirmationMessage] = container.getElementsByClassName(classNames.confirmationMessage);
    [answerButton] = container.getElementsByClassName(classNames.answerButton);
    const answerAsserter = AnswerAsserter(answerInput.value, index);
    toggleAnswerDialog = answerDialog.bind(null, answerAsserter, updateState);
    answerButton.addEventListener('click', toggleAnswerDialog, {once: true});
    nextButton.addEventListener('click', updateState, {once: true});
  }

  function done () {
    next();
  }

  function updateState () {
    applyState(++state);
    if (state === confirmedState) setTimeout(() => scrollTo(confirmationMessage), 300);
    if (state >= confirmedState) {
      save(index, doneState);
      save(index + 1, 1);
    }
    if (state >= doneState) done();
    return state;
  }

  function applyState () {
    const start = Math.max(0, state - maxAmountOfStates);
    const stop = state;
    container.classList.add(...classNames.states.slice(start, stop));
    container.classList.remove(...classNames.states.slice(0, start));
    return state;
  }
}

function AnswerAsserter (correctAnswer, id) {
  const correctAnswers = correctAnswer.split(' || ');
  const answerPatterns = correctAnswers.map((a) => {
    const answer = a.trim()
      .replace(/\s+/g, '\\s+')
    return new RegExp(answer, 'i');
  })

  return function asserter (value) {
    return answerPatterns.some(pattern => pattern.test(value));
  }
}
