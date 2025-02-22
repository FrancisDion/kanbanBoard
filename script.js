// script.js

// Functions for drag and drop
function allowDrop(event) {
    event.preventDefault();
  }
  
  function dropItem(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(data);
    event.currentTarget.appendChild(draggedItem);
  }
  
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  // Modal Elements
  const modal = document.getElementById("modal");
  const itemForm = document.getElementById("itemForm");
  const cancelModal = document.getElementById("cancelModal");
  const cardCategoryInput = document.getElementById("cardCategory");
  
  // Global variable to store the category from the clicked card
  let currentCategory = "";
  
  // Event listener for all add-item buttons to open the modal
  document.querySelectorAll(".add-item").forEach((button) => {
    button.addEventListener("click", function () {
      // Get the card's category from the parent card
      const card = this.closest(".card");
      currentCategory = card.getAttribute("data-category");
      // Store it in the hidden input
      cardCategoryInput.value = currentCategory;
      // Open the modal
      modal.classList.remove("hidden");
    });
  });
  
  // Handle cancel button in modal
  cancelModal.addEventListener("click", () => {
    modal.classList.add("hidden");
    itemForm.reset();
  });
  
  // Handle form submission to create new item
  itemForm.addEventListener("submit", function (event) {
    event.preventDefault();
  
    const itemName = document.getElementById("itemName").value;
    const itemColor = document.getElementById("itemColor").value;
    const assignedUser = document.getElementById("itemUser").value;
    const category = cardCategoryInput.value;
  
    // Create new item element
    const newItem = document.createElement("div");
    newItem.className = "item";
    newItem.id = "item-" + Date.now();
    newItem.setAttribute("draggable", "true");
    newItem.style.backgroundColor = itemColor;
    newItem.addEventListener("dragstart", dragStart);
  
    // Create a span for item text
    const textSpan = document.createElement("span");
    textSpan.textContent = itemName;
    newItem.appendChild(textSpan);
  
    // Create and append delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-item";
    deleteButton.setAttribute("aria-label", "Delete item");
    deleteButton.textContent = "x";
    deleteButton.addEventListener("click", function () {
      newItem.remove();
    });
    newItem.appendChild(deleteButton);
  
    // Determine where to append the item:
    // Find the user section by assigned user and then the card matching the category
    const targetCardItems = document.querySelector(
      `#${assignedUser} .card[data-category="${category}"] .card-items`
    );
  
    if (targetCardItems) {
      targetCardItems.appendChild(newItem);
    } else {
      alert("Could not find target card.");
    }
  
    // Close modal and reset form
    modal.classList.add("hidden");
    itemForm.reset();
  });
  