CXX=g++
INCLUDES=
OBJS=   RtAudio.o procreate.o 

#ifeq ($(UNAME), Darwin)
#	FLAGS=-D__MACOSX_CORE__ -c
#	LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
#	-framework IOKit -framework Carbon -lstdc++ -lm
#endif

procreate: $(OBJS)
	$(CXX) -o procreate $(OBJS) $(LIBS)


RtAudio.h: RtAudio.h RtAudio.cpp RtError.h
	$(CXX) $(FLAGS) RtAudio.cpp -o RtAudio.o

RtAudio.o: RtAudio.h RtAudio.cpp RtError.h
	$(CXX) $(FLAGS) RtAudio.cpp -o RtAudio.o

procreate.o: procreate.cpp
	$(CXX) $(FLAGS) procreate.cpp -o procreate.o
	
clean:
	rm -f *~ *# *.o procreate
