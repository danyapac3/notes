export function createNoteElement(title, content, callback = () => {}) {
  const element = document.createElement('li');
  element.className = 'note';
  element.innerHTML =
    `<div class="title">${title}</div>` +
    `<div class="content">${content}</div>` +
    `<div class="note-button remove-button">remove</div>`;

  const button = element.querySelector('.remove-button');
  button.addEventListener('click', () => { 
    callback(); 
    element.remove();
  });
 
  return element;
}

export function createNoteFormElement(callback = () => {}) {
  const element = document.createElement('li');
  element.className = 'note note-form';
  element.innerHTML = 
    `<textarea rows="1" placeholder="Title here" maxlength="35" class="title form-title auto-resize" name="form-title"></textarea>` +
    `<textarea rows="1" placeholder="Details here" class="content form-content auto-resize" name="form-content"></textarea>` +
    `<div class="note-button create-button">create</div>`;

  const button = element.querySelector('.create-button');
  const titleField = element.querySelector('.form-title');
  const contentField = element.querySelector('.form-content');
  const textAreas = [ titleField, contentField ];

  titleField.addEventListener('input', function() {
    if (titleField.value.includes('\n'))
      titleField.value = titleField.value.split('\n').join('');
  })
  
  // applying auto resize behaviour for textarea elements
  textAreas.forEach(e => {
    e.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    });
  });

  button.addEventListener('click', () => { 
    callback();
    textAreas.forEach(e => {
      e.value = '';
      e.style.height = 'auto';
      e.style.height = e.scrollHeight + 'px';
    });
  });

  Object.defineProperty(element, 'fields', {
    get: () => ({
      title: (titleField.value === '') ? 'untitled' : titleField.value,
      content: contentField.value,
    }),
  });

  return element;
}