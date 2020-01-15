
CXX=g++
INCLUDES=

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -c
#FLAGS=-D__LINUX_JACK__ -D__UNIX_JACK__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm
endif
ifeq ($(UNAME), Darwin)
FLAGS=-D__MACOSX_CORE__ -c
LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
	-framework IOKit -framework Carbon -lstdc++ -lm
endif


OBJS=   RtAudio.o RtMidi.o ks.o midi.o 

midi: $(OBJS)
	$(CXX) -o midi $(OBJS) $(LIBS)

midi.o: midi.cpp RtMidi.h RtAudio.h ks.h
	$(CXX) $(FLAGS) midi.cpp

ks.o: ks.cpp
	$(CXX) $(FLAGS) ks.cpp

RtAudio.o: RtAudio.h RtAudio.cpp RtError.h
		$(CXX) $(FLAGS) RtAudio.cpp

RtMidi.o: RtMidi.h RtMidi.cpp RtError.h
	$(CXX) $(FLAGS) RtMidi.cpp

clean:
	rm -f *~ *# *.o midi
