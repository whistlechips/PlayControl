# PlayControl
Foobar2000 Spider Monkey (@TheQwertiest) single panel javascript with user configurable settings via the SMP Properties dialog.  Based on: "track info + seekbar + buttons.js" and "last.fm lover.js" by @marc2k3.
![image](https://github.com/user-attachments/assets/c18354e5-f536-4dd1-b365-21649329dc37)


Features:
Two sets of buttons, one for transport control of FB2K's playback functionality which is located below the center Seekbar:
Left-to-right:
Love/Unlove, Right-click to set up LFM user and authorize.
Previous Track.
Rewind 10 seconds.
Play/Pause.
Fast Forward 30 seconds.
Next Track.
Cycle through playback order: Default, Repeat (Playlist), Repeat (Track), Random, Shuffle (tracks), Shuffle (albums), Shuffle (folders)

The second set, under the Volumn Bar:
FB2K Preferences.
DSP Prefs.
Search via Facets.
Save all playlists.
Enable/disable Foo_Skip component.
  

Installation:

Add the directory "PlayControl" to your Foobar2000 user profile directory (i.e. "C:\Users\XXXXXXXXXX\AppData\Roaming\foobar2000\") where "XXXXXXXXXX" is your Windows Username.  Then download and unzip "PlayControl.zip" into it.  Add "PlayControl.js" to a Spider Monkey panel.

![image](https://github.com/user-attachments/assets/d7e99f1d-f1e4-465b-911f-c756b5cdf659)


Requirements:

Foobar2000: https://www.foobar2000.org/download

Spider Monkey Panel component, @TheQwertiest: https://theqwertiest.github.io/foo_spider_monkey_panel/

Segoe Fluent Icons font: https://learn.microsoft.com/en-us/windows/apps/design/style/segoe-fluent-icons-font

Roboto font (default): https://fonts.google.com/specimen/Roboto, falls back to Segoe UI if not installed.

Full screen ColumnsUI shot with PlayControl SMP panel at the bottom of the Foobar2000 window, under control of the PS Splitter at the top of the screen:
![image](https://github.com/user-attachments/assets/10a6f8f9-49f6-4e5a-a8e4-9c853f5ec1a5)

Suggested Height of panel: 75px (can be adjusted with caution)

Start with:

![image](https://github.com/user-attachments/assets/83984343-a16c-41f1-9116-d6baf71fb2bf)

Spider Monkey User Configuration -> Properties: (with default values)
Limit(s) are indicated, if any. If things get really messed up, on the Properties panel, click “Clear”, then”Apply”. All defaults will be restored.
![image](https://github.com/user-attachments/assets/06148e5d-6fdc-4524-91d6-6eefe1712195)

FillRoundRect() problem with the 'arc' width and height parameters has been solved.
