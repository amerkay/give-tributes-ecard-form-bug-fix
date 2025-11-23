<?php
/**
 * Plugin Name: Give Tributes eCard Form Bug Fix
 * Plugin URI: https://pangeatrust.org
 * Description: Fixes visibility bug where tribute eCard recipient fields don't appear on initial selection in GiveWP Next Gen forms
 * Version: 0.1.0
 * Author: Amer Kawar
 * Author URI: https://wildamer.com
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * License: GPLv2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue the fix script for Next Gen forms
 * Only loads on GiveWP donation form pages via the givewp_donation_form_enqueue_scripts hook
 */
function give_tributes_ecard_fix_enqueue_scripts()
{
    wp_enqueue_script(
        'give-tributes-ecard-fix',
        plugin_dir_url(__FILE__) . 'js/tribute-ecard-fix.js',
        array('jquery'),
        '0.1.0',
        true
    );
}

// Hook into GiveWP's Next Gen form script enqueue (only fires on donation form pages)
add_action('givewp_donation_form_enqueue_scripts', 'give_tributes_ecard_fix_enqueue_scripts');
