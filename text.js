function togglePopoverWithDynamicPosition(event, id) {
  const targetPopover = document.getElementById(id);

  // Close popover if already open
  if (targetPopover.style.display === 'block') {
    targetPopover.style.display = 'none';
    document.removeEventListener('click', closeOnOutsideClick);
    return;
  }

  // Position the popover near the button
  const button = event.target;
  const rect = button.getBoundingClientRect();

  targetPopover.style.display = 'block';
  targetPopover.style.top = `${rect.bottom + window.scrollY-10 }px`; // 5px margin below the button
  targetPopover.style.left = `${rect.left + window.scrollX+100}px`; // Align with button's left edge

  // Function to close the popover on outside click
  function closeOnOutsideClick(e) {
    if (!e.target.closest(`#${id}`) && !e.target.closest('button')) {
      targetPopover.style.display = 'none';
      document.removeEventListener('click', closeOnOutsideClick);
    }
  }

  // Add event listener to detect clicks outside the popover
  document.addEventListener('click', closeOnOutsideClick);
}