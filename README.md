# PlayControl
PlayControl Spider Monkey script for Foobar2000



Requirements:
Fonts: 

Full screen shot with PlayControl SMP panel (along with all others) under control of the PS Splitter at the top of the screen:

Suggested Height of panel: 75px (can be adjusted with caution)

Start with:

Spider Monkey Configuration -> Properties: (with default values)
Limit(s) are indicated, if any. If things get really messed up, on the Properties panel, click “Clear”, then”Apply”. All defaults will be restored.

NB: There is a requirement in the SMP FillRoundRect() function that the 'arc' width and height parameters be no more than double the seek bar or volume bar width and height.  Although the formula that calculates their values attempts to account for this, occasionally when loading an error "Arc argument has invalid value" will cause the panel to crash.  Just right-click and Reload if that happens.

