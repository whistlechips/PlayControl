# PlayControl
Foobar2000 Spider Monkey (@TheQwertiest) single panel javascript with user configurable settings via the SMP Properties dialog.<br>
Based on: "track info + seekbar + buttons.js" and "last.fm lover.js" by @marc2k3.<br>
![image](https://github.com/user-attachments/assets/c18354e5-f536-4dd1-b365-21649329dc37)
<br>
## Features:
Two sets of buttons, one for transport control of FB2K's playback functionality which is located below the center Seekbar:<br>
Left-to-right:<br>
<ul>
  <li>Love/Unlove, Right-click to set up LFM user and authorize.</li>
  <li>Previous Track.</li>
  <li>Rewind 10 seconds.</li>
  <li>Play/Pause.</li>
  <li>Fast Forward 30 seconds.</li>
  <li>Next Track.</li>
  <li>Cycle through playback order: Default, Repeat (Playlist), Repeat (Track), Random, Shuffle (tracks), Shuffle (albums), Shuffle (folders)</li>
</ul>
<br>
The second set, under the Volume Bar:<br>
<ul>
  <li>FB2K Preferences.</li>
  <li>DSP Prefs.</li>
  <li>Search via Facets.</li>
  <li>Save all playlists.</li>
  <li>Enable/disable Foo_Skip component.</li>
</ul>

## Installation:
Unzip the latest release ZIP to your Foobar2000 user profile directory (i.e. "C:\Users\XXXXXXXXXX\AppData\Roaming\foobar2000\") where "XXXXXXXXXX" is your Windows Username.<br>
Then download and unzip "PlayControl.zip" into it.  Add "PlayControl.js" to a Spider Monkey panel.<br>
![image](https://github.com/user-attachments/assets/d7e99f1d-f1e4-465b-911f-c756b5cdf659)

## Requirements:
<ul>
  <li>Foobar2000: https://www.foobar2000.org/download</li>
  <li>Spider Monkey Panel component, @TheQwertiest: https://theqwertiest.github.io/foo_spider_monkey_panel/</li>
  <li>Skip Track component: https://www.foobar2000.org/components/view/foo_skip/</li>
  <li>Segoe Fluent Icons font: https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font</li>
  <li>Roboto font (default): https://fonts.google.com/specimen/Roboto, falls back to Segoe UI if not installed.</li>
</ul>
<br>

Full screen ColumnsUI shot with PlayControl SMP panel at the bottom of the Foobar2000 window, under control of the PS Splitter at the top of the screen:<br>
![image](https://github.com/user-attachments/assets/10a6f8f9-49f6-4e5a-a8e4-9c853f5ec1a5)
<br>

### Start with:<br>
![image](https://github.com/user-attachments/assets/83984343-a16c-41f1-9116-d6baf71fb2bf)
<br>
Suggested starting points for Height and Width of panel: 75px (can be adjusted with caution).  The script will attempt to fit and position items automatically.  Anything too small and things can get ugly.<br>

### User Changable Settings:
Right Click -> Configure... -> Properties (tab): (with default values)<br>
Limit(s) are indicated, if any. If things get really messed up, on the Properties panel, click “Clear”, then”Apply”. All defaults will be restored.<br>
![image](https://github.com/user-attachments/assets/8a38d21a-09f7-46ee-8e37-63af601cee59)
<br>
If changes are made and you prefer your customizations, use the Export button to save them to a JSON file so that the Import button can be used to restore them should anything happen.<br>

### v1.5.1 Changes:
- Button Tool Tips modularized.
- Changed inline button functions into a consolidated structure btnHandlers. 

### v1.5.0 Changes:
- Folded drawVolumeBar() function into drawSeekbar().
- Combined Shortcut and Transport button background and border settings into one.
- Updated drawButtons() to accomodate above combination.
- Changed colors.ButtonBackground to be a color overlay of wallpaper using alpha _RGBA(0, 0, 0, 96).
- Seekbar: Paused and Playing Colors are no longer used.  Value shared with buttonBackground.
- Various other minor code clean-ups.
- Optimized make_rgb() function that supports both:
  -   RGB(A) comma-separated strings like "255,128,64" or "255,128,64,128"
  -   Hex color strings like "#FF8040", "FF8040", or even short format "#F83"

### v1.4.1 Changes:
- New Property added: "Album Art Run".  Left-clicking on the Album Art (if enabled) launches a FB2K Context Command via the foo_run component, which must be installed.  See https://www.foobar2000.org/components/view/foo_run for more info and download link.  The Property VALUE is a Named Service in this component (FB2K: Preferences > Tools > Run services).  Default is the included 'Google Artist + Title' 
service.  This can be changed to another or a new service can be added and this VALUE can be edited.  
- Old SAVE button is now "Button: Shortcut Run".  It sends its VALUE to the same foo_run component.  Again, this can be changed to another FB2K Context Command or a new service can be added and this VALUE can be edited.
- To get these to display on the Properties screen/tab: click the CLEAR button, then APPLY.

### v1.4.0 Changes:
- Major AI optimization and modularization. Notes in source files.

### v1.3.0 Changes:
- Mod Wallpaper and Album art functionality.
- General code cleanup and optimization.

### v1.2.6 Changes:
Now using fb.GetFocusItem() in its own PlayControl helper function, instead of fb.GetNowPlaying() in a callback to utils.GetAlbumArtV2() to get the proper albumart, along with modification/addition of if() statements to select appropriate above function.

### v1.2.5 Changes:
- Disabled `"utils.GetAlbumArtV2(fb.GetFocusItem(), 0)`".  This does not allow showing art when initially starting FB2000 but finally kills the error that rises when a playing song/playlist is deleted.

### v1.2.4 Changes:
- Changed icons for Playback Orders; Random and Default.
- Updated 'tip' text for Playback Orders.
- Fixed bug where deleting an active playlist when the panel used background wallpaper causes a crash.
- Include 'props.json' with example customized Properties.

### v1.2.3 Changes:
<ul>
  <li>Checks the availability of foo_skip component, disables skip button if not true. </li>
</ul>

### v1.2.2 Changes:
<ul>
  <li>Adjust transparency of borders. </li>
</ul>

### v1.2.1 Changes:
<ul>
  <li>Code cleanup and Preferences reorganization. </li>
</ul>

### v1.2.0 Changes:
![Clipboard_12-09-2024_02](https://github.com/user-attachments/assets/0a9738df-a5aa-4118-9107-5594b575d733)
![Clipboard_12-09-2024_03](https://github.com/user-attachments/assets/44f47c9a-ce00-4fe8-a76b-e0e31e89d9b6)
<br>
<ul>
  <li>Panel background can now have the playing album cover as a wallpaper. </li>
    <ul>
      <li>Wallpaper can be blurred. </li>
      <li>Amount of blur can be changed. </li>
      <li>Wallpaper: Alpha Property controls transparancy.</li>
    </ul>
  <li>Transport and/or Shortcut buttons can now have a rounded, retangular background behind them to make them stand out. </li>
    <ul>
      <li>Transparency of rectangle(s) can be adjusted. </li>
      <li>A border can be applied to the rectangle(s). </li>
      <li>Wallpaper: Alpha Property controls transparancy.</li>
      <li>Custom Color Seekbar Paused Property also controls color of rectangle(s).</li>
    </ul>
</ul>
