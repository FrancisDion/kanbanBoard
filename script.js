// script.js

// Function to allow dropping items
function allowDrop(event) {
    event.preventDefault();
  }
  
  // Function to handle drop event
  function dropItem(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const draggedItem = document.getElementById(data);
    event.currentTarget.appendChild(draggedItem);
  }
  
  // Function to handle drag start event
  function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }
  
  // Add event listeners to add-item buttons
  document.querySelectorAll(".add-item").forEach((button) => {
    button.addEventListener("click", function () {
      // Find the closest card-items container
      const cardItems = this.closest(".card").querySelector(".card-items");
      // Create a new item element
      const newItem = document.createElement("div");
      newItem.className = "item";
      newItem.id = "item-" + Date.now();
      newItem.setAttribute("draggable", "true");
      newItem.addEventListener("dragstart", dragStart);
  
      // Use prompt to get item content
      const content = prompt("Enter item content:");
      if (content) {
        // Create a text span for the content
        const textSpan = document.createElement("span");
        textSpan.textContent = content;
        newItem.appendChild(textSpan);
  
        // Create and append a delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-item";
        deleteButton.setAttribute("aria-label", "Delete item");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", function () {
          newItem.remove();
        });
        newItem.appendChild(deleteButton);
  
        // Append the new item to the card
        cardItems.appendChild(newItem);
      }
    });
  });
  