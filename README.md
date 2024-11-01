# PlayControl
PlayControl Spider Monkey javascript for Foobar2000
![image](https://github.com/user-attachments/assets/c18354e5-f536-4dd1-b365-21649329dc37)

Requirements:
Fonts: 

Full screen shot with PlayControl SMP panel (along with all others) under control of the PS Splitter at the top of the screen:
![image](https://github.com/user-attachments/assets/10a6f8f9-49f6-4e5a-a8e4-9c853f5ec1a5)

Suggested Height of panel: 75px (can be adjusted with caution)

Start with:
![image](https://github.com/user-attachments/assets/83984343-a16c-41f1-9116-d6baf71fb2bf)

Spider Monkey Configuration -> Properties: (with default values)
Limit(s) are indicated, if any. If things get really messed up, on the Properties panel, click “Clear”, then”Apply”. All defaults will be restored.
![image](https://github.com/user-attachments/assets/a2a7ac87-7a70-414e-b9a5-d2b7b09806c2)

NB: There is a requirement in the SMP FillRoundRect() function that the 'arc' width and height parameters be no more than double the seek bar or volume bar width and height.  Although the formula that calculates their values attempts to account for this, occasionally when loading an error "Arc argument has invalid value" will cause the panel to crash.  Just right-click and Reload if that happens.

