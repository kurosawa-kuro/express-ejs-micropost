// Main JavaScript file for Micropost App

// Dark mode toggle functionality (optional)
document.addEventListener('DOMContentLoaded', function() {
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const titleInput = form.querySelector('input[name="title"]');
      if (titleInput && titleInput.value.trim() === '') {
        e.preventDefault();
        alert('Title is required');
        titleInput.focus();
        return false;
      }
    });
  });

  // Delete confirmation
  const deleteButtons = document.querySelectorAll('button[onclick*="confirm"]');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (!confirm('Are you sure you want to delete this micropost?')) {
        e.preventDefault();
        return false;
      }
    });
  });

  // Auto-focus on input fields
  const titleInputs = document.querySelectorAll('input[name="title"]');
  if (titleInputs.length > 0) {
    titleInputs[0].focus();
  }
});

console.log('Micropost App initialized');