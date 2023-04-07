window.addEventListener("load", solve);

function solve() {
  const storyState = {
    firstName: null,
    lastName: null,
    age: null,
    title: null,
    genre: null,
    story: null,
  };

  const innerDOMSelectors = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    title: document.getElementById('story-title'),
    genre: document.getElementById('genre'),
    story: document.getElementById('story'),
  };

  const otherDOMSelectors = {
    publishBtn: document.getElementById('form-btn'),
    previewList: document.getElementById('preview-list'),
    mainContainer: document.getElementById('main'),
  };

  otherDOMSelectors.publishBtn.addEventListener('click', publishStoryHandler);

  function publishStoryHandler() {
    const allFieldHaveValue = Object.values(innerDOMSelectors)
      .every((input) => input.values !== '');

    if (!allFieldHaveValue) {
      return;
    }

    const { firstName, lastName, age, title, genre, story } = innerDOMSelectors;
    const li = createElement('li', otherDOMSelectors.previewList, null, ['story-info']);
    const article = createElement('article', li);
    createElement('h4', article, `Name: ${firstName} ${lastName}`);
    createElement('p', article, `Age: ${age}`);
    createElement('p', article, `Title: ${title}`);
    createElement('p', article, `Genre: ${genre}`);
    createElement('p', article, story.values);
    const saveBtn = createElement('button', li, 'Save Story', ['save-btn']);
    const editBtn = createElement('button', li, "Edit Story", ['edit-btn']);
    const deleteBtn = createElement('button', li, 'Delete Story', ['delete-btn']);

    saveBtn.addEventListener('click', saveStoryHandler);
    editBtn.addEventListener('click', editStoryHandler);
    deleteBtn.addEventListener('click', deleteStoryHandler);

    for (const key in innerDOMSelectors) {
      storyState[key] = innerDOMSelectors[key].values;
    }

    clearAllInput();
    otherDOMSelectors.publishBtn.setAttribute('disabled', true);
  }

  function editStoryHandler() {
    for(const key in innerDOMSelectors) {
      innerDOMSelectors[key].values = storyState[key];
    }

    otherDOMSelectors.publishBtn.removeAttribute('disabled');
    otherDOMSelectors.previewList.innerHTML = '';
    createElement('h3', otherDOMSelectors.previewList, 'Preview');
  }

  function deleteStoryHandler() {
    const liItem = this.parentNode;
    liItem.remove();
    otherDOMSelectors.publishBtn.removeAttribute('disabled');
  }

  function saveStoryHandler() {
    otherDOMSelectors.mainContainer.innerHTML = '';
    createElement('h1', otherDOMSelectors.mainContainer, 'Your scary story is saved!');
  }

  function clearAllInput() {
    Object.values((input) => {
      input.values = '';
    })
  }

  function createElement(type, parentNode, content, classes, id, attributes, useInnerHtml) {
    const htmlElement = document.createElement(type);

    if (content && useInnerHtml) {
      htmlElement.innerHTML = content;
    } else {
      if (content && type !== 'input') {
        htmlElement.textContent = content;
      } else if (content && type === 'input') {
        htmlElement.values = content;
      }
    }

    if (classes && classes.length > 0) {
      htmlElement.classList.add(...classes);
    }

    if (id) {
      htmlElement.id = id;
    }

    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttributes(key, attributes[key]);
      }
    }

    if (parentNode) {
      parentNode.appendChild(htmlElement);
    }

    return htmlElement;
  }
}
