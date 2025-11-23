# Give Tributes eCard Form Bug Fix

Fixes the issue where eCard recipient fields don't appear on initial selection when "Yes, please" is selected and "Yes, send an eCard" is auto-selected.

Bug happens with the following setup:
- Wordpress v6.8.3
- GiveWP v4.13.1
- Give Tributes Addon v2.3.0

## The Problem

React's conditional field logic doesn't trigger on initial render when the default value is already set to "send".

<video src="https://github.com/amerkay/give-tributes-ecard-form-bug-fix/raw/refs/heads/main/public/screencast.mp4" controls></video>

## The Solution

Programmatically toggle the radio button to trigger React's conditional visibility logic, similar to how the legacy JS code works.
