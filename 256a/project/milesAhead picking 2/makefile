
CXX=g++
INCLUDES=

UNAME := $(shell uname)

ifeq ($(UNAME), Linux)
FLAGS=-D__LINUX_ALSASEQ__ -D__UNIX_JACK__ -c
LIBS=-lasound -lpthread -ljack -lstdc++ -lm -lfluidsynth
endif
ifeq ($(UNAME), Darwin)
FLAGS=-D__MACOSX_CORE__ -c
LIBS=-framework CoreAudio -framework CoreMIDI -framework CoreFoundation \
	-framework IOKit -framework Carbon  -framework OpenGL \
	-framework GLUT -framework Foundation \
	-framework AppKit -lstdc++ -lm -lfluidsynth  -laubio -laubioext -lsndfile  -lxtract \
	-lsamplerate -lfftw3
endif



# executable
TARGET = milesAhead

# build binaries from sources in all these directories
VPATH = osc ip ip/posix

# the binary objects to compile
OBJ_FILES = \
	main.o \
	RtAudio.o \
	RtMidi.o \
	MidiEvent.o \
	MidiEventQ.o \
	Thread.o \
	Stk.o \
	AudioFeatures.o \
	chuck_fft.o \

# Build executable
${TARGET} : ${OBJ_FILES}
	${CXX} -o ${TARGET} ${OBJ_FILES} ${LIBS}

# Build C objects (uses substitution)
%.o: %.c
	${CXX} ${FLAGS} ${INC_PATH} -c $< -o $@

# Build C++objects (uses substitution)
%.o: %.cpp
	${CXX} ${FLAGS} ${INC_PATH} -c $< -o $@


# Clean up build
clean :
	rm -f ${OBJ_FILES}
	rm -f ${TARGET}
	rm -f *~
