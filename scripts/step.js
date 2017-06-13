const doneState = 2;
const classNames = {
  states: ['step--current', 'step--done']
};

export default init;

function init () {
  const steps = document.getElementsByClassName('step');
  for (var i = 0; i < steps.length; ++i) {
    Step(i, steps[i]);
  }
}

function Step (id, container, state = 0) {
  applyState();
  if (state >= doneState) return;

  const [clue] = container.getElementsByClassName('step__clue');
  const [confirmation] = container.getElementsByClassName('step__confirmation');

  function updateState () {
    applyState(true);
  }

  function applyState (update) {
    if (update) state += 1;
    if (state >= doneState) done();
    container.classList.add(classNames.states.slice(state));
  }

  function isDone () {
    if (state < doneState) return;

  } 
}
