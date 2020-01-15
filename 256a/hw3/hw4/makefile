
CXX=g++
INCLUDES=

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -c
#FLAGS=-D__LINUX_JACK__ -D__UNIX_JACK__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm \
    -lglut -lGL -lGLU
endif
ifeq ($(UNAME), Darwin)
FLAGS=-D__MACOSX_CORE__ -c
LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
	-framework IOKit -framework Carbon  -framework OpenGL \
	-framework GLUT -framework Foundation -framework AppKit \
	-lstdc++ -lm
endif


OBJS=   myFirstGL.o 

myFirstGL: $(OBJS)
	$(CXX) -o myFirstGL $(OBJS) $(LIBS)

myFirstGL.o: myFirstGL.cpp
	$(CXX) $(FLAGS) myFirstGL.cpp

clean:
	rm -f *~ *# *.o myFirstGL
