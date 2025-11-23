/**
 * Give Tributes eCard Form Bug Fix
 * 
 * Fixes the issue where eCard recipient fields don't appear on initial selection
 * when "Yes, please" is selected and "Yes, send an eCard" is auto-selected.
 * 
 * The problem: React's conditional field logic doesn't trigger on initial render
 * when the default value is already set to "send".
 * 
 * The solution: Programmatically toggle the radio button to trigger React's 
 * conditional visibility logic, similar to how the legacy JS code works.
 */

jQuery(document).ready(function($) {
    'use strict';
    
    let isApplyingFix = false;
    let lastFixedElement = null;
    let userJustClicked = false;
    
    // Detect user clicks to avoid interfering with manual toggles
    document.addEventListener('click', function(e) {
        if (e.target.name === 'tributesSendNotification') {
            userJustClicked = true;
            setTimeout(() => userJustClicked = false, 500);
        }
    }, true);
    
    // Watch for DOM changes to detect when form appears
    new MutationObserver(function() {
        if (isApplyingFix || userJustClicked) return;
        
        const sendRadio = document.querySelector('input[name="tributesSendNotification"][value="send"]');
        const noRadio = document.querySelector('input[name="tributesSendNotification"][value="no"]');
        const emailField = document.querySelector('[name="tributesRecipientEmail"]');
        
        // Check if "send" is selected but fields are hidden (the bug)
        if (sendRadio?.checked) {
            if (lastFixedElement !== sendRadio && (!emailField || !emailField.offsetParent)) {
                isApplyingFix = true;
                lastFixedElement = sendRadio;
                
                // Toggle radio to trigger React's conditional rendering
                setTimeout(() => {
                    noRadio.click();
                    setTimeout(() => {
                        sendRadio.click();
                        isApplyingFix = false;
                    }, 50);
                }, 100);
            }
        } else if (noRadio?.checked) {
            // Reset tracking when user selects "No, thank you"
            lastFixedElement = null;
        }
    }).observe(document.body, { childList: true, subtree: true });
});
