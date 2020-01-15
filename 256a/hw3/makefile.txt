
CXX=g++
INCLUDES=

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm -lstk
endif
ifeq ($(UNAME), Darwin)
FLAGS=-D__MACOSX_CORE__ -c
LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
	-framework IOKit -framework Carbon -lstdc++ -lm -lstk
endif


OBJS=   RtAudio.o MyAudio.o Orchestra.o letsPlay.o



letsPlay: $(OBJS)
	$(CXX) -o letsPlay $(OBJS) $(LIBS)

letsPlay.o: letsPlay.cpp RtAudio/RtAudio.h
	$(CXX) $(FLAGS) letsPlay.cpp

RtAudio.o: RtAudio/RtAudio.h RtAudio/RtAudio.cpp RtAudio/RtError.h
		$(CXX) $(FLAGS) RtAudio/RtAudio.cpp

MyAudio.o: MyAudio.h MyAudio.cpp
		$(CXX) $(FLAGS) MyAudio.cpp

clean:
	rm -f *~ *# *.o letsPlay
