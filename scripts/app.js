import dialog from './answer-dialog';

console.log('running!');

dialog(
  function (value) {
    return value === 'yes';
  },
  function () {
    console.log('wie');
  }
);
