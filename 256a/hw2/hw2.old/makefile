CXX=g++
INCLUDES=
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm

OBJS=   RtAudio.o RtMidi.o Delayed.o ks.o

Delayed: $(OBJS)
	$(CXX) -o Delayed $(OBJS) $(LIBS)

Delayed.o: Delayed.cpp RtAudio.h
	$(CXX) $(FLAGS) $(FLAGS_MIDI) Delayed.cpp

RtAudio.o: RtAudio.h RtAudio.cpp RtError.h
	$(CXX) $(FLAGS) RtAudio.cpp

RtMidi.o: RtMidi.h RtMidi.cpp RtError.h
	$(CXX) $(FLAGS_MIDI) RtMidi.cpp

ks.o: ks.h ks.cpp
	$(CXX) $(FLAGS_MIDI) ks.cpp


clean:
	rm -f *~ *# *.o Delayed
