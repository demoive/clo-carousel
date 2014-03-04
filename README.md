A quick gallery I hacked together for my fianceé's birthday containing videos and photos of people who couldn't be physcially present.

Reasons I decided to do this in the browser instead of some video editing software/service:

1. I knew there would be last minute submissions (even up to just a few hours before the event) and this way nothing would need to be compiled/processed/encoded, etc.
2. I wanted to be able to have full control over the behavior and options
3. And hey, it's more fun this way!

It was designed to be loaded locally (and on webkit only) since there is well over 10MB of data and it puts a lot of load on the browser since many video elements are loaded onto the page at the same time. I was able to stagger which videos are playing so that all are paused except for the five or so that show in the foreground - this drastically increased performance. There are also options to turn the videos into grayscale and hide the background of the carousel items.

Here is a sample of what it looks like (click to watch):

[![Joyeux Anniversaire de Loin](http://img.youtube.com/vi/bPW2qHIhOws/0.jpg)](//www.youtube.com/watch?v=bPW2qHIhOws)

A lot of reference was made to @desandro's [Introduction to CSS 3D transforms](https://github.com/desandro/3dtransforms).
