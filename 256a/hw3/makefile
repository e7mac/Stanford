
CXX=g++
INCLUDES=

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -D__OS_LINUX__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm -lglut -lGL -lGLU
endif
ifeq ($(UNAME), Darwin)
FLAGS=-D__MACOSX_CORE__ -c
LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
	-framework IOKit -framework Carbon  -framework OpenGL \
	-framework GLUT -framework Foundation -framework AppKit \
	-lstdc++ -lm
endif


OBJS=   RtAudio.o chuck_fft.o Thread.o Stk.o roundTrippy.o 

roundTrippy: $(OBJS)
	$(CXX) -o roundTrippy $(OBJS) $(LIBS)

roundTrippy.o: roundTrippy.cpp RtAudio.h chuck_fft.h
	$(CXX) $(FLAGS) roundTrippy.cpp

Thread.o: Thread.cpp Thread.h Stk.h
	$(CXX) $(FLAGS) Thread.cpp

Stk.o: Stk.h Stk.cpp
	$(CXX) $(FLAGS) Stk.cpp

RtAudio.o: RtAudio.h RtAudio.cpp RtError.h
		$(CXX) $(FLAGS) RtAudio.cpp

chuck_fft.o: chuck_fft.h chuck_fft.c
		$(CXX) $(FLAGS) chuck_fft.c

clean:
	rm -f *~ *# *.o roundTrippy
