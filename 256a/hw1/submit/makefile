CXX=g++
INCLUDES=
OBJS=   RtAudio.o procreate.o 

#ifeq ($(UNAME), Linux)
#	FLAGS=-D__UNIX_JACK__ -c
#	LIBS = -lstdc++ -lm -ljack
	FLAGS=-D__UNIX_JACK__ -c
	LIBS = `pkg-config --cflags --libs jack` -lpthread
#endif

#ifeq ($(UNAME), Darwin)
#	FLAGS=-D__MACOSX_CORE__ -c
#	LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
#	-framework IOKit -framework Carbon -lstdc++ -lm
#endif

procreate: $(OBJS)
	$(CXX) -o procreate $(OBJS) $(LIBS)

procreate.o: procreate.cpp RtAudio.h
	$(CXX) $(FLAGS) procreate.cpp -o procreate.o

RtAudio.o: RtAudio.h RtAudio.cpp RtError.h
	$(CXX) $(FLAGS) RtAudio.cpp -o RtAudio.o

clean:
	rm -f *~ *# *.o procreate
