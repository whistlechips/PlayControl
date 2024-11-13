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
<br>
## Installation:
Add the directory "PlayControl" to your Foobar2000 user profile directory (i.e. "C:\Users\XXXXXXXXXX\AppData\Roaming\foobar2000\") where "XXXXXXXXXX" is your Windows Username.<br>
Then download and unzip "PlayControl.zip" into it.  Add "PlayControl.js" to a Spider Monkey panel.<br?
![image](https://github.com/user-attachments/assets/d7e99f1d-f1e4-465b-911f-c756b5cdf659)
<br>
## Requirements:
<ul>
  <li>Foobar2000: https://www.foobar2000.org/download</li>
  <li>Spider Monkey Panel component, @TheQwertiest: https://theqwertiest.github.io/foo_spider_monkey_panel/</li>
  <li>Segoe Fluent Icons font: https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font</li>
  <li>Roboto font (default): https://fonts.google.com/specimen/Roboto, falls back to Segoe UI if not installed.</li>
</ul>
<br>
Full screen ColumnsUI shot with PlayControl SMP panel at the bottom of the Foobar2000 window, under control of the PS Splitter at the top of the screen:<br>
![image](https://github.com/user-attachments/assets/10a6f8f9-49f6-4e5a-a8e4-9c853f5ec1a5)
<br>
Suggested Height of panel: 75px (can be adjusted with caution)<br>
<br>
Start with:<br>
![image](https://github.com/user-attachments/assets/83984343-a16c-41f1-9116-d6baf71fb2bf)
<br>
Spider Monkey User Configuration -> Properties: (with default values)<br>
Limit(s) are indicated, if any. If things get really messed up, on the Properties panel, click “Clear”, then”Apply”. All defaults will be restored.<br>
![image](https://github.com/user-attachments/assets/06148e5d-6fdc-4524-91d6-6eefe1712195)
<br>
FillRoundRect() problem with the 'arc' width and height parameters has been solved.<br>
