To get libst compiling on your Mac, you will need to do the following:

1.  If you do not have the Developer Tools installed yet, you'll need to 
    download and install the Xcode Tools from 
    http://developer.apple.com/technology/xcode.html.  Note that you'll
    need an online ADC Membership to get the download, but you can sign up
    on the spot for free.

2.  libst depends on some open source libraries for parts of its
    functionality, so iff you do not already have either MacPorts or Fink
    installed, you'll need to download one of those as well to get these
    libraries.  Get MacPorts from http://www.macports.org/ or Fink from
    http://www.finkproject.org/.  They both come with installer packages
    if you download the binary distributions.

3.  The libraries you'll need to install are libpng, libjpeg, and 
    freetype2.  You'll need to use either MacPorts or Fink to download
    and install them before libst will compile.

(a) If you've installed MacPorts, issue the following commands in Terminal:
        sudo port install libpng
        sudo port install jpeg
        sudo port install freetype

(b) If you've installed Fink, then you can use the Fink UI to download and 
    install the three aforementioned dependencies.  To the best of my
    knowledge, these are the equivalent commands:
        fink install libpng3
        fink install libjpeg
        fink install freetype2
        fink install freetype2-dev

4.  That should be it!  Just open the libst.xcodeproj (which I presume
    you've done already to find this file), hit build, and hopefully
    you're all set to go!
