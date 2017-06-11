(function () {
  "use strict";

  var currentIndex = 0;

  var steps = document.getElementsByClassName('clue');
  var toggleAnswerDialogButtons = document.getElementsByClassName('toggle-answer');
  var answerDialog = document.getElementById('answer-dialog');

  Array.prototype.forEach.call(toggleAnswerDialogButtons, function (button) {
    button.addEventListener('click', toggleAnswerDialog.bind(null, true));
  });


  function toggleAnswerDialog (active) {
    answerDialog.classList.toggle('answer--active', active);
  }

})();
