export function createNoteElement(title, content, callback = () => {}) {
  const element = document.createElement('li');
  element.className = 'note';
  element.innerHTML =
    `<div class="title" title="${title}">${title}</div>` +
    `<div class="content">${content}</div>` +
    `<div class="note-button remove-button">remove</div>`;

  const button = element.querySelector('.remove-button');
  button.addEventListener('click', (event) => {
    callback(); 
    element.remove();
  });
 
  return element;
}

export function createNoteFormElement(callback = () => {}) {
  const element = document.createElement('li');
  element.className = 'note-form';
  element.innerHTML = 
    `<textarea rows="1" placeholder="Title here" maxlength="40" class="title" name="form-title"></textarea>` +
    `<textarea rows="1" placeholder="Details here" class="content" name="form-content"></textarea>` +
    `<div class="note-button create-button">create</div>`;

  const button = element.querySelector('.create-button');
  const titleField = element.querySelector('.title');
  const contentField = element.querySelector('.content');
  const textAreas = [ titleField, contentField ];

  titleField.addEventListener('input', function() {
    if (titleField.value.includes('\n'))
      titleField.value = titleField.value.split('\n').join('');
  });

  button.addEventListener('click', () => { 
    callback();
    if(textAreas.some(e => e.value.trim() === '')) return;
    textAreas.forEach(e => e.value = '');
  });

  return element;
}
