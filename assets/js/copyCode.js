// Copy code block contents to clipboard. 
// See _includes/copyHeader.html for credit

// This assumes that you're using Rouge; if not, update the selector
const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
  const code = codeBlocks[index].innerText;

  copyCodeButton.addEventListener('click', () => {
    // Copy the code to the user's clipboard
    window.navigator.clipboard.writeText(code);

    // Update the button text visually
    /* NEW CODE published May 23, 2022:
        const { innerText: originalText } = copyCodeButton;
        copyCodeButton.innerText = 'Copied!';
    */
    // (Optional) Toggle a class for styling the button
    copyCodeButton.classList.add('copied');

    // After 2 seconds, reset the button to its initial UI
    setTimeout(() => {
      /* NEW CODE published May 23, 2022:
          copyCodeButton.innerText = originalText;
      */
      copyCodeButton.classList.remove('copied');
    }, 2000);
  });
});
