const submitBtn = document.getElementById("submitBtn");
const addListBtn = document.getElementById("addListBtn");
const addItemBtn = document.getElementById("addItemBtn");

const openNoteContainerBtn = document.getElementById("openNoteContainerBtn");
const noteContainerBefore = document.getElementById("noteContainerBefore");
const noteContainer = document.getElementById("noteContainer");

const listContainer = document.getElementById("listContainer");
const createListBtn = document.getElementById("createListBtn");

const notesBox = document.getElementById('notesBox');


function onClick(button, handler) {
    button.addEventListener("click", handler);
}

function show(object) {
    object.classList.remove("hidden");
}

function hide(object) {
    object.classList.add("hidden");
}

function clearInput() {
    titleInput.value = "";
    noteInput.value = "";
}

function clearListInput() {
    listTitleInput.value = "";
    itemList.value = "";
    const itemContainers = itemsDiv.querySelectorAll(".itemContainer");
    itemContainers.forEach(container => container.remove());
}

function addNote() {
    const titleInput = document.getElementById("titleInput");
    const noteInput = document.getElementById("noteInput");

    let newNote = document.createElement("div");
    let titleHeading = document.createElement("h3");
    let noteHeading = document.createElement("p");

    newNote.classList.add("noteBox");

    titleHeading.innerHTML = titleInput.value.replace(/\n/g, "<br>");
    noteHeading.innerHTML = noteInput.value.replace(/\n/g, "<br>");

    if (titleHeading.innerHTML === "" && noteHeading.innerHTML === "") {
        return
    } else {
        newNote.appendChild(titleHeading);
        newNote.appendChild(noteHeading);
        notesBox.appendChild(newNote);
        hide(noteContainer);
        show(noteContainerBefore);
    }
}

function addItemToList() {
    const itemList = document.getElementById("itemList");
    const itemsDiv = document.getElementById("itemsDiv");

    let itemContainer = document.createElement("div");
    itemContainer.style.display = "flex";
    itemContainer.style.alignItems = "center";
    itemContainer.style.gap = "12px";
    itemContainer.classList.add("itemContainer");

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "-";
    removeBtn.classList.add("removeItemBtn");

    let itemAdded = document.createElement("p");
    itemAdded.innerHTML = itemList.value;
    itemAdded.classList.add("item");

    if (itemAdded.innerHTML === "") {
        return;
    } else {
        itemContainer.appendChild(itemAdded);
        itemContainer.appendChild(removeBtn);
        itemsDiv.appendChild(itemContainer);
        itemList.value = "";
    }

    onClick(removeBtn, function (event) {
        event.stopPropagation();
        itemContainer.remove();
    });
}

onClick(addListBtn, function () {
    const titleInput = document.getElementById("listTitleInput");
    const itemsDiv = document.getElementById("itemsDiv");

    let newNote = document.createElement("div");
    newNote.classList.add("noteBox");

    let titleHeading = document.createElement("h3");
    titleHeading.innerHTML = titleInput.value.replace(/\n/g, "<br>");
    newNote.appendChild(titleHeading);

    let items = itemsDiv.querySelectorAll(".item");
    if (items.length > 0) {
        let ul = document.createElement("ul");
        items.forEach(item => {
            let li = document.createElement("li");
            li.innerHTML = item.innerHTML;
            ul.appendChild(li);
        });
        newNote.appendChild(ul);
    } else {
        return;
    }

    notesBox.appendChild(newNote);
    hide(listContainer);
    show(noteContainerBefore);

    clearListInput();

});

onClick(openNoteContainerBtn, function () {
    show(noteContainer);
    hide(noteContainerBefore);
    clearInput();
});

onClick(createListBtn, function () {
    show(listContainer);
    hide(noteContainerBefore);
});

onClick(submitBtn, function () {
    addNote();
});

onClick(addItemBtn, function () {
    addItemToList();
});

onClick(document, function (event) {
    if (
        !noteContainer.classList.contains("hidden") &&
        !noteContainer.contains(event.target) &&
        !openNoteContainerBtn.contains(event.target)
    ) {
        hide(noteContainer);
        show(noteContainerBefore);
    }

    if (
        !listContainer.classList.contains("hidden") &&
        !listContainer.contains(event.target) &&
        !createListBtn.contains(event.target)
    ) {
        hide(listContainer);
        show(noteContainerBefore);
    }
});


const openNote = document.getElementById("openNote");
const openNoteContent = document.getElementById("openNoteContent");
const deleteOpenNote = document.getElementById("deleteOpenNote");
const closeOpenNote = document.getElementById("closeOpenNote");
let currentNote = null;

onClick(notesBox, function (event) {
    const note = event.target.closest(".noteBox");
    const infoList = document.getElementById("infoList");
    if (note) {
        currentNote = note;
        openNoteContent.innerHTML = note.innerHTML;
        openNote.classList.remove("hidden");
        if (openNoteContent.querySelector("ul")) {
            infoList.textContent = "Click any item to mark it as completed";
        }
        openNoteContent.querySelectorAll("li").forEach(li => {
            li.addEventListener("click", function () {
                li.classList.toggle("crossed");
            });
        });
    }
});

onClick(deleteOpenNote, function () {
    if (currentNote) {
        currentNote.remove();
        openNote.classList.add("hidden");
        currentNote = null;
    }
});

onClick(closeOpenNote, function () {
    if (currentNote) {
        currentNote.innerHTML = openNoteContent.innerHTML;
        openNote.classList.add("hidden");
        currentNote = null;
    }
});

const searchInput = document.querySelector('.search-bar');

searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const notes = notesBox.querySelectorAll('.noteBox');
    notes.forEach(note => {
        const text = note.innerText.toLowerCase();
        if (text.includes(query)) {
            note.style.display = '';
        } else {
            note.style.display = 'none';
        }
    });
});